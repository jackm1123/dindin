import * as React from 'react'
import {StyleSheet, Text, View, Image, FlatList} from 'react-native'

export default class EventScrollView extends React.Component{

    constructor(props){
        super(props)
        console.log("da props")
        console.log(props)
        if (props.data === null || props.data === undefined){
            this.state={
                eventList: []
            }
        }
        else{
            console.log("okay, setting them to state now")
            console.log(props)
            this.state ={
                eventList: Object.values(props.data)
            }
        }
        //console.log("constructor invitations data")
        //console.log(this.state.invitations)
    }






/*
    constructor(props){
        super(props)
        this.state ={
            eventList: [{id:0, text: "yert"}, {id:1, text: "yert"}, {id:2, text: "yert"},
             {id:3, text: "yert"}, {id:4, text: "yert"}, {id:5, text: "yert"}, {id:6, text: "yert"},
             {id:7, text: "yert"}, {id:8, text: "yert"}, {id:9, text: "yert"}, {id:10, text: "yert"},
             {id:11, text: "yert"}, {id:12, text: "yert"}]
        }
    }
    /*
    componentWillMount(){
        this.getPodCastData()
    }

    async getPodCastData(){
        let response = await fetch("https://www.cs.virginia.edu/~dgg6b/Mobile/PodCast/podCastList.json")
        let extractedJson = await response.json()
        this.setState({
            podCastList: extractedJson.podCastList
        })
    }
	*/
	renderRow({item}){
        return(
            <View style={styles.rowContainer}>
                <Text>{item.date}</Text>
                
            	<Text>{JSON.stringify(item)}</Text>
            </View>
        )
    }
    
    keyExtractor(item){
        return item.host + item.time + item.date
    }

    render(){
        if(this.state.eventList !== null){
        return(
            <View style={styles.container}>
                 <FlatList
                    data={this.state.eventList}
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
            padding:20
        },

        rowContainer:{
            flexDirection:'row', 
            justifyContent: 'space-evenly',
            alignItems: 'center',
            padding: 15
        },

    }
)
