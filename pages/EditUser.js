//import liraries
import React, { Component } from "react";
import { View, Button, StyleSheet, ScrollView } from "react-native";
import t from "tcomb-form-native";
import { connect } from "react-redux";
import * as actions from "../redux/actions";
import { ImagePicker } from 'expo';
import { Avatar } from "react-native-elements";

const Form = t.form.Form;

const UserForm = t.struct({
  username: t.String,
  password: t.String,
  email: t.String,
  firstname: t.String,
  lastname: t.String,
  tel: t.String
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

const options = {
  fields: {
    password: {
      password: true,
      secureTextEntry: true,
      error: "Password can not empty."
    },
    username: {
      error: "Username can not empty."
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
        userPicture: null
      }
    };
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      this.setState({ userPicture: result.uri });
    }
  };

  _register = () => {
    const item = this.refs.form.getValue();
    if (item == null) {
      alert('Please enter your information.')
    } else {
      this.props.register(this.state.userPicture, item)
    }
  }

  render() {
    return (
      <View>
        <ScrollView>
          <View style={styles.container}>
            <Avatar
              source={{ uri: this.state.userPicture }}
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
              value={this.state.value}
            />
            <Button style={{ height: 36 }} title="Register" onPress={() => this._register()} />
          </View>
        </ScrollView>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff"
  }
});

function mapStateToProps(state) {
  return {
    register: state.userReducers.register
  };
}

export default connect(mapStateToProps, actions)(EditUser);
