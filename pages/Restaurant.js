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
    });
  };

  componentWillUnmount = () => {
    this.focusListener.remove();
  };

  componentDidMount() {
    this.props.loadReviews(this.props.restaurantId);
  }

  render() {
    const { reviews, restaurant } = this.props;
    return (
      <View>
        {restaurant.isLoading || reviews.isLoading ? (
          // <Text>Loading...</Text>
          <View
            style={{
              justifyContent: "center",
              paddingTop: (height * 45) / 100
            }}
          >
            <ActivityIndicator animating={true} size="large" color="#FF8C00" />
          </View>
        ) : (
          <ScrollView>
            <View style={styles.container}>
              <BackHeader
                titleText={restaurant.data[0].restaurantName}
                onPress={() => Actions.pop()}
              />
              <RestaurantDetail restaurant={restaurant.data[0]} />
              <RestaurantMap restaurant={restaurant.data[0]} />
              <RestaurantNavigate
                restaurantId={restaurant.data[0].restaurantId}
                restaurantPicture={restaurant.data[0].restaurantPicturePath}
                restaurantLat={restaurant.data[0].restaurantLat}
                restaurantLong={restaurant.data[0].restaurantLong}
              />
              <ReviewItem reviews={reviews} />
            </View>
          </ScrollView>
        )}
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
