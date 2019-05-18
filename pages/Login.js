//import liraries
import React, { Component } from "react";
import { View, Button, StyleSheet } from "react-native";
import t from 'tcomb-form-native';
import { connect } from "react-redux";
import * as actions from "../redux/actions";

const Form = t.form.Form;

const LoginForm = t.struct({
  username: t.String,
  password: t.String,
});

const formStyles = {
  ...Form.stylesheet, // copy over all of the default styles
  formGroup: {
    normal: {
      marginBottom: 10,
      width: 250,
      formColor: '#FFFFFF'
    },
  },
  textbox: {
    normal: {
      fontSize: 18,
      height: 36,
      padding: 7,
      borderRadius: 4,
      borderWidth: 1,
      marginBottom: 5,
      backgroundColor: '#FFFFFF'
    }
  },
  controlLabel: {
    normal: {
      color: '#FFFFFF',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600'
    },
    error: {
      color: 'red',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600'
    }
  }
}

const options = {
  fields: {
    password: {
      password: true,
      secureTextEntry: true,
    },
  },
  stylesheet: formStyles,
}

// create a component
class Login extends Component {

  constructor(props) {
    super(props)

    this.state = {
      value: {
        username: "",
        password: "",
      }
    };
  };

  login() {
    const data = this.refs.form.getValue();
    this.props.login(data);
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.login.isRejected &&
        <Text style={{color: 'white', backgroundColor: 'red'}}>{this.props.login.data}</Text>
        }
        <Form
          ref="form"
          type={LoginForm}
          options={options}
          value={this.state.value}
        />
        <Button title="Login" onPress={()=> this.login()}/>
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
    backgroundColor: "#FF8C00"
  }
});

function mapStateToProps(state) {
  return {
    login: state.userReducers.login,
  };
}

export default connect(mapStateToProps,actions)(Login);
