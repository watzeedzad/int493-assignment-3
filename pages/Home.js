import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { connect } from 'react-redux'
import * as actions from '../redux/actions'
class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  componentDidMount() {
    this.props.loadRestaurents()
  }

  renderItem = ({ item }) => {
    return (
      <Text>{item.id}</Text>
    )
  }

  render() {
    const { restaurents } = this.props

    if (restaurents.isRejected) {
      return <Text>Error:{restaurents.data}</Text>
  }

    return (
      <View style={styles.container}>
        {restaurents.isLoading ? <Text>Loading...</Text> :
          <FlatList
            data={restaurents.data}
            renderItem={this.renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50"
  }
});

function mapStateToProps(state) {
  return {
    restaurents: state.restaurentReducers.restaurents,
  }
}

export default connect(mapStateToProps,actions)(Home);
