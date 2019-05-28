//import liraries
import React, { Component } from "react";
import { View, Button, StyleSheet, ScrollView, Dimensions } from "react-native";
import t from "tcomb-form-native";
import { connect } from "react-redux";
import * as actions from "../redux/actions";
import { ImagePicker } from 'expo';
import { Avatar } from "react-native-elements";
import BackHeader from "../components/Utils/BackHeader";
import { Actions } from "react-native-router-flux";

const Form = t.form.Form;

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
      this.setState({ value: this.props.user })
    }
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      this.setState({ value: { ...this.state.value, userPicturePath: result.uri } });
    }
  };

  _register = () => {
    const item = this.refs.form.getValue();
    if (item == null) {
      alert('Please enter your information.')
    } else {
      this.props.register(this.state.value.userPicturePath, item)
    }
  }

  _editUser = () => {
    const item = this.refs.form.getValue();
    if (item == null) {
      alert('Please enter your information.')
    } else {
      this.props.editUser(this.state.value.userPicturePath, item)
    }
  }

  renderHeader = () => {
    if (this.props.user) {
      return (<BackHeader titleText={"Edit Profile"} onPress={() => Actions.pop()} />)
    } else {
      return (<BackHeader titleText={"Register"} onPress={() => Actions.pop()} />)
    }
  }

  renderButton = () => {
    if (this.props.user) {
      return (<Button color={"#FF8C00"} title="Edit Profile" onPress={() => this._editUser()} />)
    } else {
      return (<Button color={"#FF8C00"} title="Register" onPress={() => this._register()} />)
    }
  }

  render() {

    const UserForm = t.struct({
      username: this.props.user ? t.maybe(t.String) : t.String,
      password: this.props.user ? t.maybe(t.String) : t.String,
      email: t.String,
      firstname: t.String,
      lastname: t.String,
      tel: t.String
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
          error: "E-mail can not empty."
        },
        firstname: {
          error: "Firstname can not empty."
        },
        lastname: {
          error: "Lastname can not empty."
        }
      },
      stylesheet: formStyles
    };

    return (
      <View stlye={{ flex: 1 }}>
        <ScrollView>
          {this.renderHeader()}
          <View style={styles.container}>

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
                onChange={(value) => this.setState({ value })}
                value={this.state.value}
              />
            </View>
            <View style={styles.button}>
              {this.renderButton()}
            </View>

          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#ffffff",
    height: Dimensions.get("window").height
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
    width: 250
  },
});

function mapStateToProps(state) {
  return {
    register: state.userReducers.register,
    editUser: state.userReducers.editUser
  };
}

export default connect(mapStateToProps, actions)(EditUser);
