//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, StatusBar, FlatList } from "react-native";
import { SearchBar } from "react-native-elements";
import { Actions } from "react-native-router-flux";
import BackHeader from "../components/Utils/BackHeader";
import RestaurantItem from "../components/Search/RestaurantItem";

// create a component
class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
      restaurantData: this.props.restaurantData,
      filterRestaurantData: []
    };
  }

  updateSearch = search => {
    this.setState({ search });
    if (search.length == 0) {
      this.setState({
        filterRestaurantData: []
      });
    } else {
      const restaurantData = this.state.restaurantData;
      const searchRestaurantResult = restaurantData.filter(restaurant => {
        let { restaurantName, restaurantDesc } = restaurant;
        if (
          restaurantName.includes(search) ||
          restaurantDesc.includes(search)
        ) {
          return restaurant;
        }
      });
      this.setState({
        filterRestaurantData: searchRestaurantResult
      });
    }
  };

  _restaurantListRenderItem = ({ item }) => {
    return (
      <RestaurantItem item={item}/>
    );
  };

  _restaurantListKeyExtractor = item => item._id.toString();

  render() {
    const { search } = this.state;
    console.log(this.state.restaurantData);

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
          round={true}
          lightTheme={true}
        />
        <FlatList
          data={this.state.filterRestaurantData}
          renderItem={this._restaurantListRenderItem}
          keyExtractor={this._restaurantListKeyExtractor}
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
