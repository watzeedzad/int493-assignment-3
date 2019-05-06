import axios from 'axios'
import config from '../../configure'

const BASE_URL = config.BASE_URL

export const loadRestaurents = () => {

    return (dispatch) => {
        dispatch({ type: 'LOAD_RESTAURENTS_PENDING' })
        return axios({
            method: 'get',
            url: `${BASE_URL}/home/getAllRestaurant`,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            withCredentials: true
            //headers: { authorization: localStorage.getItem('token') }
        }).then(results => {
            dispatch({ type: 'LOAD_RESTAURENTS_SUCCESS', payload: results.data.restaurantResult })
        }).catch(err => {
            dispatch({ type: 'LOAD_RESTAURENTS_REJECTED', payload: err.message })
        })
    }
}

export const loadRestaurentTypes = () => {

    return (dispatch) => {
        dispatch({ type: 'LOAD_RESTAURENTTYPES_PENDING' })
        return axios({
            method: 'get',
            url: `${BASE_URL}/home/getAllRestaurantType`,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            withCredentials: true
            //headers: { authorization: localStorage.getItem('token') }
        }).then(results => {
            dispatch({ type: 'LOAD_RESTAURENTTYPES_SUCCESS', payload: results.data.restaurantTypeResult })
        }).catch(err => {
            dispatch({ type: 'LOAD_RESTAURENTTYPES_REJECTED', payload: err.message })
        })
    }
}