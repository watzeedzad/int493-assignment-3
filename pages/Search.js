//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import { SearchBar } from "react-native-elements";
import { Actions } from "react-native-router-flux";
import BackHeader from "../components/Utils/BackHeader";

// create a component
class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: ""
    };
  }

  updateSearch = search => {
    this.setState({ search });
  };

  render() {
    const { search } = this.state;
    // console.log(this.props)

    return (
      <View style={styles.container}>
        <BackHeader
          titleText={"Search"}
          onPress={() => {
            Actions.pop();
          }}
        />
        <SearchBar
          placeholder="Type Here..."
          onChangeText={this.updateSearch}
          value={search}
        />
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight
  }
});

//make this component available to the app
export default Search;
