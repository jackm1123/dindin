/*
Sources used:
https://www.lynda.com/React-Native-tutorials/Creating-animation-loop/560343/672458-4.html
https://facebook.github.io/react-native/docs/animations
*/
import React from 'react'
import {Animated, View, StyleSheet, ImageBackground, Image, TouchableHighlight, Text, Dimensions} from 'react-native'
import { Constants } from 'expo'
import {widthPercentageToDP as wp, heightPercentageToDP as hp, listenOrientationChange as loc, removeOrientationListener as rol} from 'react-native-responsive-screen';
import LocalizedStrings from 'react-localization';
/* Making Fade Animation View */
class FadeInView extends React.Component {
  state = {
    fadeAnim: new Animated.Value(1),  // Initial value for opacity: 1
  }

  /* animateFade calls itself over and over as param of start()*/
  animateFade = (opacity = 1) => {
    Animated.timing(
      this.state.fadeAnim,
      {
        toValue: opacity,
        duration: 1000,
      }
    ).start(() => { this.animateFade(1 ^ opacity)}) // XOR 1 with current opacity to alternate 0 and 1
  }

  async componentDidMount(){
    this.animateFade()
  }

  render() {
    let { fadeAnim } = this.state


/* {this.props.children} is used to display whatever you include between
the opening and closing tags when invoking a component
...this.props.style uses ... to expand the array of this.props,style into a list.
this.props.style is used for inheriting from classes around it*/
    return (
      <Animated.View style={{...this.props.style, opacity: fadeAnim}}>
        {this.props.children}
      </Animated.View>
    );
  }
}


export default class SplashScreen extends React.Component{
  constructor(props){
    super(props)
  }




  render(){

    let localStrings = new LocalizedStrings({
      ar:{
        catchphrase:"توصيل عشاق الطعام"
      },
      en:{
        catchphrase:"Connecting food lovers"
      },
    })


    return(
      <View style={styles.backgroundContainer}>
        <Image style={styles.circles} source={require('../assets/ovals2.png')}>
        </Image>
        <Image style={styles.home} source={require('../assets/house2.png')}>
        </Image>

        <FadeInView style={styles.pinkface}>
          <Image source={require('../assets/pinkface2.png')}>
          </Image>
        </FadeInView>
        <FadeInView style={styles.purpleface}>
          <Image source={require('../assets/purpleface.png')}>
          </Image>
        </FadeInView>
        <FadeInView style={styles.greenface}>
          <Image source={require('../assets/greenface.png')}>
          </Image>
        </FadeInView>


        <Text style={styles.title}>DinDin</Text>
        <Text style={styles.description}>{localStrings.catchphrase}</Text>

        <TouchableHighlight underlayColor = {'#0A46FF'} onPress={()=>this.props.navigation.navigate('Home')}>
          <View>
            <ImageBackground style={styles.buttonImage} source={require('../assets/Button.png')}>
              <Text style={styles.buttonText}> Get Started</Text>
            </ImageBackground>
          </View>
        </TouchableHighlight>

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
          //fontFamily: 'Helvetica',
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
          bottom: hp('70%'),
          width: hp('12%'),
          height: hp('13.5%'),
          right: wp('18%'),
        },
        greenface:{
          position: 'absolute',
          bottom: hp('40%'),
          width: hp('12%'),
          height: hp('13.5%'),
          right: wp('24%'),
        },
        title:{
          //fontFamily: 'Helvetica',
          fontSize: hp('4%'),
          color: '#353535',
          textAlign: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
          marginTop: hp('3%'),
        },
        description:{
          opacity: 0.5,
        //  fontFamily: 'Helvetica',
          fontSize: hp('2%'),
          color: '#000000',
          textAlign: 'center',
          marginBottom: hp('20%'),
          marginTop: hp('1%'),
        },
    }
)
