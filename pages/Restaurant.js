import React, { Component } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { connect } from "react-redux";
import * as actions from "../redux/actions";
import { Actions } from "react-native-router-flux";
import BackHeader from "../components/Utils/BackHeader";
import RestaurantDetail from "../components/Restaurant/RestaurantDetail";
import RestaurantMap from "../components/Restaurant/RestaurantMap";
import RestaurantNavigate from "../components/Restaurant/RestaurantNavigate";
import ReviewItem from "../components/Restaurant/ReviewItem";

class Restaurant extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.props.loadReviews(this.props.restaurant.restaurantId);
  }

  render() {
    const { reviews, restaurant } = this.props;

    return (
      <ScrollView>
        <View style={styles.container}>
          <BackHeader
            titleText={restaurant.restaurantName}
            onPress={() => Actions.pop()}
          />
          <RestaurantDetail restaurant={restaurant} />
          <RestaurantMap restaurant={restaurant} />
          <RestaurantNavigate
            restaurantId={restaurant.restaurantId}
            restaurantPicture={restaurant.restaurantPicturePath}
            restaurantLat={restaurant.restaurantLat}
            restaurantLong={restaurant.restaurantLong}
          />
          <ReviewItem reviews={this.props.reviews} />
        </View>
      </ScrollView>
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
    reviews: state.reviewReducers.reviews
  };
}

export default connect(
  mapStateToProps,
  actions
)(Restaurant);
