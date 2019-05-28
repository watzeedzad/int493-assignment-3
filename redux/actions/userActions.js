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

export const register = (uri, item) => {
  let fileType
  let uriParts
  if (uri) {
    uriParts = uri.split('.');
    fileType = uriParts[uriParts.length - 1];
  }

  const formData = new FormData();
  if (uri) {
    formData.append('profilePicture', {
      uri,
      name: `profilePicture.${fileType}`,
      type: `image/${fileType}`,
    });
  }else{
    formData.append('profilePicture', null);
  }
  formData.append('username', item.username);
  formData.append('password', item.password);
  formData.append('email', item.email);
  formData.append('firstname', item.firstname);
  formData.append('lastname', item.lastname);
  formData.append('tel', item.tel);

  return dispatch => {
    return axios({
      method: "post",
      url: `${BASE_URL}/user/register`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true
    }).then(results => {
      if (results.data.error) {
        dispatch({ type: 'REGISTER_REJECTED', payload: results.data.errorMessage })
      } else {
        alert('Register success.')
        Actions.pop();
        dispatch({ type: 'REGISTER_SUCCESS' })
      }
    }).catch(err => {
      dispatch({ type: 'REGISTER_REJECTED', payload: err.message })
    })
  };
};

export const editUser = (uri, item) => {
  let fileType
  let uriParts
  if (uri) {
    uriParts = uri.split('.');
    fileType = uriParts[uriParts.length - 1];
  }

  const formData = new FormData();
  if (uri) {
    formData.append('profilePicture', {
      uri,
      name: `profilePicture.${fileType}`,
      type: `image/${fileType}`,
    });
  }else{
    formData.append('profilePicture', null);
  }
  formData.append('userId', item.userId);
  formData.append('email', item.email);
  formData.append('firstname', item.firstname);
  formData.append('lastname', item.lastname);
  formData.append('tel', item.tel);

  return async dispatch => {
    return axios({
      method: "put",
      url: `${BASE_URL}/user/editUser`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        'authorization': await AsyncStorage.getItem("token")
      },
      withCredentials: true
    }).then(async results => {
      if (results.data.error) {
        dispatch({ type: 'EDIT_USER_REJECTED', payload: results.data.errorMessage })
      } else {
        await AsyncStorage.setItem("token", results.data.token).then(() => {
          Actions.pop();
          alert('Edit success.')
          dispatch({ type: 'EDIT_USER_SUCCESS' })
        });
      }
    }).catch(err => {
      dispatch({ type: 'EDIT_USER_REJECTED', payload: err.message })
    })
  };
};


