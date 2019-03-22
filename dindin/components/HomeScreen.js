import React from 'react';
import { Animated, StyleSheet, Text, View, Button, Image, ScrollView, ListView} from 'react-native';
import {HeaderBackButton} from 'react-navigation'
import PendingScrollView from './PendingScrollView';
import * as firebase from 'firebase';

//Initialize Firebase
var config = {
    databaseURL: "https://dindind-ffbf6.firebaseio.com/",
    projectId: "dindind-ffbf6>",
};
if (!firebase.apps.length) {
    firebase.initializeApp(config);
}




/*Customize Back button in header*/
class MyCustomHeaderBackImage extends React.Component {
  render() {
    const source = require('../assets/sidemenu.png');
    return (
      <Image
        source={source}
        style={[styles2.myCustomHeaderBackImage, this.props.style]}
      />
    );
  }
}

export default class HomeScreen extends React.Component {
    
  static navigationOptions = ({ navigation }) => ({
    title: 'DinDin',
    headerBackImage: (
      <MyCustomHeaderBackImage />
    ),
    headerBackTitleStyle: {
      color: 'white',
    },

    headerRight: (
      <Image
        source={require('../assets/search.png')}
        style={styles2.myCustomHeaderBackImage}
      /> 
    ),
  })
    /*
    headerRight: (
      <Button
        onPress={()=>navigation.navigate('Splash')} 
        style={styles2.myCustomHeaderBackImage}
        title="me"
      /> 
    ),
    
    */


  constructor(props){
    super(props)
    this.readUserData(this.props.navigation.state.params.profile.id)
    this.state = {snapshot: ""}
  }

  readUserData(path) {
      currentContext = this 
      firebase.database().ref('Users/' + path).on('value', function (snapshot) {
          currentContext.setState({
              snapshot: snapshot.val()
          })
          //console.log("state in readuserdata / HomeScreen")
          //console.log(currentContext.state)
      });

  }

  writeUserData(name){
      id = this.props.navigation.state.params.profile.id

      firebase.database().ref('Users/' + id).update({
          name
      }).then((data)=>{
          //success callback
          console.log('data ' , data)
      }).catch((error)=>{
          //error callback
          console.log('error ' , error)
      })
  }


  render() {

    this.writeUserData(this.props.navigation.state.params.profile.name)
    return (
      <View style={styles.container}>
        <PendingScrollView data={this.state.snapshot}/>
      </View>
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

const styles2 = StyleSheet.create({
  myCustomHeaderBackImage: {
    height: 14.5,
    width: 24,
    marginLeft: 9,
    marginRight: 12,
    marginVertical: 12,
    resizeMode: 'contain',
  },
  myCustomHeaderBackImageAlt: {
    tintColor: '#f00',
  },
});
