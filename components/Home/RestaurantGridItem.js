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
import { Rating } from "react-native-ratings";

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
      restaurantPicturePath,
      restaurantTypeDesc,
      restaurantRating,
      restaurantId
    } = this.props.item;

    let extraMargin = {};
    if (this.props.renderItemIndex == 0 || this.props.renderItemIndex == 1) {
      extraMargin = {
        marginTop: 10
      };
    }

    return (
      <View style={[styles.container, extraMargin]}>
        <TouchableOpacity onPress={() => this.props.onPress(restaurantId)}>
          <ImageBackground
            source={{ uri: restaurantPicturePath }}
            imageStyle={styles.restaurantItemBackground}
            style={styles.restaurantBackground}
          >
            <View
              style={{
                width: (width * 47) / 100,
                backgroundColor: "white",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: 3,
                paddingBottom: 3,
                borderBottomLeftRadius: 3,
                borderBottomRightRadius: 3
              }}
            >
              <Rating
                type="star"
                imageSize={15}
                startingValue={restaurantRating}
                readonly={true}
                fractions={1}
              />
              <Text style={styles.restaurantLabel}>{restaurantName}</Text>
              <Text style={styles.restaurantLabel}>{restaurantTypeDesc}</Text>
            </View>
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
    backgroundColor: "#A9A9A9",
    borderRadius: 3
  },
  restaurantLabel: {
    fontSize: 14
  }
});

//make this component available to the app
export default RestaurantGridItem;
