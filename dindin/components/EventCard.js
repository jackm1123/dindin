import React from 'react';
import * as firebase from 'firebase';
import {StyleSheet, Text, View, Image} from 'react-native';

//Initialize Firebase
var config = {
  databaseURL: 'https://dindind-ffbf6.firebaseio.com/',
  projectId: 'dindind-ffbf6>',
};
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const monthcaps = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];


export default class EventCard extends React.Component {
  constructor(props) {
    super(props);
    this.state={
        data: props.data,
        host: props.data.host,
        time: props.data.time,
        date: props.data.date,
    }
  }
 
  render() {
    const ddate = new Date(this.state.date);
    return (
      <View style={styles.card}>
        <View style={{borderBottomWidth:1,borderBottomColor:"rgba(0,0,0,0.1)"}}>
            <Text style={{fontWeight: "bold"}}>{weekday[ddate.getDay()]} {ddate.getDate()} {monthcaps[ddate.getMonth()]}</Text>
        </View>
        <View style={{flexDirection: 'row',flex:1, alignItems:'center'}}>
            <Image style={{borderRadius:30, height: 60, width: 60, margin: 10}} source ={require('../assets/profile.jpg')}/>
            <View style={{flexDirection:'column',flex:1}}>
                <Text style={{fontSize:17}}>{this.state.host}</Text>
                <Text style={{fontSize:14,color:'grey'}}>{this.state.time}</Text>
            </View>
            <Image style={styles.cardImage} source ={require('../assets/phone.png')}/>
            <Image style={styles.cardImage} source ={require('../assets/email.png')}/>
        </View>
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
    card:{
        flex: 1,
        flexDirection: 'column',
        borderBottomWidth: 1,
        borderBottomColor: "rgba(0,0,0,0.1)",
        marginTop: 10,
        marginBottom: 10,
    },
    cardImage:{
        margin:10,
        height: 40,
        width: 40,
    }
})
