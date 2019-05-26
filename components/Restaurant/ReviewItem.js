//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions
} from "react-native";
import moment from "moment";
import { Card } from "react-native-paper";
import { Rating } from "react-native-ratings";

const { width, height } = Dimensions.get("window");

// create a component
class ReviewItem extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  renderItem = ({ item }) => {
    return (
      <Card style={styles.card} elevation={10}>
        <Rating
          type="star"
          imageSize={15}
          startingValue={item.reviewRate}
          readonly={true}
          fractions={1}
          style={{
            flex: 0,
            flexDirection: "row",
            justifyContent: "flex-start",
            paddingBottom: 5
          }}
        />
        <Text>
          Review Date : {moment(item.reviewDate).format("YYYY-MM-DD h:mm:ss a")}
        </Text>
        <Text>Description : {item.reviewDesc}</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center"
          }}
        >
          {item.reviewPicturePath.map((e, index) => {
            if (index <= 1) {
              console.log(index);
              return (
                <Image
                  key={index}
                  style={{
                    width: (width * 36) / 100,
                    height: (height * 14) / 100,
                    margin: 7
                  }}
                  source={{ uri: e }}
                />
              );
            }
          })}
        </View>
      </Card>
    );
  };

  render() {
    let { reviews } = this.props;

    console.log(reviews);

    if (reviews.isRejected) {
      return (
        <View>
          <Text>Error:{reviews.data}</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
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
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#FFFFFF",
    marginTop: 10,
    width: width
    // padding: 10
  },
  card: {
    width: (width * 85) / 100,
    height: (height * 33) / 100,
    margin: 10,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10
    // backgroundColor: "#DCDCDC"
    // alignItems: "flex-start"
  }
});

//make this component available to the app
export default ReviewItem;
