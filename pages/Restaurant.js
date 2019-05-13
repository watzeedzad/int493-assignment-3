import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, Image } from "react-native";
import { connect } from "react-redux";
import * as actions from "../redux/actions";
import { Card } from "react-native-paper";
import Header from "../components/Utils/Header";
import { Actions } from "react-native-router-flux";
import moment from 'moment';

class Restaurant extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.props.loadReviews(this.props.restaurant.restaurantId);
  }

  renderItem = ({ item }) => {
    return (
      <Card style={styles.card} elevation={3}>
        <Text style={{alignSelf:'center'}}>รีวิว</Text>
        <Text>วันที่ : {moment(item.reviewDate).format("YYYY-MM-DD h:mm:ss a")}</Text>
        <Text>ดาว : {item.reviewRate}</Text>
        <Text>รีวิว : {item.reviewDesc}</Text>
        <View style={{flexDirection:'row'}}>
        {item.reviewPicturePath.map(e => {
          return (
            <Image
              style={{ width: 150, height: 80, margin: 5 }}
              source={{ uri: e }}
            />
          )
        })}
        </View>

      </Card>
    );
  };

  render() {
    const { reviews } = this.props;
    console.log(reviews)
    if (reviews.isRejected) {
      return <View>
        <Header titleText={"Restaurant"} onPress={() => { Actions.Search() }} />
        <Text>Error:{reviews.data}</Text>
      </View>
    }

    return (
      <View style={styles.container}>
        <Header
          titleText={"Restaurant"}
          onPress={() => {
            Actions.Search();
          }}
        />
        <View>
          {reviews.isLoading ? (
            <Text>Loading...</Text>
          ) : (
              <FlatList
                data={reviews.data}
                renderItem={this.renderItem}
                keyExtractor={item => item._id.toString()}
              />
            )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center"
  },
  card: {
    width: 350,
    height: 200,
    margin: 10,
    padding: 10,
    alignItems: "flex-start"
  }
});


function mapStateToProps(state) {
  return {
    reviews: state.reviewReducers.reviews,
  };
}

export default connect(mapStateToProps, actions)(Restaurant);
