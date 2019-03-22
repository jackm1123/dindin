import * as React from 'react'
import {View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, Button} from 'react-native'
import * as firebase from 'firebase';

//Initialize Firebase
var config = {
    databaseURL: "https://dindind-ffbf6.firebaseio.com/",
    projectId: "dindind-ffbf6>",
};
if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

export default class InviteCard extends React.Component{
	constructor(props){
		super(props)
        this.state = {
            data: props.data
        }

	}

    componentWillReceiveProps(nextProps) {
        this.setState({ data: nextProps.data }); 
        this.setState({ host: nextProps.data.host})
        this.setState({ time: nextProps.data.time})
        this.setState({ date: nextProps.data.date})
        //console.log("state inside will receive props")
        //console.log(this.state) 
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
                        <Text style={{fontSize: 16, color: 'black'}}>{this.state.host}</Text>
                        <Text style={{fontSize: 15, color: 'gray'}}>{this.state.date} - {this.state.time}</Text>
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