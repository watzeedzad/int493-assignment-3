//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import jwtDecode from "jwt-decode";
import LocalStorage from "../Utils/localStorage";
import { Actions } from "react-native-router-flux";

// create a component
class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: null
    };
  }

  componentWillMount = () => {
    this.focusListener = this.props.navigation.addListener("didFocus", () => {
      this.checkLoggedIn();
    });
  };

  componentWillUnmount = () => {
    this.focusListener.remove();
  };

  checkLoggedIn = async () => {
    let token = await LocalStorage.loadStringData("token").then(() => {
      alert("Must Login First!");
      if (token == null) {
        Actions.Login();
        return;
      } else {
        this.setState({
          token: jwtDecode(token)
        });
      }
    });
  };

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
