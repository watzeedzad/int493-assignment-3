import axios from 'axios'
import config from '../../configure'

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