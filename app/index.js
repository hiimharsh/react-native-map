import React, { Component } from 'react'
import { ActivityIndicator, AsyncStorage, StyleSheet, Text, View } from 'react-native'
import MapView from 'react-native-maps'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as MapActions from './store/actions/map'

class App extends Component {

  constructor (props) {
    super (props);

    this.state = {
      mapLoaded: false,
      showInfo: false,
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }
    }
  }

  componentDidMount () {
    this.setState({mapLoaded: true})
    AsyncStorage.getItem('mapLocation', (err, result) => {
      if (result) {
        this.setState({
          region: JSON.parse(result)
        });
      }
    });
  }

  onRegionChangeComplete = (region) => {
    this.setState({region});
    this.props.action.updateMapLocation(this.state.region);
  }

  onMarkerPress () {
    this.setState({showInfo: !this.state.showInfo})
  }

  render () {
    if (!this.state.mapLoaded) {
      return (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator size="large" />
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={this.state.region}
          onRegionChangeComplete={this.onRegionChangeComplete}>
          <MapView.Marker
            coordinate={this.state.region}
            onPress={(coordinate) => this.onMarkerPress(coordinate)}>
            {
              this.state.showInfo ?
              <View style={styles.showInfo}>
                <Text style={styles.markerText}>{this.state.region.latitude}</Text>
                <Text style={styles.markerText}>{this.state.region.longitude}</Text>
              </View> :
              <View></View>
            }
            <View style={styles.marker}>
              <View style={styles.pointer}></View>
            </View>
          </MapView.Marker>
        </MapView>
      </View>
    )
  }
}

function mapStateToProps (state, props) {
  return {
    region: state.map
  }
}

function mapDispatchToProps (dispatch) {
  return {
    action: bindActionCreators(MapActions, dispatch)
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  marker: {
    width: 12,
    height: 12,
    borderWidth: 1,
    borderColor: '#01A3D3',
    backgroundColor: 'white',
    borderRadius: 12 / 2
  },
  pointer: {
    width: 5,
    height: 5,
    margin: 5 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#01A3D3',
    borderRadius: 5 / 2,
  },
  showInfo: {
    width: 110,
    height: 30,
    backgroundColor: '#01A3D3',
    position: 'absolute',
    top: -32,
    left: -45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
  },
  markerText: {
    color: 'white',
    fontSize: 9,
    fontWeight: 'bold',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App)