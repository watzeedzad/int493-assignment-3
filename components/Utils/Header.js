//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  TouchableOpacity
} from "react-native";
import { Font, AppLoading } from "expo";
import { Actions } from "react-native-router-flux";

// create a component
class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.subContainerLeft}>
          <Text style={styles.titleText}> {this.props.titleText} </Text>
        </View>
        <View style={styles.subContainerRight}>
          <TouchableOpacity onPress={this.props.onPress}>
            <Image
              style={styles.searchIcon}
              source={require("../../assets/utils/search_icon.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: "row",
    backgroundColor: "#FF8C00",
    marginTop: StatusBar.currentHeight
  },
  subContainerLeft: {
    flex: 0.5,
    flexDirection: "row"
  },
  subContainerRight: {
    flex: 0.5,
    flexDirection: "row-reverse"
  },
  titleText: {
    // fontFamily: 'kanit-light',
    fontSize: 18,
    color: "#FFFFFF",
    margin: 15
  },
  searchIcon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
    margin: 15,
    tintColor: "white"
  }
});

//make this component available to the app
export default Header;
