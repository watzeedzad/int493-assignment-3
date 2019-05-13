//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import { Card } from "react-native-paper";

// create a component
class RestaurantItem extends Component {
  render() {
    let { restaurantName, restaurantRating, restaurantPicture } = this.props.item;

    return (
      <View style={styles.container}>
        <Card style={styles.card} elevation={3}>
          <TouchableOpacity onPress={() => this.props.onPress(this.props.item)}>
            <ImageBackground
              source={{ uri: restaurantPicture }}
              imageStyle={styles.restaurantItemBackground}
              style={styles.restaurantBackground}
            >
              <Text style={styles.restaurantLabel}>
                Name : {restaurantName}
              </Text>
              <Text style={styles.restaurantLabel}>
                Rating : {restaurantRating}
              </Text>
            </ImageBackground>
          </TouchableOpacity>
        </Card>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center"
  },
  card: {
    width: 350,
    height: 200,
    margin: 10
  },
  restaurantItemBackground: {
    resizeMode: "cover",
    opacity: 0.4
  },
  restaurantBackground: {
    width: "100%",
    height: "100%"
  },
  restaurantLabel: {
    fontSize: 18,
    opacity: 1
  }
});

//make this component available to the app
export default RestaurantItem;
