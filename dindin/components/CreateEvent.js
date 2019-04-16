import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Dimensions, TextInput} from 'react-native';
import {Permissions, Location, MapView} from 'expo';
import * as firebase from 'firebase';
import Geocode from "react-geocode";
import DateTimePicker from 'react-native-modal-datetime-picker';

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

const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

var ht = Dimensions.get('window').height;

export default class CreateEvent extends React.Component {

	static navigationOptions = ({ navigation }) => ({
	    title: 'DinDin',
		headerBackTitleStyle: {
	        color: 'white',
	    },
	 })

	constructor(props){
		super(props);
        Geocode.setApiKey("AIzaSyC01WGGqQ_6fkdF_nJNUj4q9G6WF7BUXTs");
        this.state={
            isDateTimePickerVisible: false,
            time: '9:00 PM',
            mapRegion: { latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
            location: {coords: { latitude: 38.0299891, longitude: -78.5056676}},
            address: "",
        }
    }
    
    showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    handleDatePicked = (date) => {
        dateArray = date.toString().split(" ");
        selected_time = dateArray[4].slice(0, -3); //get the time, then remove the seconds from end
        //make it am and pm not military
        hour = selected_time.slice(0, 2);
        ampm = "AM";
        if (hour > 11){
            ampm = "PM";
            if (hour != 12){
                hour = hour - 12;
            }
            selected_time = hour.toString() + selected_time.slice(2, 5);
        }
        else{
            if (hour == 0){
                hour = 12;
                selected_time = hour.toString() + selected_time.slice(2, 5);
            }
            if (hour < 10){
                selected_time = selected_time.slice(1, 5);
            }
        }
        selected_time = selected_time + " " + ampm;
        this.setState({time: selected_time});
        this.hideDateTimePicker();
    };

	componentDidMount() {
		//get the coordinates of current user location and of address of restaurant
        this.getLocationAsync();
        this.getAddressAsync();
    }
    
	getLocationAsync = async () => {
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
    
    getAddressAsync = async () => {
        Geocode.fromLatLng(this.state.location.coords.latitude, this.state.location.coords.longitude).then(
            response => {
              this.setState({address : response.results[0].formatted_address});
            },
            error => {
              console.error(error);
            }
        );
    }

    getCoordAsync =  async () => {
        Geocode.fromAddress(this.state.address).then(
            response => {
                const { lat, lng } = response.results[0].geometry.location;
                this.setState({
                    location: {coords: {latitude: lat, longitude: lng}},
                })
            },
            error => {
                console.error(error);
            }
        );
    }

    updateLocation = (text) => {
        this.setState({address:text.nativeEvent.text});
        this.getCoordAsync();

    }

    updateCoordsAndAddress = (e) => {
        this.setState({
            location:
                {coords: { latitude: e.nativeEvent.coordinate.latitude, longitude: e.nativeEvent.coordinate.longitude}}
        });
        this.getAddressAsync();
    }

	
    
    render(){
        renderContext = this;

		return(
            <View style={{flex:1}}>
                <View style={{alignItems:'center'}}>
                    <Text style={{margin:20,fontSize:20,color:'grey'}}>What time is dinner?</Text>
                    <TouchableOpacity onPress={this.showDateTimePicker}>
                        <Text style={{margin:20, fontSize:80,}}>{this.state.time}</Text>
                    </TouchableOpacity>
                    <DateTimePicker mode='time'
                        isVisible={this.state.isDateTimePickerVisible}
                        onConfirm={this.handleDatePicked}
                        onCancel={this.hideDateTimePicker}
                    />
                </View>
                <View style={{alignItems:'center'}}>
                    <TextInput style={{fontSize:20}}onSubmitEditing={(text)=>this.updateLocation(text)}>
                        {this.state.address}
                    </TextInput>
                </View>
                <View>
                    <MapView 
                          style={{ alignSelf: 'stretch', height: ht-280 }}
				          region={{ latitude: this.state.location.coords.latitude, longitude: this.state.location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}
				    >
                        <MapView.Marker draggable
                            coordinate={this.state.location.coords}
                            onDragEnd={(e)=> this.updateCoordsAndAddress(e)}
                            onPress={(e)=> {
                                this.getLocationAsync();
                                this.updateCoordsAndAddress(e);
                            }
                            }
						    title={(this.state.address.split(','))[0]}
						/>
						
                    </MapView>
                </View>
            </View>
        )
    }
}