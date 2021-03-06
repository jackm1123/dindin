import React from 'react';
import { StyleSheet} from 'react-native';
import HomeScreen from './components/HomeScreen'
import SplashScreen from './components/SplashScreen'
import CreateEvent from './components/CreateEvent'
import InvitationDetailsScreen from './components/InvitationDetailsScreen'
import {createAppContainer,createStackNavigator} from 'react-navigation'
import * as firebase from 'firebase';

//Initialize Firebase
var config = {
    databaseURL: "https://dindind-ffbf6.firebaseio.com/",
    projectId: "dindind-ffbf6>",
};
if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

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
  InvitationDetailsScreen: {
    screen: InvitationDetailsScreen,
    navigationOptions:{
      headerMode: 'float'
    }
  },
  CreateEvent: {
    screen: CreateEvent,
    navigationOptions:{
      headerMode: 'float'
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
      <AppContainer persistenceKey={"NavigationState"}/>
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
