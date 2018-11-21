
import React, { Component } from 'react';
import FetchSomething from './components/FetchSomething';

import { Platform, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import { Camera } from 'expo-camera';


// Doc at https://docs.expo.io/versions/latest/sdk/camera

export default class App extends React.Component {
  state = {
    location: null,
    errorMessage: null,

     hasCameraPermission: null,
    type: Camera.Constants.Type.back,
  };
  async componentWillMount () {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
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
    let cameraText = 'Camera...';
    let hasCameraPermission = this.state.hasCameraPermission;
    if (hasCameraPermission === null) {
       cameraText = 'Not avaliable';
    } else if (hasCameraPermission === false) {
      cameraText = 'No access to camera';
    } else {
      cameraText = 'avaliable';
    }
    if (cameraText == 'avaliable') {
      return (
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 1 }} type={this.state.type}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({
                    type:
                      this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back,
                  });
                }}>
                <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
        );
    } else {
      return (
        <View style={styles.container}>
          <Text >{text}</Text>
          <Text >{cameraText}</Text>
          <Text>Hello World!!</Text>

          <FetchSomething onGetSomething = {this.getSomething} />
        </View>
       );
    }
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
