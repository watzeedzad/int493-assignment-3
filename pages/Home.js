import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from "react-native";
import { connect } from "react-redux";
import * as actions from "../redux/actions";
import { Card } from "react-native-paper";
import Header from "../components/Utils/Header";
import { Actions } from "react-native-router-flux";
import RestaurantItem from "../components/home/RestaurantItem";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.props.loadRestaurants();
    this.props.loadRestaurantTypes();
  }

  onPressRestaurant(restaurant) {
    Actions.Restaurant({
      restaurant: restaurant,
    });
  }

  renderNavItem = ({ item }) => {
    return (
      <Card style={{ margin: 5, width: 80, height: 40 }} elevation={3}>
        <TouchableOpacity>
          <Text>{item.restaurantTypeDesc}</Text>
        </TouchableOpacity>
      </Card>
    );
  };

  renderItem = ({ item }) => {
    return (
      <RestaurantItem item={item} onPress={this.onPressRestaurant} />
    );
  };

  render() {
    const { restaurants, restaurantTypes } = this.props;

    if (restaurants.isRejected) {
      return <Text>Error:{restaurants.data}</Text>;
    }
    if (restaurantTypes.isRejected) {
      return <Text>Error:{restaurantTypes.data}</Text>;
    }

    return (
      <View style={styles.container}>
        <Header
          titleText={"Home"}
          onPress={() => {
            Actions.Search({
              restaurantData: restaurents.data
            });
          }}
        />
        <ScrollView>
          {restaurantTypes.isLoading ? (
            <Text>Loading...</Text>
          ) : (
              <FlatList
                data={restaurantTypes.data}
                renderItem={this.renderNavItem}
                keyExtractor={item => item._id.toString()}
                horizontal={true}
              />
            )}
          {restaurants.isLoading ? (
            <Text>Loading...</Text>
          ) : (
              <FlatList
                data={restaurants.data}
                renderItem={this.renderItem}
                keyExtractor={item => item._id.toString()}
              />
            )}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
    // backgroundColor: "#2c3e50"
  },
  card: {
    width: 350,
    height: 200,
    margin: 10,
    alignItems: "center"
  }
});

function mapStateToProps(state) {
  return {
    restaurants: state.restaurantReducers.restaurants,
    restaurantTypes: state.restaurantReducers.restaurantTypes
  };
}

export default connect(mapStateToProps,actions)(Home);
