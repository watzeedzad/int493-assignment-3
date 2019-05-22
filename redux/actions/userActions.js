import axios from "axios";
import config from "../../configure";
import { Actions } from "react-native-router-flux";
import LocalStorage from "../../Utils/localStorage";

const BASE_URL = config.BASE_URL;

export const login = values => {
  return dispatch => {
    console.log(values);
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
        await LocalStorage.saveStringData("token", result.data);
        Actions.Home();
        dispatch({ type: "LOGIN_SUCCESS" });
      })
      .catch(err => {
        //กรณี error
        console.log(err);
        dispatch({ type: "LOGIN_REJECTED", payload: err.message });
      });
  };
};
