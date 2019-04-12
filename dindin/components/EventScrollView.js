import * as React from 'react'
import {StyleSheet, Text, View, Image, FlatList, Dimensions} from 'react-native'
import EventCard from './EventCard';
import MyEventCard from './MyEventCard';



const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]


const monthcaps = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const numDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];


export default class EventScrollView extends React.Component{

    /* NOTE: CANNOT HAVE 2 EVENTS SAME DAY OR THINGS MESS UP */
    /* NOTHING PREVENTS IT BUT IT BREAKS SYSTEM */

    constructor(props){
        super(props)

        myevents = Object.values(props.pending.myevents)

        if (props.data === null || props.data === undefined){
            myevents.sort(function(a, b){
                    var keyA = new Date(a.date),
                        keyB = new Date(b.date);
                    // Compare the 2 dates
                    if(keyA < keyB) return -1;
                    if(keyA > keyB) return 1;
                    return 0;
            })
            month_index = props.month
            arr_size = numDaysInMonth[month_index]
            iterator = 0
            original_size = myevents.length
            new_arr = []
            for (i = 1; i < arr_size + 1; i++){
                temp = new Date(myevents[iterator].date).getDate()
                temp2 = new Date(myevents[iterator].date).getMonth()
                if (i === temp && month_index === temp2){
                    new_arr.push(myevents[iterator])
                    if (iterator !== (original_size -1)){
                        iterator++
                    }
                }
                else{
                    new_arr.push({date: (month_index + 1).toString() + "/" + i.toString() + "/2019", host: "null"})
                }
            }
            this.state={
                eventList: new_arr,
                flex: 1,
            }
        }
        else{
            //console.log("okay, setting them to state now")
            //console.log(props)
            if (props.pending.invitations === undefined){
                let arr = Object.values(props.data)
                arr = arr.concat(myevents)
                arr.sort(function(a, b){
                    var keyA = new Date(a.date),
                        keyB = new Date(b.date);
                    // Compare the 2 dates
                    if(keyA < keyB) return -1;
                    if(keyA > keyB) return 1;
                    return 0;
                })
                month_index = props.month
                arr_size = numDaysInMonth[month_index]
                iterator = 0
                original_size = arr.length
                new_arr = []
                for (i = 1; i < arr_size + 1; i++){
                    temp = new Date(arr[iterator].date).getDate()
                    temp2 = new Date(arr[iterator].date).getMonth()
                    if (i === temp && month_index === temp2){
                        new_arr.push(arr[iterator])
                        if (iterator !== (original_size -1)){
                            iterator++
                        }
                    }
                    else{
                        new_arr.push({date: (month_index + 1).toString() + "/" + i.toString() + "/2019", host: "null"})
                    }
                }
                this.state={
                    flex: 0,
                    eventList: new_arr,
                }
            }
            else{
                let arr = Object.values(props.data)
                arr = arr.concat(myevents)
                arr.sort(function(a, b){
                    var keyA = new Date(a.date),
                        keyB = new Date(b.date);
                    // Compare the 2 dates
                    if(keyA < keyB) return -1;
                    if(keyA > keyB) return 1;
                    return 0;
                })
                month_index = props.month
                arr_size = numDaysInMonth[month_index]
                iterator = 0
                original_size = arr.length
                new_arr = []
                for (i = 1; i < arr_size + 1; i++){
                    temp = new Date(arr[iterator].date).getDate()
                    temp2 = new Date(arr[iterator].date).getMonth()
                    if (i === temp && month_index === temp2){
                        new_arr.push(arr[iterator])
                        if (iterator !== (original_size -1)){
                            iterator++
                        }
                    }
                    else{
                        new_arr.push({date: (month_index + 1).toString() + "/" + i.toString() + "/2019", host: "null"})
                    }
                }
                //console.log("new arr3")
                //console.log(new_arr)
                this.state={
                    flex:1,
                    eventList: new_arr,
                }
            }
        }
    }


	renderRow({item}){

        if (item.host === undefined){
            return(
                <View style={styles.rowContainer}>
                    <MyEventCard data={item} />
                </View>
            )
        }

        if (item.host == "null"){
            const ddate = new Date(item.date)
            return(
                <View>
                    <Text style={{fontWeight: "bold"}}>{weekday[ddate.getDay()]} {ddate.getDate()} {monthcaps[ddate.getMonth()]}</Text>
                    <View style={styles.rowContainer}>
                    <Image style={{margin: 15, height: 35, resizeMode: 'contain', alignItems: 'center',}} source={require('../assets/addevent.png')}>
                    </Image>
                    </View>
                        
                </View>
            )
        }
        return(
            <View style={styles.rowContainer}>
            	<EventCard data={item} />
            </View>
        )
    }
    
    keyExtractor(item){
        return item.host + item.time + item.date
    }

    render(){



        if(this.state.eventList !== null){
        return(
            <View style={[styles.container, {flex: this.state.flex,}]}>
                 <FlatList
                    style={{width: Dimensions.get('window').width, padding: 13}}
                    data={this.state.eventList}
                    renderItem={this.renderRow}
                    keyExtractor={this.keyExtractor}
                    showsVerticalScrollIndicator={false}
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
            padding: 30,
        },

        rowContainer:{
            flexDirection:'row', 
            justifyContent: 'space-evenly',
            alignItems: 'center',
        },

    }
)
