//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, Image, Button, ScrollView } from "react-native";
import RestaurantMap from "../components/Restaurant/RestaurantMap";
import { Actions } from "react-native-router-flux";
import BackHeader from "../components/Utils/BackHeader";

// create a component
class RestaurantDetail extends Component {
  render() {
    const {
      restaurantAddress, restaurantCloseTime, restaurantDesc, restaurantId, restaurantName,
      restaurantOpendate, restaurantOpenTime, restaurantPicturePath, restaurantRating,
      restaurantTypeDesc
    } = this.props.restaurant
    
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
        <BackHeader
          titleText={"Restaurant Detail"}
          onPress={() => Actions.pop()}
        />
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={{ uri: restaurantPicturePath }}
          />
          <View style={styles.row}>
            <Text style={styles.detail}>Name: </Text>
            <Text style={styles.description}>{restaurantName} </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.detail}>Type: </Text>
            <Text style={styles.description}>{restaurantTypeDesc} </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.detail}>Opening time: </Text>
            <Text style={styles.description}>{restaurantOpendate}, {restaurantOpenTime} -  {restaurantCloseTime}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.detail}>Description: </Text>
            <Text style={styles.description}>{restaurantDesc} </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.detail}>Address: </Text>
            <Text style={styles.description}>{restaurantAddress} </Text>
          </View>
        </View>
        <View style={styles.map}>
          <RestaurantMap restaurant={this.props.restaurant} />
        </View>
        <View style={styles.button}>
          <Button
            title="Edit Restaurant"
            onPress={() => {
              Actions.AddRestaurant({
                restaurant: this.props.restaurant
              })
            }}
            color={"#FF8C00"}
          />
        </View>
        </ScrollView>
      </View>

    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 3,
    padding: 20,
    backgroundColor: "#ffffff",
  },
  row: {
    flexDirection: 'row',
    flexWrap: "wrap"
  },
  map: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  image: {
    height: 200
  },
  button: {
    flex: 1, 
    backgroundColor: "#ffffff",
    padding: 20
  },
  detail: {
    margin: 5,
    fontSize: 18,
    color: 'orange',
    textAlign: 'left',
  },
  description: {
    margin: 5,
    fontSize: 18,
  }
});

//make this component available to the app
export default RestaurantDetail;
