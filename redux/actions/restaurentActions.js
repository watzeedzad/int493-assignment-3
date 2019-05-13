import axios from 'axios'
import config from '../../configure'

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