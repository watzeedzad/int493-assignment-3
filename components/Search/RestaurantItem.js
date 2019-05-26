//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions
} from "react-native";
import { Card } from "react-native-paper";

const deviceWidth = (Dimensions.get("window").width * 90) / 100;

// create a component
class RestaurantItem extends Component {
  render() {
    let {
      restaurantName,
      restaurantRating,
      restaurantPicturePath
    } = this.props.item;

    return (
      <View style={styles.container}>
        <Card style={styles.card} elevation={10}>
          <TouchableOpacity onPress={() => this.props.onPress(this.props.item)}>
            <ImageBackground
              source={{ uri: restaurantPicturePath }}
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
    width: deviceWidth,
    height: 200,
    margin: 10
  },
  restaurantItemBackground: {
    resizeMode: "cover",
    opacity: 0.4,
    borderRadius: 3
  },
  restaurantBackground: {
    width: "100%",
    height: "100%",
  },
  restaurantLabel: {
    fontSize: 18,
    opacity: 1
  }
});

//make this component available to the app
export default RestaurantItem;
