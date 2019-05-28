//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  ScrollView,
  ActivityIndicator
} from "react-native";
import RestaurantMap from "../components/Restaurant/RestaurantMap";
import { Actions } from "react-native-router-flux";
import BackHeader from "../components/Utils/BackHeader";
import * as actions from "../redux/actions";
import { connect } from "react-redux";

// create a component
class RestaurantDetail extends Component {
  componentWillMount = () => {
    this.focusListener = this.props.navigation.addListener("didFocus", () => {
      this.props.loadRestaurant(this.props.restaurantId);
    });
  };

  componentWillUnmount = () => {
    this.focusListener.remove();
  };

  render() {
    const {
      restaurantAddress,
      restaurantCloseTime,
      restaurantDesc,
      restaurantId,
      restaurantName,
      restaurantOpendate,
      restaurantOpenTime,
      restaurantPicturePath,
      restaurantRating,
      restaurantTypeDesc
    } = this.props.restaurant.data[0];

    if (this.props.restaurant.isLoading) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <ActivityIndicator animating={true} size="large" color="#FF8C00" />
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <BackHeader
          titleText={"Restaurant Detail"}
          onPress={() => Actions.pop()}
        />
        <ScrollView>
          <View>
            <View style={styles.container}>
              <Image
                style={styles.image}
                source={{ uri: restaurantPicturePath }}
              />
              <View style={styles.row}>
                <Text style={styles.detail}>Name: </Text>
                <Text style={styles.description}>{restaurantName} </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.detail}>Type: </Text>
                <Text style={styles.description}>{restaurantTypeDesc} </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.detail}>Opening time: </Text>
                <Text style={styles.description}>
                  {restaurantOpendate}, {restaurantOpenTime} -{" "}
                  {restaurantCloseTime}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.detail}>Description: </Text>
                <Text style={styles.description}>{restaurantDesc} </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.detail}>Address: </Text>
                <Text style={styles.description}>{restaurantAddress} </Text>
              </View>
            </View>
            <View style={styles.map}>
              <RestaurantMap restaurant={this.props.restaurant.data[0]} />
            </View>
            <View style={styles.button}>
              <Button
                title="Edit Restaurant"
                onPress={() => {
                  Actions.AddRestaurant({
                    restaurant: this.props.restaurant.data[0]
                  });
                }}
                color={"#FF8C00"}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 3,
    padding: 20,
    backgroundColor: "#ffffff"
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  map: {
    flex: 1,
    alignItems: "center",
    padding: 20
  },
  image: {
    height: 200
  },
  button: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 20
  },
  detail: {
    margin: 5,
    fontSize: 18,
    color: "orange",
    textAlign: "left"
  },
  description: {
    margin: 5,
    fontSize: 18
  }
});

function mapStateToProps(state) {
  return {
    restaurant: state.restaurantReducers.restaurant
  };
}

export default connect(
  mapStateToProps,
  actions
)(RestaurantDetail);
