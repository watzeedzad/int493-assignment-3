//import liraries
import React, { Component } from "react";
import {
  View,
  Button,
  StyleSheet,
  Image,
  Dimensions,
  AsyncStorage
} from "react-native";
import t from "tcomb-form-native";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import * as actions from "../redux/actions";

const { width, height } = Dimensions.get("window");
const Form = t.form.Form;

const LoginForm = t.struct({
  username: t.String,
  password: t.String
});

const formStyles = {
  ...Form.stylesheet, // copy over all of the default styles
  formGroup: {
    normal: {
      marginBottom: 10,
      width: 250
      // formColor: "#696969"
    },
    error: {
      marginBottom: 10,
      width: 250
      // formColor: "red"
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
      // backgroundColor: "#A9A9A9"
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
      // color: "#A9A9A9",
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
    }
  },
  stylesheet: formStyles
};

// create a component
class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: {
        username: "",
        password: ""
      }
    };
  }

  login = () => {
    const data = this.refs.form.getValue();
    if (data) {
      this.props.login(data);
      this.state.value.username = data.username;
      this.state.value.password = data.password;
    }
  };

  render() {
    let { loginData } = this.props;

    if (loginData.isRejected) {
      alert(loginData.data.message);
    }

    return (
      <View style={styles.container}>
        <View style={styles.Field}>
          {this.props.login.isRejected && (
            <Text style={{ color: "white", backgroundColor: "red" }}>
              {this.props.login.data}
            </Text>
          )}
          <Image
            source={require("../assets/utils/logo-kmutt.png")}
            style={{ height: (height * 30) / 100, resizeMode: "contain" }}
          />
          <Form
            ref="form"
            type={LoginForm}
            options={options}
            value={this.state.value}
          />
        </View>
        <View style={styles.button}>
          <Button
            title="Login"
            onPress={() => this.login()}
            color={"#FF8C00"}
          />
        </View>
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
    backgroundColor: "#ffffff"
  },
  Field: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff"
  },
  button: {
    backgroundColor: "#ffffff",
    width: 250,
  },
});

function mapStateToProps(state) {
  const { userReducers } = state;
  return {
    loginData: userReducers.login
  };
}

export default connect(
  mapStateToProps,
  actions
)(Login);
