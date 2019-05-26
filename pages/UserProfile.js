//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { AsyncStorage } from "react-native";
import { Avatar } from "react-native-elements";
import jwt_decode from 'jwt-decode'
// create a component
class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: null
    };
  }

  componentDidMount = () => {
    this.loadUserInfo()
  }

  loadUserInfo = async () => {
    let user = await AsyncStorage.getItem("token")
    let decoded = jwt_decode(user)
    this.setState({ token: decoded })
    console.log(this.state.token)
  }
  render() {
    return (
      <View style={styles.container}>
        { this.state.token &&
          <Avatar
            source={{ uri: this.state.token.userPicturePath }}
            size="xlarge"
            rounded
            title="PIC"
            activeOpacity={0.7}
            showEditButton={true}
          />
        }
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
