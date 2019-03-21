import * as React from 'react'
import {View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, Button} from 'react-native'


export default class SplashScreen extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
        return(
            <View style={styles.container}>

                <View style={{flexDirection: 'row', flex: 'end',}}>
                    <View>
                        <Image style={{borderRadius:30, height: 60, width: 60, margin: 10,}} source={require('../assets/profile.jpg')}>
                        </Image>
                    </View>

                    <View style={{flexDirection: 'column'}}>
                        <Text style={{fontSize: 16, color: 'black'}}>Alma Evans</Text>
                        <Text style={{fontSize: 15, color: 'gray'}}>Sunday 17 June - 8:00pm</Text>
                    </View>
                </View>
                
            </View>
            
        )
    }

}

/*

                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity>
                        <View>
                            <ImageBackground style={{width: 40}} source={require('../assets/ex.png')}> </ImageBackground>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View>
                        <ImageBackground style={{width: 40}} source={require('../assets/check.png')}> </ImageBackground>
                        </View>
                    </TouchableOpacity>
                </View>


*/

const styles = StyleSheet.create(
    {
        container:{
            height: 150,
            width: 300,
            backgroundColor: '#228B22',
		    borderColor: 'transparent',
		    borderWidth: 1,
		    paddingLeft: 16,
		    paddingTop: 14,
		    paddingBottom: 16,
        },

        title:{
            color: '#333',
    		fontSize: 16,
        },
        
    }
)