import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { Icon } from 'react-native-elements';

const Details = ({navigation}) => {
  const statusBluetooth = useSelector(state => state.status);
  const properties = useSelector(state => state.properties);
  
  return (
    <View
      style={{ flex: 1 }}
    >
      <View
        style={{
          height: 50,
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <View
          style={{ flex: 0.5, justifyContent: 'center' }}
        >
          <Icon
            name='chevron-left'
            type='entypo'
            onPress={() => navigation.goBack()}
          />
        </View>
        <View
          style={{ flex: 3, justifyContent: 'center' }}
        >
          <Text style={{
            fontSize: 15,
            fontWeight: '700',
            textAlign: 'center',
            marginVertical: 10
          }}>Estado del Bluetooth: {
              statusBluetooth === 'PoweredOn' ? <Text style={{ color: 'green' }}>Encendido</Text> :
                (statusBluetooth === 'PoweredOff' ? <Text style={{ color: 'red' }}>Apagado</Text> :
                  <Text style={{ color: 'gray' }}>Indefinido</Text>)
            }</Text>
        </View>
        <View
          style={{ flex: 0.5, justifyContent: 'center' }}
        ></View>
      </View>

      <View style={{flex: 1, marginHorizontal: 5}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {properties.map(property => 
            <View
              key={property.id}
              style={{
                borderWidth: 0.5,
                borderColor: '#a8a8a8',
                borderRadius: 10,
                marginVertical: 5,
                paddingHorizontal: 10,
                paddingVertical: 5
              }}
            >
              <Text>Services:</Text>
              <View
                style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}
              >
                <Text style={{ fontSize: 12 }}>{property.uuid}</Text>
                <Text style={{ fontSize: 12 }}>{property.isPrimary ? 'PRIMARY' : null}</Text>

              </View>

              <Text>Characteristics:</Text>
              {property.characteristics.map(characteristic => 
                <View
                  key={characteristic.id}
                  style={{marginVertical: 5}}
                >
                  <Text style={{fontSize: 12}}>{characteristic.uuid}</Text>
                  {characteristic.isIndicatable && <Text>Indicatable</Text>}
                  {characteristic.isNotifiable && <Text>Notifiable</Text>}
                  {characteristic.isNotifying && <Text>Notifying</Text>}
                  {characteristic.isReadable && <Text>Readable</Text>}
                  {characteristic.isWritableWithResponse && <Text>Writable</Text>}
                </View>
              )}
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default Details;