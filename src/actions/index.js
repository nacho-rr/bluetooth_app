const setProperties = (properties) => {
  return { type: 'saveProperties', payload: properties };
};

export const savePropertiess = (properties) => {
  return (dispatch) => {
    dispatch(setProperties(properties));
  };
};

const setStatus = (status) => {
  return {type: 'saveStatus', payload: status};
};

export const saveStatus = (status) => {
  return (dispatch) => {
    dispatch(setStatus(status));
  };
};

const setDevices = (devices) => {
  return {type: 'saveDevices', payload: devices};
};

export const saveDevices = (devices) => {
  return (dispatch) => {
    dispatch(setDevices(devices));
  };
};

const setConnected = (data) => {
  return {type: 'saveConnected', payload: data};
};

export const saveConnected = (data) => {
  return (dispatch) => {
    dispatch(setConnected(data));
  };
};