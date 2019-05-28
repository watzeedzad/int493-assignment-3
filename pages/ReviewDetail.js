//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Image
} from "react-native";
import BackHeader from "../components/Utils/BackHeader";
import { Actions } from "react-native-router-flux";
import moment from "moment";
import { Rating } from "react-native-ratings";

const { width, height } = Dimensions.get("screen");

// create a component
class ReviewDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  renderItem = ({ item, index }) => {
    return (
      <Image
        key={index}
        style={{
          width: (width * 45) / 100,
          height: (width * 30) / 100,
          margin: 5
        }}
        source={{ uri: item }}
      />
    );
  };

  render() {
    let { review } = this.props;

    console.log(review);

    return (
      <View style={styles.container}>
        <BackHeader titleText={"Review Detail"} onPress={() => Actions.pop()} />
        <View style={{ padding: 10, backgroundColor: "white", width: width }}>
          <View style={{ flex: 0, flexDirection: "row" }}>
            <Image
              source={{ uri: review.userPicturePath[0] }}
              style={{
                borderRadius: 150 / 2,
                width: (width * 15) / 100,
                height: (width * 15) / 100
              }}
            />
            <View style={{ flex: 0, flexDirection: "column", paddingLeft: 10 }}>
              <Text>
                {review.firstname[0]} {review.lastname[0]}
              </Text>
              <Text>
                {moment(review.reviewDate).format("YYYY-MM-DD h:mm:ss a")}
              </Text>
              <Rating
                type="star"
                imageSize={15}
                startingValue={review.reviewRate}
                readonly={true}
                fractions={1}
                style={{
                  paddingTop: 3,
                  flex: 0,
                  flexDirection: "row",
                  justifyContent: "flex-start"
                }}
              />
            </View>
          </View>
          <View style={{ paddingTop: 10 }}>
            <Text>{review.reviewDesc}</Text>
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <FlatList
              data={review.reviewPicturePath}
              renderItem={this.renderItem}
              keyExtractor={() => new Date().toDateString()}
              numColumns={2}
            />
          </View>
        </View>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width
  }
});

//make this component available to the app
export default ReviewDetail;
