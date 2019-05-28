//import liraries
import React, { Component } from "react";
import { View, Button, StyleSheet, ScrollView, Dimensions } from "react-native";
import t from "tcomb-form-native";
import { connect } from "react-redux";
import * as actions from "../redux/actions";
import { ImagePicker } from "expo";
import { Avatar } from "react-native-elements";
import BackHeader from "../components/Utils/BackHeader";
import { Actions } from "react-native-router-flux";

const Form = t.form.Form;
const { width, height } = Dimensions.get("screen");

const Email = t.refinement(t.String, email => {
  const reg = /[a-z0-9!#$%&'+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'+/=?^_`{|}~-]+)@(?:[a-z0-9](?:[a-z0-9-][a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  return reg.test(email);
});

const Tel = t.refinement(t.String, tel => {
  const reg = /[0-9]{10}?/;
  return reg.test(tel);
});

const formStyles = {
  ...Form.stylesheet, // copy over all of the default styles
  formGroup: {
    normal: {
      marginBottom: 10,
      width: (width * 70) / 100
    },
    error: {
      marginBottom: 10,
      width: (width * 70) / 100
    }
  },
  textbox: {
    normal: {
      fontSize: 18,
      height: 36,
      padding: 7,
      borderRadius: 4,
      borderWidth: 1,
      marginBottom: 5
    },
    error: {
      fontSize: 18,
      height: 36,
      padding: 7,
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

class EditUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: {
        username: "",
        password: "",
        email: "",
        firstname: "",
        lastname: "",
        tel: "",
        userPicturePath: null
      }
    };
  }

  componentDidMount = () => {
    if (this.props.user) {
      this.setState({ value: this.props.user });
    }
  };

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });

    if (!result.cancelled) {
      this.setState({
        value: { ...this.state.value, userPicturePath: result.uri }
      });
    }
  };

  _register = () => {
    const item = this.refs.form.getValue();
    if (item == null) {
      alert("Please enter your information.");
    } else {
      this.props.register(this.state.value.userPicturePath, item);
    }
  };

  _editUser = () => {
    const item = this.refs.form.getValue();
    if (item == null) {
      alert("Please enter your information.");
    } else {
      this.props.editUser(this.state.value.userPicturePath, item);
    }
  };

  renderHeader = () => {
    if (this.props.user) {
      return (
        <BackHeader titleText={"Edit Profile"} onPress={() => Actions.pop()} />
      );
    } else {
      return (
        <BackHeader titleText={"Register"} onPress={() => Actions.pop()} />
      );
    }
  };

  renderButton = () => {
    if (this.props.user) {
      return (
        <Button
          color={"#FF8C00"}
          title="Edit Profile"
          onPress={() => this._editUser()}
        />
      );
    } else {
      return (
        <Button
          color={"#FF8C00"}
          title="Register"
          onPress={() => this._register()}
        />
      );
    }
  };

  render() {
    const UserForm = t.struct({
      username: this.props.user ? t.maybe(t.String) : t.String,
      password: this.props.user ? t.maybe(t.String) : t.String,
      email: Email,
      firstname: t.String,
      lastname: t.String,
      tel: Tel
    });

    const options = {
      fields: {
        password: {
          password: true,
          secureTextEntry: true,
          error: "Password can not empty.",
          hidden: this.props.user ? true : false
        },
        username: {
          error: "Username can not empty.",
          hidden: this.props.user ? true : false
        },
        email: {
          error: "Email is invalid. (ex. test01@email.com)"
        },
        firstname: {
          error: "Firstname can not empty."
        },
        lastname: {
          error: "Lastname can not empty."
        },
        tel: {
          error: "Tel is invalid. (ex. 012-3456789)"
        }
      },
      stylesheet: formStyles
    };

    return (
      <View style={styles.container}>
        {this.renderHeader()}
        <ScrollView
          style={{
            width: Dimensions.get("window").width
          }}
        >
          {this.props.register.data
            ? this.props.register.data.errorMessage
            : null}
          <View style={styles.field}>
            <Avatar
              source={{ uri: this.state.value.userPicturePath }}
              size="xlarge"
              rounded
              title="PIC"
              onPress={() => this._pickImage()}
              activeOpacity={0.7}
              showEditButton={true}
            />
            <Form
              ref="form"
              type={UserForm}
              options={options}
              onChange={value => this.setState({ value })}
              value={this.state.value}
            />
          </View>
          <View style={styles.button}>{this.renderButton()}</View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#ffffff"
  },
  field: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff"
  },
  button: {
    marginTop: 15,
    backgroundColor: "#ffffff",
    width: (width * 70) / 100,
    marginLeft: (width * 15) / 100,
    marginRight: (width * 15) / 100
  }
});

function mapStateToProps(state) {
  return {
    register: state.userReducers.register,
    editUser: state.userReducers.editUser
  };
}

export default connect(
  mapStateToProps,
  actions
)(EditUser);
