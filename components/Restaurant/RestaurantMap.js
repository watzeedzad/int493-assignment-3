//import liraries
import React, { Component } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { MapView } from "expo";
import { GOOGLE_KEY } from "../../Utils/GoogleMapApiKey";
const { Marker, AnimatedRegion } = MapView;

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE = 13.6511922;
const LONGITUDE = 100.4965789;
const LATITUDE_DELTA = 0.015;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

// create a component
class RestaurantMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      coordinate: new AnimatedRegion({
        latitude: this.props.restaurant.restaurantLat,
        longitude: this.props.restaurant.restaurantLong
      })
    };
  }

  componentDidMount = () => {
    this.setDestination();
  };

  setDestination = () => {
    const { restaurantLat, restaurantLong } = this.props.restaurant;
    const latitude = restaurantLat;
    const longitude = restaurantLong;

    this.setState({
      destination: {
        latitude,
        longitude
      }
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

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          loadingEnabled
          provider="google"
          ref={c => (this.mapView = c)}
          initialRegion={this.state.latitude ? this.getMapRegion() : null}
        >
          <Marker.Animated
            ref={marker => {
              this.marker = marker;
            }}
            coordinate={this.state.coordinate}
          />
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
    backgroundColor: "#FFFFFF",
    margin: 10,
    padding: 10
  },
  map: {
    height: 200,
    width: width
  }
});

//make this component available to the app
export default RestaurantMap;
