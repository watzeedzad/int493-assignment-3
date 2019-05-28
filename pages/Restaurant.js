import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  ActivityIndicator,
  Dimensions
} from "react-native";
import { connect } from "react-redux";
import * as actions from "../redux/actions";
import { Actions } from "react-native-router-flux";
import BackHeader from "../components/Utils/BackHeader";
import RestaurantDetail from "../components/Restaurant/RestaurantDetail";
import RestaurantMap from "../components/Restaurant/RestaurantMap";
import RestaurantNavigate from "../components/Restaurant/RestaurantNavigate";
import ReviewItem from "../components/Restaurant/ReviewItem";

const { width, height } = Dimensions.get("screen");

class Restaurant extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillMount = () => {
    this.focusListener = this.props.navigation.addListener("didFocus", () => {
      this.props.loadRestaurant(this.props.restaurantId);
      this.props.loadReviews(this.props.restaurantId);
    });
  };

  componentWillUnmount = () => {
    this.focusListener.remove();
  };

  render() {
    const { reviews, restaurant } = this.props;

    if (restaurant.isLoading || reviews.isLoading) {
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
      <View style={styles.container}>
        <BackHeader
          titleText={restaurant.data[0].restaurantName}
          onPress={() => Actions.pop()}
        />
        <ScrollView>
          <RestaurantDetail restaurant={restaurant.data[0]} />
          <RestaurantMap restaurant={restaurant.data[0]} />
          <RestaurantNavigate
            restaurantId={restaurant.data[0].restaurantId}
            restaurantPicture={restaurant.data[0].restaurantPicturePath}
            restaurantLat={restaurant.data[0].restaurantLat}
            restaurantLong={restaurant.data[0].restaurantLong}
          />
          <ReviewItem reviews={reviews} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  }
});

function mapStateToProps(state) {
  return {
    reviews: state.reviewReducers.reviews,
    restaurant: state.restaurantReducers.restaurant
  };
}

export default connect(
  mapStateToProps,
  actions
)(Restaurant);
