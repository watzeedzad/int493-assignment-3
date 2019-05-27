import axios from 'axios'
import config from '../../configure'
import { AsyncStorage } from "react-native";
import { Actions } from "react-native-router-flux";

const BASE_URL = config.BASE_URL

export const loadReviews = (restaurantId) => {

    return (dispatch) => {
        dispatch({ type: 'LOAD_REVIEWS_PENDING' })
        return axios({
            method: 'get',
            url: `${BASE_URL}/review/getRestaurantReviews?restaurantId=${restaurantId}`,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            withCredentials: true
            //headers: { authorization: localStorage.getItem('token') }
        }).then(results => {
            dispatch({ type: 'LOAD_REVIEWS_SUCCESS', payload: results.data.restaurantReviews })
        }).catch(err => {
            dispatch({ type: 'LOAD_REVIEWS_REJECTED', payload: err.message })
        })
    }
}

export const addReview = (photos, restaurantId, reviewRate, reviewDesc) => {
    const formData = new FormData();

    if (photos.length > 0) {
        let fileType
        let uriParts
        let uri
        photos.forEach(photo => {
            uri = photo.uri
            uriParts = uri.split('.');
            fileType = uriParts[uriParts.length - 1];
        });

        formData.append('reviewPicture', {
            uri,
            name: `reviewPicture.${fileType}`,
            type: `image/${fileType}`,
        });
        
    } else {
        formData.append('reviewPicture', []);
    }
    formData.append('restaurantId', restaurantId);
    formData.append('reviewRate', reviewRate);
    formData.append('reviewDesc', reviewDesc);
    console.log(formData)

    return async dispatch => {
        console.log(1)
        return axios({
            method: "post",
            url: `${BASE_URL}/review/addReview`,
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data",
                'authorization': await AsyncStorage.getItem("token")
            },
            withCredentials: true
        }).then(results => {
            console.log(2)
            if (results.data.error) {
                dispatch({ type: 'ADD_REVIEW_REJECTED', payload: results.data.message })
            } else {
                alert('Add review success.')
                Actions.pop();
                dispatch({ type: 'ADD_REVIEW_SUCCESS' })
            }
        }).catch(err => {
            console.log(err)
            dispatch({ type: 'ADD_REVIEW_REJECTED', payload: err.message })
        })
    };
};