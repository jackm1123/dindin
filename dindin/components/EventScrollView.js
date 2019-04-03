import * as React from 'react'
import {StyleSheet, Text, View, Image, FlatList} from 'react-native'

export default class EventScrollView extends React.Component{

    constructor(props){
        const numDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        super(props)
        console.log("da props")
        console.log(props)
        console.log(props.pending.invitations)
        if (props.data === null || props.data === undefined){
            this.state={
                eventList: [],
                flex: 1,
            }
        }
        else{
            //console.log("okay, setting them to state now")
            //console.log(props)
            if (props.pending.invitations === undefined){
                let arr = Object.values(props.data)
                arr.sort(function(a, b){
                    var keyA = new Date(a.date),
                        keyB = new Date(b.date);
                    // Compare the 2 dates
                    if(keyA < keyB) return -1;
                    if(keyA > keyB) return 1;
                    return 0;
                })
                month_index = new Date(arr[0].date).getMonth()
                arr_size = numDaysInMonth[month_index]
                iterator = 0
                original_size = arr.length
                new_arr = []
                for (i = 1; i < arr_size + 1; i++){
                    temp = new Date(arr[iterator].date).getDate()
                    if (i === temp){
                        new_arr.push(arr[iterator])
                        if (iterator !== (original_size -1)){
                            iterator++
                        }
                    }
                    else{
                        new_arr.push({date: "null"})
                    }
                }
                this.state={
                    flex: 0,
                    eventList: new_arr,
                }
            }
            else{
                let arr = Object.values(props.data)
                arr.sort(function(a, b){
                    var keyA = new Date(a.date),
                        keyB = new Date(b.date);
                    // Compare the 2 dates
                    if(keyA < keyB) return -1;
                    if(keyA > keyB) return 1;
                    return 0;
                })
                month_index = new Date(arr[0].date).getMonth()
                arr_size = numDaysInMonth[month_index]
                iterator = 0
                original_size = arr.length
                new_arr = []
                for (i = 1; i < arr_size + 1; i++){
                    temp = new Date(arr[iterator].date).getDate()
                    if (i === temp){
                        new_arr.push(arr[iterator])
                        if (iterator !== (original_size -1)){
                            iterator++
                        }
                    }
                    else{
                        new_arr.push({date: "null"})
                    }
                }
                this.state={
                    flex:1,
                    eventList: new_arr,
                }
            }
        }
    }


	renderRow({item}){
        return(
            <View style={styles.rowContainer}>
            	<Text>{JSON.stringify(item)}</Text>
            </View>
        )
    }
    
    keyExtractor(item){
        return item.host + item.time + item.date + Math.random()
    }

    render(){



        if(this.state.eventList !== null){
        return(
            <View style={[styles.container, {flex: this.state.flex}]}>
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
            flex: 0,
            padding: 20,
        },

        rowContainer:{
            flexDirection:'row', 
            justifyContent: 'space-evenly',
            alignItems: 'center',
            padding: 15
        },

    }
)
