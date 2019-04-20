//import liraries
import React, { Component } from "react";
import { Router, Scene } from "react-native-router-flux";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Restaurant";
import EditUserPage from "../pages/EditUser";
import HomePage from "../pages/Home";
import RestaurantPage from "../pages/Restaurant";
import RestaurantDetailPage from "../pages/RestaurantDetail";
import AddRestaurantPage from "../pages/AddRestaurant";
import ReviewDetailPage from "../pages/ReviewDetail";
import SearchPage from "../pages/Search";
import UserProfilePage from "../pages/UserProfile";

// create a component
class Routes extends Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="Login" component={LoginPage} />
          <Scene key="Register" component={RegisterPage} />
          <Scene key="EditUser" component={EditUserPage} />
          <Scene key="Home" component={HomePage} initial />
          <Scene key="Restaurant" component={RestaurantPage} />
          <Scene key="RestaurantDetail" component={RestaurantDetailPage} />
          <Scene key="AddRestaurant" component={AddRestaurantPage} />
          <Scene key="ReviewDetail" component={ReviewDetailPage} />
          <Scene key="AddReview" component={AddReviewPage} />
          <Scene key="Search" component={SearchPage} />
          <Scene key="UserProfile" component={UserProfilePage} />
        </Scene>
      </Router>
    );
  }
}

//make this component available to the app
export default Routes;
