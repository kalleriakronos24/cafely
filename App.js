import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Platform
} from 'react-native';
import Router from './src/config/routes/index';
import Select from 'react-dropdown-select';
import { EventEmitter } from 'events';
import Root from './src/Redux/reducers/index.reducer';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { getApiLevel, getVersion, getSystemVersion } from 'react-native-device-info'
const store = createStore(Root);
class App extends Component {

  render() {
    const API_LVL = getApiLevel()
      .then(res => {
        console.log('This Device API LVL is : ', res)
      })
      .catch(e => {
        if (!e)
          console.log('could not get the api lvl')
      })
    API_LVL;
    console.disableYellowBox = true
    console.log('Current Users Device Platform is ', Platform.OS);
    console.log('Current Users Device OS Version is ', getSystemVersion());
    return (
      <>
        <Provider store={store}>
          <Router />
        </Provider>
      </>
    );
  };

}


export default App;
