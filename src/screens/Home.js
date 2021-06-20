import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { manager } from '../index';
import { saveConnected, saveDevices, savePropertiess, saveStatus } from '../actions';

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const statusBluetooth = useSelector(state => state.status);
  const listDevice = useSelector(state => state.devices);
  const [scaning, setScaning] = useState(false);
  const [conected, setConected] = useState({status: false, uid: null});

  useEffect(() => {
    manager.state()
      .then(res => dispatch(saveStatus(res)))
      .catch(err => console.log(err))
  }, [manager]);

  useEffect(() => {
    manager.onStateChange((state) => {
      if (state) dispatch(saveStatus(state));
    });
  }, [manager]);

  const handleScanDevice = async () => {
    if (statusBluetooth !== 'PoweredOn') return console.log('habilite el bluetooth primero');

    setScaning(true);
    const arr = [];

    manager.startDeviceScan(null, null, (error, device) => {
      console.log('scaning....');

      if (null) console.log('null');

      if (error) {
        console.log(error);
        handleStopScan();
        return;
      };

      if (device) {
        const existingDevice = arr.some(element => element.id === device.id);

        if (!existingDevice) {
          //console.log(device.id);
          arr.push(device);
        };
      }
      //console.log(arr);
      dispatch(saveDevices(arr));
    });

    setTimeout(() => {
      handleStopScan();
    }, 15000);
  };

  const handleStopScan = () => {
    //console.log('stop scan')
    manager.stopDeviceScan();
    setScaning(false);
  };

  const handleConnectDevice = (id, name) => {
    manager.stopDeviceScan();
    console.log('init connect')
    manager.startDeviceScan(null, null, (error, device) => {
      console.log(device.id);

      if (device.id === id) {
        manager.stopDeviceScan();
        console.log('dispositivo encontrado');

        manager.connectToDevice(device.id)
          //device.connect()
          .then((device) => {
            device.serv
            return device.discoverAllServicesAndCharacteristics();
          })
          .then((info) => {
            console.log('conectado');
            setConected({ status: true, uid: info.id });
            //dispatch(saveConnected({status: true, uid: info.id, name}));
          })
          .catch((error) => {
            console.log('error', error)
          })
      }
    })
  };

  const handleDisconnect = () => {
    return new Promise((resolve, reject) => {
      manager.cancelDeviceConnection(conected.uid)
        .then(res => {
          console.log('disconnect');
          setConected({ status: false, uid: null });
          //dispatch(saveConnected({status: false, uid: null}));
        });
    })
  };

  const getCharacteristics = (services) => {
    return new Promise ((resolve) => {
      const data = [];
      services.forEach((service, idx) => {
        service.characteristics()
        .then(res => {
          const auxServ = {...service}
          delete auxServ._manager;

          const auxChart = res.reduce((acc, value) => {
            const auxValue = {...value};
            delete auxValue._manager;
            acc.push(auxValue);
            return acc;
          }, []);

          data.push({...auxServ, characteristics: auxChart});
          if(idx === services.length - 1) {
            resolve(data);
          };
        });
      })
    });
  };

  const handleRequestDetails = async (id) => {
    const services = await manager.servicesForDevice(id);
    const properties = await getCharacteristics(services);

    dispatch(savePropertiess(properties));
    
    navigation.push('Detail');
  };

  return (
    <View
      style={{ flex: 1, marginTop: 20 }}
    >
      <Text style={{
        fontSize: 16,
        fontWeight: '700',
        textAlign: 'center',
        marginVertical: 10
      }}>Estado del Bluetooth: {
          statusBluetooth === 'PoweredOn' ? <Text style={{ color: 'green' }}>Encendido</Text> :
            (statusBluetooth === 'PoweredOff' ? <Text style={{ color: 'red' }}>Apagado</Text> :
              <Text style={{ color: 'gray' }}>Indefinido</Text>)
        }</Text>

      <View
        style={{ paddingHorizontal: 20 }}
      >
        {!scaning ?
          <Button
            title='Escanear dispositivos'
            onPress={handleScanDevice}
            disabled={statusBluetooth !== 'PoweredOn'}
          /> :
          <Button
            title='Detener'
            onPress={handleStopScan}
            disabled={statusBluetooth !== 'PoweredOn'}
            buttonStyle={{ backgroundColor: 'red' }}
          />
        }
      </View>

      <View style={{ flex: 1, marginHorizontal: 5, marginTop: 10 }}>
        <ScrollView showsVerticalScrollIndicator={false} style={{ paddingVertical: 5 }}>
          {listDevice.map(element =>
            <View
              key={element.id}
              style={{
                borderWidth: 0.5,
                borderRadius: 5,
                display: 'flex',
                flexDirection: 'row',
                paddingVertical: 5,
                paddingHorizontal: 5,
                backgroundColor: '#dddddd',
                marginBottom: 5
              }}
            >
              <View style={{ flex: 2 }}>
                <Text style={{ fontSize: 14 }}>{element.name ? element.name : 'N/A'}</Text>
                <Text style={{ fontSize: 12 }}>{element.id}</Text>
              </View>
              <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'center' }}>
                {!(conected.status && conected.uid === element.id) ?
                  <TouchableOpacity
                    onPress={() => handleConnectDevice(element.id, element.name)}
                  >
                    <Text
                      style={{
                        borderWidth: 0.5,
                        borderColor: 'black',
                        borderRadius: 5,
                        paddingHorizontal: 7,
                        paddingVertical: 3,
                        backgroundColor: '#c8c8c8'
                      }}
                    >Conectar</Text>
                  </TouchableOpacity> :
                  <TouchableOpacity
                    onPress={() => handleDisconnect()}
                  >
                    <Text
                      style={{
                        borderWidth: 0.5,
                        borderColor: 'red',
                        borderRadius: 5,
                        paddingHorizontal: 7,
                        paddingVertical: 3,
                        backgroundColor: '#c8c8c8'
                      }}
                    >Desconectar</Text>
                  </TouchableOpacity>
                }
              </View>
              {(conected.status && conected.uid === element.id) &&
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginHorizontal: 10
                  }}
                >
                  <Icon
                    name='settings'
                    type='feather'
                    onPress={() => handleRequestDetails(element.id)}
                  />
                </View>
              }
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default Home;