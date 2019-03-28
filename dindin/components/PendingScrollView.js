import * as React from 'react'
import {StyleSheet, Text, View, Image, FlatList} from 'react-native'
import InviteCard from './InviteCard';
import * as firebase from 'firebase';

//Initialize Firebase
var config = {
    databaseURL: "https://dindind-ffbf6.firebaseio.com/",
    projectId: "dindind-ffbf6>",
};
if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

export default class EventScrollView extends React.Component{
	    constructor(props){
        	super(props)
            if (props.data.invitations === null || props.data.invitations === undefined){
                this.state={
                    invitations: []
                }
            }
            else{
            	this.state ={
               		invitations: Object.values(props.data.invitations)
            	}
            }
            //console.log("constructor invitations data")
            //console.log(this.state.invitations)
    	}

    	componentWillReceiveProps(nextProps) {
            if (nextProps.data.invitations === null || nextProps.data.invitations === undefined){
                this.setState({ invitations: []})
            }
            else{
                this.setState({ invitations: Object.values(nextProps.data.invitations) })
            }
    	}


    	keyExtractor(item){
        	return Math.random()
    	}

    	renderRow({item}){

	        return(
            <View style={styles.rowContainer}>
                <InviteCard data={item}/>
            </View>
        )
    	}

        render(){
            console.log("logging pendingview")
            console.log(JSON.stringify(this.state.invitations))
            if(this.state.invitations !== null){
            return(
                <View style={styles.container}>
                    <Text style={{alignItems: 'center'}}> Pending ({this.state.invitations.length}) </Text>
                     <FlatList
                        horizontal
                        data={this.state.invitations}
                        renderItem={this.renderRow}
                        keyExtractor={this.keyExtractor}
                    />
                </View>
            )
            }else{
                return(<View style={{flex:1}}/>)
            }
        }

}


const styles = StyleSheet.create(
    {
        container:{
            flex:1,
            flexWrap: 'wrap',
            flexDirection:'column',
            justifyContent: 'space-between',
            alignItems: 'center',
        },

        rowContainer:{
            flexDirection:'row', 
            justifyContent: 'space-evenly',
            alignItems: 'center',
            padding: 15
        },

    }
)



