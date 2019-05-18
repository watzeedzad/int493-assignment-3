//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Button
} from "react-native";
import { Popup } from "react-native-map-link";

const { width, height } = Dimensions.get("window");

// create a component
class RestaurantNavigateButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isVisible: false
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Popup
          isVisible={this.state.isVisible}
          onCancelPressed={() => this.setState({ isVisible: false })}
          onAppPressed={() => this.setState({ isVisible: false })}
          onBackButtonPressed={() => this.setState({ isVisible: false })}
          modalProps={{
            animationIn: "slideInUp"
          }}
          appsWhiteList={[]}
          options={{
            latitude: this.props.restaurantLat,
            longitude: this.props.restaurantLong
          }}
        />
        <TouchableOpacity>
          <View style={{ flexDirection: "row" }}>
            <View style={[styles.button, { paddingLeft: 20 }]}>
              <Button
                title="Add Review"
                onPress={() => {
                  console.log("click add review");
                }}
                color={"#FF8C00"}
              />
            </View>
            <View style={[styles.button, { paddingRight: 20 }]}>
              <Button
                title="Navigate"
                onPress={() => {
                  this.setState({ isVisible: true });
                }}
                color={"#FF8C00"}
              />
            </View>
          </View>
        </TouchableOpacity>
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
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
    width: width
  },
  button: {
    padding: 5
  }
});

//make this component available to the app
export default RestaurantNavigateButton;
