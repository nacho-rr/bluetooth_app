import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './src/configStore';
import Root from './src'

const App = () => {
  let store = configureStore();

  return (
    <Provider store={store}>
      <Root/>
    </Provider>  
  );
};

export default App;