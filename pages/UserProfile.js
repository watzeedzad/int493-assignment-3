//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator
} from "react-native";
import { Avatar } from "react-native-elements";
import { Actions } from "react-native-router-flux";
import BackHeader from "../components/Utils/BackHeader";

// create a component
class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null
    };
  }

  componentDidMount = () => {
    this.setState({user: this.props.user})
  }
  
  render() {
    const { user } = this.state

    if (user == null) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <ActivityIndicator animating={true} size="large" color="#FF8C00" />
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <BackHeader
          titleText={"User Profile"}
          onPress={() => Actions.pop()}
        />
        <ScrollView>
          <View style={styles.container}>
            <Avatar
              source={{ uri: user.userPicturePath }}
              size="xlarge"
              rounded
              title="PIC"
              activeOpacity={0.7}
            />
            <View style={{margin:20}}>
              <View style={styles.row}>
                <Text style={styles.detail}>Name: </Text>
                <Text style={styles.description}>{user.firstname} </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.detail}>Lastname: </Text>
                <Text style={styles.description}>{user.lastname} </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.detail}>Username: </Text>
                <Text style={styles.description}>{user.username} </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.detail}>E-mail: </Text>
                <Text style={styles.description}>{user.email} </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  detail: {
    margin: 5,
    fontSize: 18,
    color: "orange",
    textAlign: "left"
  },
  description: {
    margin: 5,
    fontSize: 18
  }
});

//make this component available to the app
export default UserProfile;
