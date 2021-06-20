import {combineReducers} from 'redux';
import propReducer from './prop.reducer';
import statusReducer from './status.reducer';
import devicesReducer from './devices.reducer';
import connectedReducer from './connected.reducer';

export default combineReducers({
  properties: propReducer,
  status: statusReducer,
  devices: devicesReducer,
  connected: connectedReducer,
});