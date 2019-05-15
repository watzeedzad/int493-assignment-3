//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, Image } from "react-native";
import { SearchBar } from "react-native-elements";
import { Actions } from "react-native-router-flux";
import BackHeader from "../components/Utils/BackHeader";
import RestaurantItem from "../components/Search/RestaurantItem";
import { Card } from "react-native-paper";

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

  componentDidMount() {
    this.updateSearch(this.props.search ? this.props.search : "");
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
        let { restaurantName, restaurantDesc, restaurantTypeDesc } = restaurant;
        if (
          restaurantName.includes(search) ||
          restaurantDesc.includes(search) ||
          restaurantTypeDesc.includes(search)
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
      <RestaurantItem item={item} onPress={this.props.onPress} />
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
        <ScrollView>
          <FlatList
            data={this.state.filterRestaurantData}
            renderItem={this._restaurantListRenderItem}
            keyExtractor={this._restaurantListKeyExtractor}
          />
          <Card style={styles.card} elevation={3}>
            <TouchableOpacity>
              <Image
                style={{ width: 150, height: 150, margin:10 }}
                source={{ uri: 'https://www.iconsdb.com/icons/preview/orange/add-xxl.png' }}
              />
            </TouchableOpacity>
          </Card>
        </ScrollView>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    width: 170,
    height: 170,
    margin: 10,
    alignSelf: 'center',
    alignItems: 'center'
  },
});

//make this component available to the app
export default Search;
