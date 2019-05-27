import axios from 'axios'
import config from '../../configure'
import { AsyncStorage } from "react-native";
import { Actions } from "react-native-router-flux";

const BASE_URL = config.BASE_URL

export const loadRestaurants = () => {

    return (dispatch) => {
        dispatch({ type: 'LOAD_RESTAURENTS_PENDING' })
        return axios({
            method: 'get',
            url: `${BASE_URL}/home/getAllRestaurant`,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            withCredentials: true
            //headers: { authorization: localStorage.getItem('token') }
        }).then(results => {
            dispatch({ type: 'LOAD_RESTAURANTS_SUCCESS', payload: results.data.restaurantResult })
        }).catch(err => {
            dispatch({ type: 'LOAD_RESTAURANTS_REJECTED', payload: err.message })
        })
    }
}

export const loadRestaurantTypes = () => {

    return (dispatch) => {
        dispatch({ type: 'LOAD_RESTAURANTTYPES_PENDING' })
        return axios({
            method: 'get',
            url: `${BASE_URL}/home/getAllRestaurantType`,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            withCredentials: true
            //headers: { authorization: localStorage.getItem('token') }
        }).then(results => {
            dispatch({ type: 'LOAD_RESTAURANTTYPES_SUCCESS', payload: results.data.restaurantTypeResult })
        }).catch(err => {
            dispatch({ type: 'LOAD_RESTAURANTTYPES_REJECTED', payload: err.message })
        })
    }
}

export const addRestaurant = (uri, item) => {
    let fileType
    let uriParts
    if (uri) {
      uriParts = uri.split('.');
      fileType = uriParts[uriParts.length - 1];
    }
  
    const formData = new FormData();
    if (uri) {
      formData.append('restaurantPicture', {
        uri,
        name: `restaurantPicture.${fileType}`,
        type: `image/${fileType}`,
      });
    }else{
      formData.append('restaurantPicture', null);
    }
    console.log(formData)
    formData.append('restaurantName', item.restaurantName);
    formData.append('restaurantOpenTime', item.restaurantOpenTime);
    formData.append('restaurantCloseTime', item.restaurantCloseTime);
    formData.append('restaurantOpenDate', item.restaurantOpenDate);
    formData.append('restaurantDesc', item.restaurantDesc);
    formData.append('restaurantLat', item.restaurantLat);
    formData.append('restaurantLong', item.restaurantLong);
    formData.append('restaurantTypeId', item.restaurantTypeId);
    formData.append('restaurantAddress', item.restaurantAddress);
    formData.append('restaurantTel', item.restaurantTel);
  
    return async dispatch => {
      return axios({
        method: "post",
        url: `${BASE_URL}/restaurant/addRestaurant`,
        data: formData,
        headers: { 
            "Content-Type": "multipart/form-data",
            'authorization': await AsyncStorage.getItem("token")
        },
        withCredentials: true
      }).then(results => {
        if (results.data.error) {
          dispatch({ type: 'ADD_RESTAURANT_REJECTED', payload: results.data.message })
        } else {
          alert('Add restaurant success.')
          Actions.pop();
          dispatch({ type: 'ADD_RESTAURANT_SUCCESS' })
        }
      }).catch(err => {
        dispatch({ type: 'ADD_RESTAURANT_REJECTED', payload: err.message })
      })
    };
  };