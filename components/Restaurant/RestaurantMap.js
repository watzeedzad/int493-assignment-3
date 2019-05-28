//import liraries
import React, { Component } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { MapView } from "expo";
import { GOOGLE_KEY } from "../../Utils/GoogleMapApiKey";
const { Marker, AnimatedRegion } = MapView;

const { width, height } = Dimensions.get("screen");
const ASPECT_RATIO = width / height;
const LATITUDE = 13.6511922;
const LONGITUDE = 100.4965789;
const LATITUDE_DELTA = 0.007;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

// create a component
class RestaurantMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      coordinate: null
    };
  }

  componentDidMount = () => {
    if (this.props.restaurant) {
      this.setDestination();
    }
  };

  setDestination = () => {
    const { restaurantLat, restaurantLong } = this.props.restaurant;

    this.setState({
      latitude: restaurantLat,
      longitude: restaurantLong,
      coordinate: new AnimatedRegion({
        latitude: this.props.restaurant.restaurantLat,
        longitude: this.props.restaurant.restaurantLong
      })
    });

    this.watchLocation(restaurantLat, restaurantLong);
  };

  watchLocation = async (restaurantLat, restaurantLong) => {
    const { coordinate } = this.state;
    const newCoordinate = {
      restaurantLat,
      restaurantLong
    };
    if (this.marker) {
      coordinate.timing(newCoordinate).start();
    }
  };

  getMapRegion = () => ({
    latitude: this.state.latitude || LATITUDE,
    longitude: this.state.longitude || LONGITUDE,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
  });

  setMarker = event => {
    if (!this.props.restaurant) {
      const { latitude, longitude } = event.nativeEvent.coordinate;
      this.props.setAddress(latitude, longitude);
      this.setState({
        latitude: latitude,
        longitude: longitude,
        coordinate: new AnimatedRegion({
          latitude: latitude,
          longitude: longitude
        })
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          onPress={event => this.setMarker(event)}
          loadingEnabled
          provider="google"
          ref={c => (this.mapView = c)}
          initialRegion={this.getMapRegion()}
        >
          {this.state.coordinate && (
            <Marker.Animated
              ref={marker => {
                this.marker = marker;
              }}
              coordinate={this.state.coordinate}
            />
          )}
        </MapView>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginTop: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10
  },
  map: {
    height: 200,
    width: width
  }
});

//make this component available to the app
export default RestaurantMap;
