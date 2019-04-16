import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, Dimensions} from 'react-native';
import {Permissions, Location, MapView} from 'expo';
import * as firebase from 'firebase';
import Geocode from "react-geocode";

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
		Geocode.setApiKey("AIzaSyC01WGGqQ_6fkdF_nJNUj4q9G6WF7BUXTs");

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
		    dest_location: { latitude: 0, longitude: 0},
	    }
	}

	componentDidMount() {
		//get the coordinates of current user location and of address of restaurant
		this._getLocationAsync();
		this._getCoordAsync();
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

	_getCoordAsync =  async () => {
		Geocode.fromAddress(this.state.address).then(
			response => {
			    const { lat, lng } = response.results[0].geometry.location;
			    this.setState({
			    	dest_location: {latitude: lat, longitude: lng},
				})
			},
			error => {
			    console.error(error);
			}
		);
	}


	render(){
		const ddate = new Date(this.state.date);
		renderContext = this
		return(
			<View>
				<View style={styles.container}>
                    <View style={{alignItems: 'center'}}>
                        <Image style={{borderRadius:45, height: 90, width: 90, margin: 10,}} source={require('../assets/profile.jpg')}>
                        </Image>
                    </View>
                    <View style={{flexDirection: 'column', alignItems: 'center'}}>
                        <Text style={{fontSize: 20, color: 'black'}}>{((this.state.address).split(','))[0]}</Text>
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
	                            firebase.database().ref('Users/' + userid + '/invitations/' + id).remove();
	                            this.props.navigation.goBack()
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
	                            address = this.state.address;
	                            const d = new Date((this.state.date).toString());
	                            month = monthNames[d.getMonth()];
	                            userid = this.state.userid
	                            id = this.state.id

                                firebase.database().ref('Users/' + userid + '/invitations/' + id).remove();
                                firebase.database().ref('Users/' + userid + '/accepted/' + month + '/').push({
                                    date,
                                    host,
                                    time,
                                    address,
                                });
                                this.props.navigation.goBack()
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
					<View style={{flex: 1}}>
				        <MapView
				          style={{ alignSelf: 'stretch', height: ht-280 }}
				          region={{ latitude: this.state.location.coords.latitude, longitude: this.state.location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}
				        >
						    <MapView.Marker
						      coordinate={this.state.location.coords}
						      title="Current Location"
						    />
						    <MapView.Marker
						      coordinate={this.state.dest_location}
						      title={((this.state.address).split(','))[0]}
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
    }
)

