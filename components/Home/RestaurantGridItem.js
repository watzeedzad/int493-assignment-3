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

const { width, height } = Dimensions.get("screen");

// create a component
class RestaurantGridItem extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let {
      restaurantName,
      restaurantRating,
      restaurantPicturePath,
      restaurantId
    } = this.props.item;

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.props.onPress(restaurantId)}>
          <ImageBackground
            source={{ uri: restaurantPicturePath }}
            imageStyle={styles.restaurantItemBackground}
            style={styles.restaurantBackground}
          >
            <Text style={styles.restaurantLabel}>{restaurantName}</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 5
  },
  restaurantItemBackground: {
    resizeMode: "cover",
    opacity: 0.6,
    borderRadius: 3
  },
  restaurantBackground: {
    width: (width * 47) / 100,
    height: (width * 47) / 100,
    justifyContent: "center",
    alignItems: "flex-end",
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 3
  },
  restaurantLabel: {
    fontSize: 18
  }
});

//make this component available to the app
export default RestaurantGridItem;
