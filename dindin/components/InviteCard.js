import * as React from 'react'
import {View, Text, StyleSheet, Image, TouchableOpacity, Button} from 'react-native'
import * as firebase from 'firebase';

//Initialize Firebase
var config = {
    databaseURL: "https://dindind-ffbf6.firebaseio.com/",
    projectId: "dindind-ffbf6>",
};
if (!firebase.apps.length) {
    firebase.initializeApp(config);
}


const monthNames = ["january", "february", "march", "april", "may", "june",
  "july", "august", "september", "october", "november", "december"
];

const monthcaps = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

export default class InviteCard extends React.Component{

	constructor(props){
		super(props)
        this.state = {
            host: props.data.host,
            time: props.data.time,
            date: props.data.date,
            id: props.data.id,
            userid: props.userid,
            backgroundColor: '#F8F8F8',
        }

	}



	render(){
        const ddate = new Date(this.state.date);
        return(
            <View style={[styles.container, {backgroundColor: this.state.backgroundColor}]}>
                <View style={{flexDirection: 'row', flex: 'end',}}>
                    <View>
                        <Image style={{borderRadius:30, height: 60, width: 60, margin: 10,}} source={require('../assets/profile.jpg')}>
                        </Image>
                    </View>

                    <View style={{flexDirection: 'column'}}>
                        <Text style={{fontSize: 16, color: 'black'}}>{this.state.host}</Text>
                        <Text style={{fontSize: 15, color: 'gray'}}>{weekday[ddate.getDay()]} {ddate.getDate()} {monthcaps[ddate.getMonth()]}</Text>
                        <Text style={{fontSize: 15, color: 'gray'}}>{this.state.time}</Text>
                    </View>
                </View>
                

                <View style={{flexDirection: 'row', flex: 'end', justifyContent: 'space-evenly',}}>
                    <View>
                        <TouchableOpacity onPress={() => {
                            //reject invitation
                            this.setState({backgroundColor: '#F08080'});
                            userid = this.state.userid
                            id = this.state.id
                            setTimeout(function(){ 
                                firebase.database().ref('Users/' + userid + '/invitations/' + id).remove();
                            }, 1000);
                        }}>
                            <View style={{flexDirection: 'row'}}> 
                                <Image style={{width: 20, height: 20,}} source={require('../assets/ex.png')}></Image>
                                <Text style={{color: 'red'}}> Decline </Text>
                            </View>

                        </TouchableOpacity>
                    </View>

                    <View>
                        <TouchableOpacity onPress={() => {
                            //accept button
                            this.setState({backgroundColor: '#90EE90'});
                            date = this.state.date;
                            host = this.state.host;
                            time = this.state.time;
                            const d = new Date((this.state.date).toString());
                            month = monthNames[d.getMonth()];
                            userid = this.state.userid
                            id = this.state.id

                            setTimeout(function(){ 
                                firebase.database().ref('Users/' + userid + '/invitations/' + id).remove();
                                firebase.database().ref('Users/' + userid + '/accepted/' + month + '/').push({
                                    date,
                                    host,
                                    time
                                });
                            }, 1000);
                        }}>
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