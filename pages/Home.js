import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Dimensions
} from "react-native";
import { connect } from "react-redux";
import * as actions from "../redux/actions";
import { Card } from "react-native-paper";
import Header from "../components/Utils/Header";
import { Actions } from "react-native-router-flux";
import RestaurantGridItem from "../components/Home/RestaurantGridItem";

const { width, height } = Dimensions.get("screen");

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.props.loadRestaurants();
    this.props.loadRestaurantTypes();
  }

  componentWillMount = () => {
    this.focusListener = this.props.navigation.addListener("didFocus", () => {
      this.props.loadRestaurants();
    });
  };

  componentWillUnmount = () => {
    this.focusListener.remove();
  };

  onPressRestaurant(restaurantId) {
    Actions.Restaurant({
      restaurantId: restaurantId
    });
  }

  renderNavItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          Actions.Search({
            restaurantData: this.props.restaurants.data,
            onPress: this.onPressRestaurant,
            search: item.restaurantTypeDesc
          });
        }}
      >
        {/* <Card style={styles.navCardItem} elevation={10}>
          <Text style={{ fontSize: 18, opacity: 1 }}>
            {item.restaurantTypeDesc}
          </Text>
        </Card> */}
        <View style={styles.navCardItem}>
          <Text style={{ fontSize: 18, opacity: 1, color: "black" }}>
            {item.restaurantTypeDesc}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  renderItem = ({ item }) => {
    return <RestaurantGridItem item={item} onPress={this.onPressRestaurant} />;
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
              restaurantData: restaurants.data,
              onPress: this.onPressRestaurant
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
              style={{ backgroundColor: "white", width: width }}
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
              numColumns={2}
              style={{ width: width }}
            />
          )}
          {/* <Button title="Login" onPress={() => Actions.Login()}/> */}
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
  },
  navCardItem: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    width: (width * 25) / 100,
    height: (width * 15) / 100,
    // flexWrap: "wrap"
    // borderRadius: 3,
    // borderColor: "white",
    // backgroundColor: "white",
    // borderLeftWidth: 2,
    // borderRightWidth: 2
  }
});

function mapStateToProps(state) {
  return {
    restaurants: state.restaurantReducers.restaurants,
    restaurantTypes: state.restaurantReducers.restaurantTypes
  };
}

export default connect(
  mapStateToProps,
  actions
)(Home);
