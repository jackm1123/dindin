import React from 'react';
import { TouchableOpacity, Animated, StyleSheet, Text, View, Button, Image, Dimensions, } from 'react-native';
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
          currentContext.setState({
              snapshot: snapshot.val()
          })
      });

  }

  writeUserData(name){
      id = this.props.navigation.state.params.profile.id

      firebase.database().ref('Users/' + id).update({
          name
      })
  }

  //needs a stupid key specified for any mapping or react native gets angry
  _renderTabBar = props => {
    const inputRange = props.navigationState.routes.map((x, i) => i);
    return (
      <View style={{flexDirection: 'row', paddingTop: 10,}}>
        {props.navigationState.routes.map((route, i) => {

          let color = 'gray';
          if (i === this.state.index){
            color = 'black'
          } 
          return (
            <TouchableOpacity
              key={Math.random().toString()}
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
        <PendingScrollView data={this.state.snapshot} userid={this.props.navigation.state.params.profile.id}/>
        <EventScrollView data={this.state.snapshot.accepted.january} pending={this.state.snapshot} month={0}/>
    </View>
    )

    february = () => (
      <View style={styles.container}>
      <PendingScrollView data={this.state.snapshot} userid={this.props.navigation.state.params.profile.id}/>
      <EventScrollView data={this.state.snapshot.accepted.february} pending={this.state.snapshot} month={1}/>
    </View>
    )

    march = () => (
      <View style={styles.container}>
      <PendingScrollView data={this.state.snapshot} userid={this.props.navigation.state.params.profile.id}/>
      <EventScrollView data={this.state.snapshot.accepted.march} pending={this.state.snapshot} month={2}/>
    </View>
    )

    april = () => (
      <View style={styles.container}>
      <PendingScrollView data={this.state.snapshot} userid={this.props.navigation.state.params.profile.id}/>
      <EventScrollView data={this.state.snapshot.accepted.april} pending={this.state.snapshot} month={3}/>
    </View>
    )

    may = () => (
      <View style={styles.container}>
      <PendingScrollView data={this.state.snapshot} userid={this.props.navigation.state.params.profile.id}/>
      <EventScrollView data={this.state.snapshot.accepted.may} pending={this.state.snapshot} month={4}/>
    </View>
    )

    june = () => (
      <View style={styles.container}>
      <PendingScrollView data={this.state.snapshot} userid={this.props.navigation.state.params.profile.id}/>
      <EventScrollView data={this.state.snapshot.accepted.june} pending={this.state.snapshot} month={5}/>
    </View>
    )

    july = () => (
      <View style={styles.container}>
      <PendingScrollView data={this.state.snapshot} userid={this.props.navigation.state.params.profile.id}/>
      <EventScrollView data={this.state.snapshot.accepted.july} pending={this.state.snapshot} month={6}/>
    </View>
    )

    august = () => (
      <View style={styles.container}>
      <PendingScrollView data={this.state.snapshot} userid={this.props.navigation.state.params.profile.id}/>
      <EventScrollView data={this.state.snapshot.accepted.august} pending={this.state.snapshot} month={7}/>
    </View>
    )

    september = () => (
      <View style={styles.container}>
      <PendingScrollView data={this.state.snapshot} userid={this.props.navigation.state.params.profile.id}/>
      <EventScrollView data={this.state.snapshot.accepted.september} pending={this.state.snapshot} month={8}/>
    </View>
    )

    october = () => (
      <View style={styles.container}>
      <PendingScrollView data={this.state.snapshot} userid={this.props.navigation.state.params.profile.id}/>
      <EventScrollView data={this.state.snapshot.accepted.october} pending={this.state.snapshot} month={9}/>
    </View>
    )

    november = () => (
      <View style={styles.container}>
      <PendingScrollView data={this.state.snapshot} userid={this.props.navigation.state.params.profile.id}/>
      <EventScrollView data={this.state.snapshot.accepted.november} pending={this.state.snapshot} month={10}/>
    </View>
    )

    december = () => (
      <View style={styles.container}>
      <PendingScrollView data={this.state.snapshot} userid={this.props.navigation.state.params.profile.id}/>
      <EventScrollView data={this.state.snapshot.accepted.december} pending={this.state.snapshot} month={11}/>
    </View>
    )

    if (this.state.snapshot === ''){
      return (
        <View style={styles.container} >
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
    marginTop: 0,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',

  },
  container: {
    flex: 2,
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
