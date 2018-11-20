
import React, { Component } from 'react';
import FetchSomething from './components/FetchSomething';

import { Platform, Text, View, StyleSheet } from 'react-native';
import { Constants, Location, Permissions } from 'expo';

export default class App extends React.Component {
  state = {
    location: null,
    errorMessage: null,
  };
componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };
  getSomething =() => {
    // navigator.geolocation.getCurrentPostion(position => {
    //   console.log (position);
    // }, err => console.log (err) );
   console.log ("Pressed Button");
  };
  render() {
     let text = 'Waiting..';
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      text = JSON.stringify(this.state.location);
    }
    return (
      <View style={styles.container}>
        <Text >{text}</Text>

        <Text>Hello World!!</Text>
       
        <FetchSomething onGetSomething = {this.getSomething} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
