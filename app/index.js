import React, { Component } from 'react'
import { ActivityIndicator, AsyncStorage, StyleSheet, Text, View } from 'react-native'
import MapView from 'react-native-maps'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as MapActions from './store/actions/map'

class App extends Component {

  state = {
    mapLoaded: false,
    region: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
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
          <MapView.Marker coordinate={this.state.region}>
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
    width: 10,
    height: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 10 / 2
  },
  pointer: {
    width: 5,
    height: 5,
    margin: 5 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#332235',
    borderRadius: 5 / 2,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App)