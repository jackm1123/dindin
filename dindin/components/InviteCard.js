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
                

                <View style={{flexDirection: 'row', flex: 'end', justifyContent: 'space-evenly',}}>
                    <View>
                        <TouchableOpacity>
                            <View style={{flexDirection: 'row'}}> 
                                <Image style={{width: 20, height: 20,}} source={require('../assets/ex.png')}></Image>
                                <Text style={{color: 'red'}}> Decline </Text>
                            </View>

                        </TouchableOpacity>
                    </View>

                    <View>
                        <TouchableOpacity>
                            <View style={{flexDirection: 'row'}}> 
                                <Image style={{width: 20, height: 20,}} source={require('../assets/check.png')}></Image>
                                <Text style={{color: '#00cc00'}}> Accept </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            
        )
    }

}

const styles = StyleSheet.create(
    {
        container:{
            height: 150,
            width: 300,
            backgroundColor: '#F8F8F8',
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