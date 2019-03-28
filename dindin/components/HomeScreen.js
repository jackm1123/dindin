import React from 'react';
import { TouchableOpacity, Animated, StyleSheet, Text, View, Button, Image, ScrollView, ListView, Dimensions, StatusBar, } from 'react-native';
import {HeaderBackButton} from 'react-navigation'
import PendingScrollView from './PendingScrollView';
import EventScrollView from './EventScrollView';
import { TabView, SceneMap } from 'react-native-tab-view';
import {Constants} from 'expo';
import * as firebase from 'firebase';

//Initialize Firebase
var config = {
    databaseURL: "https://dindind-ffbf6.firebaseio.com/",
    projectId: "dindind-ffbf6>",
};
if (!firebase.apps.length) {
    firebase.initializeApp(config);
}






/*Customize Back button in header*/
class MyCustomHeaderBackImage extends React.Component {
  render() {
    const source = require('../assets/sidemenu.png');
    return (
      <Image
        source={source}
        style={[styles2.myCustomHeaderBackImage, this.props.style]}
      />
    );
  }
}

export default class HomeScreen extends React.Component {
    
  static navigationOptions = ({ navigation }) => ({
    title: 'DinDin',
    headerBackImage: (
      <MyCustomHeaderBackImage />
    ),
    headerBackTitleStyle: {
      color: 'white',
    },

    headerRight: (
      <Image
        source={require('../assets/search.png')}
        style={styles2.myCustomHeaderBackImage}
      /> 
    ),
  })
    /*
    headerRight: (
      <Button
        onPress={()=>navigation.navigate('Splash')} 
        style={styles2.myCustomHeaderBackImage}
        title="me"
      /> 
    ),
    
    */
  


  constructor(props){
    super(props)
    this.readUserData(this.props.navigation.state.params.profile.id)
    this.state = {snapshot: "",
                  index: 0,
                  routes: [
                    { key: 'january', title: 'J' },
                    { key: 'february', title: 'F' },
                    { key: 'march', title: 'M' },
                    { key: 'april', title: 'A' },
                    { key: 'may', title: 'M' },
                    { key: 'june', title: 'J' },
                    { key: 'july', title: 'J' },
                    { key: 'august', title: 'A' },
                    { key: 'september', title: 'S' },
                    { key: 'october', title: 'O' },
                    { key: 'november', title: 'N' },
                    { key: 'december', title: 'D' },
                  ],
    }
  }

  readUserData(path) {
      currentContext = this 
      firebase.database().ref('Users/' + path).on('value', function (snapshot) {
          console.log("snapshot reading")
          console.log(snapshot.val())
          currentContext.setState({
              snapshot: snapshot.val()
          })
          //console.log("state in readuserdata / HomeScreen")
          //console.log(currentContext.state)
      });

  }

  writeUserData(name){
      id = this.props.navigation.state.params.profile.id

      firebase.database().ref('Users/' + id).update({
          name
      }).then((data)=>{
          //success callback
          console.log('data ' , data)
      }).catch((error)=>{
          //error callback
          console.log('error ' , error)
      })
  }

  _renderTabBar = props => {
    const inputRange = props.navigationState.routes.map((x, i) => i);
    return (
      <View style={{flexDirection: 'row', paddingTop: Constants.statusBarHeight,}}>
        {props.navigationState.routes.map((route, i) => {

          let color = 'gray';
          if (i === this.state.index){
            color = 'black'
          } 
          return (
            <TouchableOpacity
              style={{flex: 1, alignItems: 'center', padding: 4,}}
              onPress={() => this.setState({ index: i })}>
              <Animated.Text style={{ color }}>{route.title}</Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  render() {

    this.writeUserData(this.props.navigation.state.params.profile.name)



    january = () => (
      <View style={styles.container}>
      <PendingScrollView data={this.state.snapshot}/>
      <EventScrollView data={this.state.snapshot.accepted.january}/>
    </View>
    )

    february = () => (
      <View style={styles.container}>
      <PendingScrollView data={this.state.snapshot}/>
      <EventScrollView data={this.state.snapshot.accepted.february}/>
    </View>
    )

    march = () => (
      <View style={styles.container}>
      <PendingScrollView data={this.state.snapshot}/>
      <EventScrollView data={this.state.snapshot.accepted.march}/>
    </View>
    )

    april = () => (
      <View style={styles.container}>
      <PendingScrollView data={this.state.snapshot}/>
      <EventScrollView data={this.state.snapshot.accepted.april}/>
    </View>
    )

    may = () => (
      <View style={styles.container}>
      <PendingScrollView data={this.state.snapshot}/>
      <EventScrollView data={this.state.snapshot.accepted.may}/>
    </View>
    )

    june = () => (
      <View style={styles.container}>
      <PendingScrollView data={this.state.snapshot}/>
      <EventScrollView data={this.state.snapshot.accepted.june}/>
    </View>
    )

    july = () => (
      <View style={styles.container}>
      <PendingScrollView data={this.state.snapshot}/>
      <EventScrollView data={this.state.snapshot.accepted.july}/>
    </View>
    )

    august = () => (
      <View style={styles.container}>
      <PendingScrollView data={this.state.snapshot}/>
      <EventScrollView data={this.state.snapshot.accepted.august}/>
    </View>
    )

    september = () => (
      <View style={styles.container}>
      <PendingScrollView data={this.state.snapshot}/>
      <EventScrollView data={this.state.snapshot.accepted.september}/>
    </View>
    )

    october = () => (
      <View style={styles.container}>
      <PendingScrollView data={this.state.snapshot}/>
      <EventScrollView data={this.state.snapshot.accepted.october}/>
    </View>
    )

    november = () => (
      <View style={styles.container}>
      <PendingScrollView data={this.state.snapshot}/>
      <EventScrollView data={this.state.snapshot.accepted.november}/>
    </View>
    )

    december = () => (
      <View style={styles.container}>
      <PendingScrollView data={this.state.snapshot}/>
      <EventScrollView data={this.state.snapshot.accepted.december}/>
    </View>
    )

    if (this.state.snapshot === ''){
      return (
        <View style={styles.container} >
        <Text>loading ...</Text>
        </View>
      )
    }
    return (
      <TabView
        lazy
        navigationState={this.state}
        renderScene={SceneMap({
          january: january,
          february: february,
          march: march,
          april: april,
          may: may,
          june: june,
          july: july,
          august: august,
          september: september,
          october: october,
          november: november,
          december: december,
        })}
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ width: Dimensions.get('window').width}}
        style={styles.container2}
        renderTabBar={this._renderTabBar}
      />
    );
  }
}

const styles = StyleSheet.create({
  container2: {
    marginTop: StatusBar.currentHeight
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const styles2 = StyleSheet.create({
  myCustomHeaderBackImage: {
    height: 14.5,
    width: 24,
    marginLeft: 9,
    marginRight: 12,
    marginVertical: 12,
    resizeMode: 'contain',
  },
  myCustomHeaderBackImageAlt: {
    tintColor: '#f00',
  },
});
