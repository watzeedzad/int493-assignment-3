import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { connect } from "react-redux";
import * as actions from "../redux/actions";
import { Card } from "react-native-paper";
import Header from "../components/Utils/Header";
import { Actions } from "react-native-router-flux";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.props.loadRestaurents();
    this.props.loadRestaurentTypes();
  }

  _onPress() {}

  renderNavItem = ({ item }) => {
    return (
      <Card style={{ margin: 5, width: 80, height: 40 }} elevation={3}>
        <TouchableOpacity onPress={() => this._onPress()}>
          <Text>{item.restaurantTypeDesc}</Text>
        </TouchableOpacity>
      </Card>
    );
  };

  renderItem = ({ item }) => {
    return (
      <Card style={styles.card} elevation={3}>
        <TouchableOpacity onPress={() => this._onPress()}>
          <Text>Name : {item.restaurantName}</Text>
          <Text>Rating : {item.restaurantRating}</Text>
          <Text>Type : {item.restaurantTypeDesc}</Text>
        </TouchableOpacity>
      </Card>
    );
  };

  render() {
    const { restaurents, restaurentTypes } = this.props;
    console.log(restaurentTypes);
    if (restaurents.isRejected) {
      return <Text>Error:{restaurents.data}</Text>;
    }
    if (restaurentTypes.isRejected) {
      return <Text>Error:{restaurentTypes.data}</Text>;
    }

    return (
      <View style={styles.container}>
        <Header
          titleText={"Home"}
          onPress={() => {
            Actions.Search();
          }}
        />
        <ScrollView>
          {restaurentTypes.isLoading ? (
            <Text>Loading...</Text>
          ) : (
            <FlatList
              data={restaurentTypes.data}
              renderItem={this.renderNavItem}
              keyExtractor={item => item._id.toString()}
              horizontal={true}
            />
          )}
          {restaurents.isLoading ? (
            <Text>Loading...</Text>
          ) : (
            <FlatList
              data={restaurents.data}
              renderItem={this.renderItem}
              keyExtractor={item => item._id.toString()}
            />
          )}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
    // backgroundColor: "#2c3e50"
  },
  card: {
    width: 350,
    height: 200,
    margin: 10,
    alignItems: "center"
  }
});

function mapStateToProps(state) {
  return {
    restaurents: state.restaurentReducers.restaurents,
    restaurentTypes: state.restaurentReducers.restaurentTypes
  };
}

export default connect(
  mapStateToProps,
  actions
)(Home);
