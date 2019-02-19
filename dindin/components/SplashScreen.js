import React from 'react'
import {View, StyleSheet, ImageBackground, TouchableOpacity, Text} from 'react-native'
import { Constants } from 'expo'

export default class SplashScreen extends React.Component{
  constructor(props){
    super(props)
  }


  render(){
    return(
    <View style={styles.backgroundContainer}>
    <TouchableOpacity onPress={()=>this.props.navigation.navigate('Home')}>
    <View style={styles.button}>
    <ImageBackground style={styles.buttonImage} source={require('../assets/Button.png')}>
    <Text style={styles.buttonText}> Get Started</Text>
    </ImageBackground>
    </View>
    </TouchableOpacity>
    </View>
  )
  }
}

const styles = StyleSheet.create(
    {
        backgroundContainer: {
          flex: 1,
          flexDirection:'column',
          paddingTop: Constants.statusBarHeight,
          height: undefined,
          width: undefined,
          justifyContent: 'flex-end'

        },
        button: {
          height: 48,
          width: undefined,
          justifyContent: 'center'

        },
        buttonImage:{
          height: 48,
          flexDirection: 'column',
          justifyContent: 'center',

        },
        buttonText:{
          color: '#FFFFFF',
          textAlign: 'center',
          fontSize: 20,
          justifyContent: 'space-evenly'
        }
    }
)
