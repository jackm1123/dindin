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
                    invitations: [],
                    userid: props.userid,
                }
            }
            else{
                invts = Object.values(props.data.invitations)
                invtids = Object.keys(props.data.invitations)
                for (i = 0; i < invts.length; i++){
                    invts[i].id = invtids[i]
                }
            	this.state ={
               		invitations: invts,
                    userid: props.userid,
            	}
            }  
    	}

    	componentWillReceiveProps(nextProps) {
            if (nextProps.data.invitations === null || nextProps.data.invitations === undefined){
                this.setState({ invitations: [],
                                userid: props.userid, })
            }
            else{
                invts = Object.values(nextProps.data.invitations)
                invtids = Object.keys(nextProps.data.invitations)
                for (i = 0; i < invts.length; i++){
                    invts[i].id = invtids[i]
                }
                this.setState({ invitations: invts,
                                userid: props.userid, })
            }
    	}

        //keys always have to be string
    	keyExtractor(item){
        	return item.host.toString() + item.date.toString() + item.time.toString()
    	}


    	renderRow({item}){
	        return(
            <View style={styles.rowContainer}>
                <InviteCard data={item} userid={currContext.state.userid}/>
            </View>
            )
    	}

        _listEmptyComponent(){
            return (
                <View>
                </View>
            )
        }




        render(){
            if(this.state.invitations !== null){
            currContext = this
            return(
                <View style={styles.container}>
                    <Text style={{alignItems: 'center'}}> Pending ({this.state.invitations.length}) </Text>
                     <FlatList
                        horizontal
                        data={this.state.invitations}
                        renderItem={this.renderRow}
                        keyExtractor={this.keyExtractor}
                        ListEmptyComponent={this._listEmptyComponent}
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
            flexWrap: 'nowrap',
            flexDirection:'column',
            height: 40,
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



