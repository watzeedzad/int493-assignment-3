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
import AddReviewPage from "../pages/AddReview";

// create a component
class Routes extends Component {
  render() {
    return (
      <Router>
        <Scene key="root" hideNavBar hideTabBar>
          <Scene key="TabBar" tabs={true} hideNavBar>
            <Scene
              key="Home"
              component={HomePage}
              title={"Home"}
              initial
              hideNavBar
            />
            <Scene
              key="UserProfile"
              component={UserProfilePage}
              title={"User Profile"}
              hideNavBar
            />
          </Scene>
          <Scene key="Login" component={LoginPage} />
          <Scene key="Register" component={RegisterPage} />
          <Scene key="EditUser" component={EditUserPage} />
          <Scene key="Restaurant" component={RestaurantPage} />
          <Scene key="RestaurantDetail" component={RestaurantDetailPage} />
          <Scene key="AddRestaurant" component={AddRestaurantPage} />
          <Scene key="ReviewDetail" component={ReviewDetailPage} />
          <Scene key="AddReview" component={AddReviewPage} />
          <Scene key="Search" component={SearchPage} />
        </Scene>
      </Router>
    );
  }
}

//make this component available to the app
export default Routes;
