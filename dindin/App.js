import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './components/HomeScreen'
import SplashScreen from './components/SplashScreen'
import {createAppContainer,createStackNavigator} from 'react-navigation'

const rootStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions:{
      headerMode: 'float'
    }
  },
  Splash: {
    screen: SplashScreen,
    navigationOptions:{
      header: null,
    }
  },
},{
  initialRouteName: 'Splash',
})

const AppContainer = createAppContainer(rootStack)

export default class App extends React.Component {

  constructor(props){
    super(props)
  }

  render() {

    return (
      <AppContainer/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
