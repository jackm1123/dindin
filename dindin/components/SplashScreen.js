import React from 'react'
import {View, StyleSheet, ImageBackground, TouchableOpacity, Text, Dimensions} from 'react-native'
import { Constants } from 'expo'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class SplashScreen extends React.Component{
  constructor(props){
    super(props)
  }


  render(){
    return(
      <View style={styles.backgroundContainer}>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Home')}>
          <View>
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
        buttonImage:{
          width: wp('100%'),
          height: hp('7.1964%'),
          flexDirection: 'column',
          justifyContent: 'center',

        },
        buttonText:{
          color: '#FFFFFF',
          textAlign: 'center',
          fontSize: 20,
          fontFamily: 'Helvetica',
          justifyContent: 'space-evenly'
        }
    }
)
