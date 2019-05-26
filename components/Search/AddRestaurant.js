//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { Actions } from "react-native-router-flux";

const { width, height } = Dimensions.get("window");

// create a component
class AddRestaurant extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  addRestaurant = () => {
    console.log("add restaurant");
  };

  render() {
    return (
      <TouchableOpacity
        onPress={() => this.addRestaurant()}
        style={{ paddingTop: 10 }}
      >
        <View style={styles.container}>
          <Image
            source={require("../../assets/utils/img_27177.png")}
            style={styles.addIcon}
          />
          <Text style={styles.addLabel}>Add New Restaurant</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF8C00",
    width: width,
    height: (height * 10) / 100
  },
  addIcon: {
    resizeMode: "contain",
    width: (width * 10) / 100,
    tintColor: "white"
  },
  addLabel: {
    color: "white",
    fontSize: 18,
    paddingLeft: 10
  }
});

//make this component available to the app
export default AddRestaurant;