import axios from 'axios'
import config from '../../configure'
import { AsyncStorage } from 'react-native';
import jwt_decode from 'jwt-decode';
import { Actions } from "react-native-router-flux";

const BASE_URL = config.BASE_URL

export const login = (values) => {
    return (dispatch) => {
        console.log(values)
        return axios({
            method: 'post',
            url: `${BASE_URL}/user/login`,
            data: values,
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }).then(result => {
            const decoded = jwt_decode(result);
            console.log(decode)
            AsyncStorage.setItem(decoded.sub,JSON.stringify(decoded))
            Actions.Home();
            dispatch({ type: 'LOGIN_SUCCESS' })
        }).catch(err => {
            //กรณี error    
            console.log(err) 
            dispatch({ type: 'LOGIN_REJECTED', payload: err.message })
        })
    }
}