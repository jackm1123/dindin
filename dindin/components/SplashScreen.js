import React from 'react'
import {Animated, View, StyleSheet, ImageBackground, Image, TouchableOpacity, Text, Dimensions} from 'react-native'
import { Constants } from 'expo'
import {widthPercentageToDP as wp, heightPercentageToDP as hp, listenOrientationChange as loc, removeOrientationListener as rol} from 'react-native-responsive-screen';






export default class SplashScreen extends React.Component{
  constructor(props){
    super(props);
  }


  render(){
    return(
      <View style={styles.backgroundContainer}>
        <Image style={styles.circles} source={require('../assets/ovals2.png')}>
        </Image>
        <Image style={styles.home} source={require('../assets/house2.png')}>
        </Image>
        
        {/*<Animated.View>*/}
          <Image style={styles.pinkface} source={require('../assets/pinkface2.png')}>
          </Image>
        {/*</Animated.View>*/}

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
          justifyContent: 'flex-end',
          alignItems: 'center',
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
          fontSize: hp('2.4%'),
          fontFamily: 'Helvetica',
          justifyContent: 'space-evenly'
        },
        circles:{
          position: 'absolute',
          bottom: hp('45%'),
          width: hp('40%'),
          height: hp('40%'),
        },
        home:{
          position: 'absolute',
          bottom: hp('59%'),
          width: hp('12%'),
          height: hp('12%'),
        },
        pinkface:{
          position: 'absolute',
          bottom: hp('53%'),
          width: hp('12%'),
          height: hp('13.5%'),
          right: wp('70%'),
        },
        purpleface:{
          position: 'absolute',
          bottom: hp('53%'),
          width: hp('12%'),
          height: hp('13.5%'),
          right: wp('70%'),
        },

//https://www.lynda.com/React-Native-tutorials/Creating-animation-loop/560343/672458-4.html
//https://facebook.github.io/react-native/docs/animations





    }
)






















