import axios from "axios";
import config from "../../configure";
import { Actions } from "react-native-router-flux";
import { AsyncStorage } from "react-native";

const BASE_URL = config.BASE_URL;

export const login = values => {
  return dispatch => {
    // console.log(values);
    return axios({
      method: "post",
      url: `${BASE_URL}/user/login`,
      data: values,
      headers: { "Content-Type": "application/json" },
      withCredentials: true
    })
      .then(async result => {
        // const decoded = jwt_decode(result);
        // console.log(decode)
        // console.log(result.data);
        if (result.data.error) {
          dispatch({
            type: "LOGIN_REJECTED",
            payload: result.data
          });
        } else {
          await AsyncStorage.setItem("token", result.data.token).then(() => {
            Actions.pop();
            alert("Login Successful");
            dispatch({ type: "LOGIN_SUCCESS" });
          });
        }
      })
      .catch(err => {
        //กรณี error
        console.log(err);
        dispatch({ type: "LOGIN_REJECTED", payload: err.message });
      });
  };
};

export const logout = () => {
  return dispatch => {
    async () => {
      await AsyncStorage.removeItem("token").then(() => {
        Actions.Home();
        dispatch({ type: "LOGOUT_SUCCESS" });
      });
    };
  };
};
