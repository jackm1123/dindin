import React from 'react';
import { TouchableOpacity, Animated, StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import PendingScrollView from './PendingScrollView';
import EventScrollView from './EventScrollView';
import { TabView, SceneMap } from 'react-native-tab-view';
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
  };
};



export default class HomeScreen extends React.Component {
    
  static navigationOptions = () => ({
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

  constructor(props){
    super(props);
    this.readUserData(this.props.navigation.state.params.profile.id);
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
    };
  };

  readUserData(path) {
      currentContext = this 
      firebase.database().ref('Users/' + path).on('value', function (snapshot) {
          currentContext.setState({
              snapshot: snapshot.val()
          });
      });
  };

  writeUserData(name){
      id = this.props.navigation.state.params.profile.id;
      firebase.database().ref('Users/' + id).update({
          name
      });
  };

  renderTabBar = props => {
    return (
      <View style={{flexDirection: 'row', paddingTop: 10,}}>
        {props.navigationState.routes.map((route, i) => {

          let color = 'gray';
          if (i === this.state.index){
            color = 'black'
          } 
          return (
            <TouchableOpacity
              key={Math.random().toString()} //to avoid unique key mapping warnings
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
    this.writeUserData(this.props.navigation.state.params.profile.name) //write your user to DB if its new first time on app

    //define rendering methods for each month in calendar tab view
    january = () => (
      <View style={styles.container}>
        <PendingScrollView data={this.state.snapshot} userid={this.props.navigation.state.params.profile.id} navigation={this.props.navigation}/>
        <EventScrollView data={this.state.snapshot.accepted.january} pending={this.state.snapshot} month={0} navigation={this.props.navigation}/>
    </View>
    )

    february = () => (
      <View style={styles.container}>
      <PendingScrollView data={this.state.snapshot} userid={this.props.navigation.state.params.profile.id} navigation={this.props.navigation}/>
      <EventScrollView data={this.state.snapshot.accepted.february} pending={this.state.snapshot} month={1} navigation={this.props.navigation}/>
    </View>
    )

    march = () => (
      <View style={styles.container}>
      <PendingScrollView data={this.state.snapshot} userid={this.props.navigation.state.params.profile.id} navigation={this.props.navigation}/>
      <EventScrollView data={this.state.snapshot.accepted.march} pending={this.state.snapshot} month={2} navigation={this.props.navigation}/>
    </View>
    )

    april = () => (
      <View style={styles.container}>
      <PendingScrollView data={this.state.snapshot} userid={this.props.navigation.state.params.profile.id} navigation={this.props.navigation}/>
      <EventScrollView data={this.state.snapshot.accepted.april} pending={this.state.snapshot} month={3} navigation={this.props.navigation}/>
    </View>
    )

    may = () => (
      <View style={styles.container}>
      <PendingScrollView data={this.state.snapshot} userid={this.props.navigation.state.params.profile.id} navigation={this.props.navigation}/>
      <EventScrollView data={this.state.snapshot.accepted.may} pending={this.state.snapshot} month={4} navigation={this.props.navigation}/>
    </View>
    )

    june = () => (
      <View style={styles.container}>
      <PendingScrollView data={this.state.snapshot} userid={this.props.navigation.state.params.profile.id} navigation={this.props.navigation}/>
      <EventScrollView data={this.state.snapshot.accepted.june} pending={this.state.snapshot} month={5} navigation={this.props.navigation}/>
    </View>
    )

    july = () => (
      <View style={styles.container}>
      <PendingScrollView data={this.state.snapshot} userid={this.props.navigation.state.params.profile.id} navigation={this.props.navigation}/>
      <EventScrollView data={this.state.snapshot.accepted.july} pending={this.state.snapshot} month={6} navigation={this.props.navigation}/>
    </View>
    )

    august = () => (
      <View style={styles.container}>
      <PendingScrollView data={this.state.snapshot} userid={this.props.navigation.state.params.profile.id} navigation={this.props.navigation}/>
      <EventScrollView data={this.state.snapshot.accepted.august} pending={this.state.snapshot} month={7} navigation={this.props.navigation}/>
    </View>
    )

    september = () => (
      <View style={styles.container}>
      <PendingScrollView data={this.state.snapshot} userid={this.props.navigation.state.params.profile.id} navigation={this.props.navigation}/>
      <EventScrollView data={this.state.snapshot.accepted.september} pending={this.state.snapshot} month={8} navigation={this.props.navigation}/>
    </View>
    )

    october = () => (
      <View style={styles.container}>
      <PendingScrollView data={this.state.snapshot} userid={this.props.navigation.state.params.profile.id} navigation={this.props.navigation}/>
      <EventScrollView data={this.state.snapshot.accepted.october} pending={this.state.snapshot} month={9} navigation={this.props.navigation}/>
    </View>
    )

    november = () => (
      <View style={styles.container}>
      <PendingScrollView data={this.state.snapshot} userid={this.props.navigation.state.params.profile.id} navigation={this.props.navigation}/>
      <EventScrollView data={this.state.snapshot.accepted.november} pending={this.state.snapshot} month={10} navigation={this.props.navigation}/>
    </View>
    )

    december = () => (
      <View style={styles.container}>
      <PendingScrollView data={this.state.snapshot} userid={this.props.navigation.state.params.profile.id} navigation={this.props.navigation}/>
      <EventScrollView data={this.state.snapshot.accepted.december} pending={this.state.snapshot} month={11} navigation={this.props.navigation}/>
    </View>
    )

    //return blank screen while waiting for firebase data
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
        renderTabBar={this.renderTabBar}
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
