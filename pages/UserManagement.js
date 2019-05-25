import React, { Component } from "react";
import { FlatList, View, StyleSheet, AsyncStorage } from "react-native";
import UserMenuItem from "../components/User/UserMenuItem";
import Header from "../components/Utils/Header";
import { Actions } from "react-native-router-flux";
import jwtDecode from "jwt-decode";
import { connect } from "react-redux";
import * as actions from "../redux/actions";

export class UserManagement extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menuItem: [],
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

  logout = async () => {
    await AsyncStorage.removeItem("token").then(() => {
      Actions.Home();
      alert("Logout Successful");
    });
  };

  checkLoggedIn = async () => {
    await AsyncStorage.getItem("token").then(token => {
      if (token == null) {
        this.setState({
          menuItem: [
            {
              id: 0,
              iconImage: require("../assets/utils/Login_icon.png"),
              text: "Login",
              onPress: () => Actions.Login()
            },
            {
              id: 1,
              iconImage: require("../assets/utils/Register_icon.png"),
              text: "Register",
              onPress: () => Actions.EditUser()
            }
          ]
        });
      } else {
        this.setState({
          token: jwtDecode(token),
          menuItem: [
            {
              id: 0,
              iconImage: require("../assets/utils/User_icon.png"),
              text: "User Profile",
              onPress: () => Actions.UserProfile()
            },
            {
              id: 1,
              iconImage: require("../assets/utils/Edit_icon.png"),
              text: "Edit User",
              onPress: () => Actions.EditUser()
            },
            {
              id: 2,
              iconImage: require("../assets/utils/Logout_icon.png"),
              text: "Logout",
              onPress: () => this.logout()
            }
          ]
        });
      }
    });
  };

  renderItem = ({ item }) => {
    return (
      <View style={{ marginTop: 15 }}>
        <UserMenuItem
          iconImage={item.iconImage}
          text={item.text}
          onPress={item.onPress}
        />
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Header titleText={"User Management"} />
        <View>
          <FlatList
            data={this.state.menuItem}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#E8E8E8"
  }
});

export default connect(
  null,
  actions
)(UserManagement);
