import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import firebase from 'firebase';
import OneSignal from 'react-native-onesignal';
import { Actions } from 'react-native-router-flux';
//import HomeForm from './HomeForm';


class Home extends Component {
  state = { loggedIn: null };

    componentWillMount() {
        const config = {
          apiKey: 'AIzaSyAXrcCFURDT1R2xs5kA5gslrx32SIZvTOk',
            authDomain: 'queuemehioa.firebaseapp.com',
            databaseURL: 'https://queuemehioa.firebaseio.com',
            projectId: 'queuemehioa',
            storageBucket: 'queuemehioa.appspot.com',
            messagingSenderId: '983563141366'
        };

        if (!firebase.apps.length) {
          firebase.initializeApp(config);
        }

        firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          //waits 2 seconds "kunstpause"
          //NEED TO STOP????????
          setTimeout(() => { this.setState({ loggedIn: true }); }, 2000);
        } else {
          //waits 2 seconds "kunstpause"
          setTimeout(() => { this.setState({ loggedIn: false }); }, 2000);
        }
      });
    }

    componentDidMount() {
        OneSignal.configure({

        });
    }

    startUp() {
      switch (this.state.loggedIn) {
        case true:
          Actions.homePage({ type: 'reset' });
          break;
        case false:
        //sends user to turtorial
        //if (this.props.firstTimeOnApp){
        //actions.modal
        //}
          Actions.auth({ type: 'reset' });
          break;
        default:
          this.renderImage({ type: 'reset' });
      }
    }

    renderImage() {
       /* eslint-disable global-require */
      return (
       <Image style={{ flex: 1, resizeMode: 'contain' }} source={require('./images/LOGO2.png')} />
       );
      /* eslint-enable global-require */
    }

    render() {
      return (
        <View style={{ backgroundColor: '#95CAFE', flex: 1 }}>

          <View style={{ flex: 1 }}>
            <Text style={{ color: '#95CAFE' }} placeholder />

          </View>

          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
            {this.renderImage()}
          </View>

          <View style={{ flex: 1 }}>
            <Text style={{ color: '#95CAFE' }} placeholder />
          </View>
            {this.startUp()}

        </View>
      );
    }
  }

export default Home;
