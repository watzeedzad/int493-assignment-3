import axios from 'axios'
import config from '../../configure'

const BASE_URL = config.BASE_URL

export const loadRestaurents = () => {

    return (dispatch) => {
        dispatch({ type: 'LOAD_RESTAURENTS_PENDING' })
        return axios({
            method: 'post',
            url: `${BASE_URL}/home/getAllRestaurant`,
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
            //headers: { authorization: localStorage.getItem('token') }
        }).then(results => {
            dispatch({ type: 'LOAD_RESTAURENTS_SUCCESS', payload: results.data })
        }).catch(err => {
            dispatch({ type: 'LOAD_RESTAURENTS_REJECTED', payload: err.message })
        })
    }
}