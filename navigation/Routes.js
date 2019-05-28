//import liraries
import React, { Component } from "react";
import { Image, View, Dimensions } from "react-native";
import { Router, Scene } from "react-native-router-flux";
import LoginPage from "../pages/Login";
import EditUserPage from "../pages/EditUser";
import HomePage from "../pages/Home";
import RestaurantPage from "../pages/Restaurant";
import RestaurantDetailPage from "../pages/RestaurantDetail";
import AddRestaurantPage from "../pages/AddRestaurant";
import ReviewDetailPage from "../pages/ReviewDetail";
import SearchPage from "../pages/Search";
import UserProfilePage from "../pages/UserProfile";
import AddReviewPage from "../pages/AddReview";
import UserManagement from '../pages/UserManagement'

const { width, height } = Dimensions.get("window");

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
              icon={HomeIcon}
            />
            <Scene
              key="UserManagement"
              component={UserManagement}
              title={"User Management"}
              hideNavBar
              icon={UserProfileIcon}
            />
          </Scene>
          <Scene key="Login" component={LoginPage} />
          <Scene key="EditUser" component={EditUserPage} />
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

function HomeIcon({ focused }) {
  return (
    <View>
      <Image
        source={require("../assets/utils/home_bottom_icon.png")}
        style={{
          width: (width * 6) / 100,
          height: (width * 6) / 100
        }}
        tintColor={focused ? "#1e90ff" : "#D3D3D3"}
      />
    </View>
  );
}

function UserProfileIcon({ focused }) {
  return (
    <View>
      <Image
        source={require("../assets/utils/user_bottom_icon.png")}
        style={{
          width: (width * 6) / 100,
          height: (width * 6) / 100
        }}
        tintColor={focused ? "#1e90ff" : "#D3D3D3"}
      />
    </View>
  );
}

console.disableYellowBox = true ; // disable Yellow Warning

//make this component available to the app
export default Routes;
