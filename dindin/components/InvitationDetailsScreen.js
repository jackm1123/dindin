import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, Button, Dimensions} from 'react-native';
import {Permissions, Location, MapView, Constants} from 'expo';
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

var ht = Dimensions.get('window').height;

export default class InvitationDetailsScreen extends React.Component {

	static navigationOptions = ({ navigation }) => ({
	    title: 'DinDin',
		headerBackTitleStyle: {
	      color: 'white',
	    },
	 })

	constructor(props){
		super(props)
	    this.state = {
	        host: props.navigation.state.params.host,
	        time: props.navigation.state.params.time,
	        date: props.navigation.state.params.date,
	        id: props.navigation.state.params.id,
	        address: props.navigation.state.params.address,
	        userid: props.navigation.state.params.userid,
	        mapRegion: { latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
		    locationResult: null,
		    location: {coords: { latitude: 37.78825, longitude: -122.4324}},
	    }
	}









	// need to make these so that constant touching the map doesn't rerender




	componentDidMount() {
		this._getLocationAsync();
	}

	_handleMapRegionChange = mapRegion => {
		this.setState({ mapRegion });
	}

	_getLocationAsync = async () => {
		let { status } = await Permissions.askAsync(Permissions.LOCATION);
		if (status !== 'granted') {
			this.setState({
				locationResult: 'Permission to access location was denied',
				location,
			});
		}
		let location = await Location.getCurrentPositionAsync({});
		this.setState({ locationResult: JSON.stringify(location), location, });
	}









	render(){
		const ddate = new Date(this.state.date);
		return(
			<View>
				<View style={styles.container}>
                    <View style={{alignItems: 'center'}}>
                        <Image style={{borderRadius:45, height: 90, width: 90, margin: 10,}} source={require('../assets/profile.jpg')}>
                        </Image>
                    </View>
                    <View style={{flexDirection: 'column', alignItems: 'center'}}>
                        <Text style={{fontSize: 20, color: 'black'}}>{this.state.address}</Text>
                        <Text style={{fontSize: 15, color: 'black'}}>{weekday[ddate.getDay()]} {ddate.getDate()} {monthcaps[ddate.getMonth()]} - {this.state.time}</Text>
                        <Text style={{fontSize: 15, color: 'gray'}}>Hosted by {this.state.host}</Text>
                	</View>

                	<Text></Text>
                	<Text></Text>
                	<Text></Text>
					<View style={{flexDirection: 'row', flex: 'end', justifyContent: 'space-evenly', borderTopWidth:1,borderTopColor:"rgba(0,0,0,0.1)", paddingTop: 6, marginLeft: -13, marginRight: -13}}>
	                    <View>
	                        <TouchableOpacity onPress={() => {
	                            //reject invitation

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

	                    <View style={{borderRightColor: "rgba(0,0,0,0.1)", borderRightWidth: 1,}} />
	                    <View>
	                        <TouchableOpacity onPress={() => {
	                            //accept button

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
	        	<View>
	        		<Text>need to make it scrollable, </Text>
	        		<Text> https://snack.expo.io/@professorxii/expo-map-and-location-example </Text>
	        		<Text> https://snack.expo.io/SkqC-nNs- </Text>
					<View style={{flex: 1}}>
				        <MapView
				          style={{ alignSelf: 'stretch', height: ht-280 }}
				          region={{ latitude: this.state.location.coords.latitude, longitude: this.state.location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}
				          onRegionChange={this._handleMapRegionChange}
				        >
						    <MapView.Marker
						      coordinate={this.state.location.coords}
						      title="Current Location"
						    />
				        </MapView>      
				    </View>




	        	</View>
        	</View>
		)
	}
}



const styles = StyleSheet.create(
    {
        container:{
            height: 280,
            backgroundColor: 'white',
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

