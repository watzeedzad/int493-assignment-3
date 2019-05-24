//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

// create a component
class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: null
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>UserProfile</Text>
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
    backgroundColor: "#ffffff"
  }
});

//make this component available to the app
export default UserProfile;
