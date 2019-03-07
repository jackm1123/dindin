import React from 'react';
import { StyleSheet, Text, View, Button, Image} from 'react-native';
import {HeaderBackButton} from 'react-navigation'


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
    title: 'Profile',
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
    
    /*
    headerRight: (
      <Button
        onPress={()=>navigation.navigate('Splash')} 
        style={styles2.myCustomHeaderBackImage}
        title="me"
      /> 
    ),
    
    */



  });









  constructor(props){
    super(props)
  }

  render() {

    return (
      <View style={styles.container}>
        <Text>Homescreen</Text>
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
