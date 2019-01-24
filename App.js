import React, { Component }                                   from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import RNGooglePlacePicker                                    from 'react-native-google-place-picker';
import MapView, { PROVIDER_GOOGLE }                           from 'react-native-maps';

export default class App extends Component {
  state = {
    location: null,
  };
  
  onPress() {
    RNGooglePlacePicker.show((response) => {
      if (response.didCancel) {
        console.log('User cancelled GooglePlacePicker');
      } else if (response.error) {
        console.log('GooglePlacePicker Error: ', response.error);
      } else {
        this.setState({
          location: response,
        });
      }
    });
  }
  
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            region={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
          >
          </MapView>
        </View>
        
        <View style={styles.container2}>
          <TouchableOpacity onPress={this.onPress.bind(this)}>
            <Text style={{ color: '#72c02c', fontSize: 20, fontWeight: 'bold' }}>
              Click me to push Google Place Picker!
            </Text>
          </TouchableOpacity>
          <View style={styles.location}>
            <Text style={{ color: 'black', fontSize: 15 }}>
              {JSON.stringify(this.state)}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: .5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  container2: {
    flex: .5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  location: {
    backgroundColor: 'white',
    margin: 25,
  },
});
