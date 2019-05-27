//import liraries
import React, { Component } from "react";
import { StyleSheet, Dimensions, View, Button, ScrollView, Image } from 'react-native';
import ImageBrowser from '../components/Review/ImageBrowser';
import t from "tcomb-form-native";
import { connect } from "react-redux";
import { Rating } from "react-native-ratings";
import * as actions from "../redux/actions";
import { Avatar } from "react-native-elements";
import { Card } from "react-native-paper";
import BackHeader from "../components/Utils/BackHeader";
import { Actions } from "react-native-router-flux";

const Form = t.form.Form;

const ReviewForm = t.struct({
  reviewDesc: t.String,
});

const formStyles = {
  ...Form.stylesheet, // copy over all of the default styles
  formGroup: {
    normal: {
      marginBottom: 10,
      width: 250
    },
    error: {
      marginBottom: 10,
      width: 250
    }
  },
  textbox: {
    normal: {
      fontSize: 18,
      height: 36,
      padding: 10,
      borderRadius: 4,
      borderWidth: 1,
      marginBottom: 5
    },
    error: {
      fontSize: 18,
      height: 36,
      padding: 10,
      borderRadius: 4,
      borderWidth: 1,
      marginBottom: 5,
      borderColor: "red"
    }
  },
  controlLabel: {
    normal: {
      fontSize: 18,
      marginBottom: 7,
      fontWeight: "600"
    },
    error: {
      color: "red",
      fontSize: 18,
      marginBottom: 7,
      fontWeight: "600"
    }
  }
};

const multilineStyle = {
  ...Form.stylesheet,
  textbox: {
    ...Form.stylesheet.textbox,
    normal: {
      ...Form.stylesheet.textbox.normal,
      height: 100,
      width: 250
    },
    error: {
      ...Form.stylesheet.textbox.error,
      height: 100,
      width: 250
    }
  }
}

const options = {
  fields: {
    reviewDesc: {
      label: "Description",
      error: "Description can not empty.",
      multiline: true,
      stylesheet: multilineStyle,
    },
  },
  stylesheet: formStyles
};

// create a component
class AddReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageBrowserOpen: false,
      photos: [],
      restaurantId: this.props.restaurantId,
      reviewRate: 0,
      reviewDesc: ""
    }
  }
  imageBrowserCallback = (callback) => {
    callback.then((photos) => {
      console.log(photos)
      this.setState({
        imageBrowserOpen: false,
        photos
      })
    }).catch((e) => console.log(e))
  }

  _addReview = () => {
    const { photos, restaurantId, reviewRate } = this.state
    const data = this.refs.form.getValue();
    this.props.addReview(photos, restaurantId, reviewRate, data.reviewDesc)
  }

  renderImage(item, i) {
    return (
      <Image
        style={{ height: 100, width: 100 }}
        source={{ uri: item.file }}
        key={i}
      />
    )
  }

  render() {
    if (this.state.imageBrowserOpen) {
      return (<ImageBrowser max={4} callback={this.imageBrowserCallback} />);
    }
    return (
      <ScrollView>
        <BackHeader
          titleText={"Add Review"}
          onPress={() => Actions.pop()}
        />
        <View style={styles.container}>

          <Avatar
            source={{ uri: this.props.restaurantPicture }}
            size="xlarge"
            title="PIC"
          />

          <Rating
            type="star"
            imageSize={40}
            startingValue={this.state.reviewRate}
            onFinishRating={(reviewRate) => this.setState({ reviewRate })}
            style={{
              paddingTop: 12,
              flex: 0,
              flexDirection: "row",
              justifyContent: "flex-start",
            }}
          />

          <Form
            ref="form"
            type={ReviewForm}
            options={options}
            onChange={(reviewDesc) => this.setState({ reviewDesc: reviewDesc })}
            value={this.state.reviewDesc}
          />
          <Button
            title="Upload Images"
            onPress={() => this.setState({ imageBrowserOpen: true })}
          />
          <Card style={styles.card} elevation={3}>
            <ScrollView horizontal={true}>
              {this.state.photos.map((item, i) => this.renderImage(item, i))}
            </ScrollView>
          </Card>
          <Button
            title="Add Review"
            onPress={() => this._addReview()}
          />
        </View>
      </ScrollView>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: "center",
    backgroundColor: "#ffffff",
    height: Dimensions.get('window').height
  },
  card: {
    width: Dimensions.get('window').width * 0.92,
    margin: 10,
  },
});

function mapStateToProps(state) {
  return {
    addReview: state.reviewReducers.addReview
  };
}

export default connect(mapStateToProps, actions)(AddReview);
