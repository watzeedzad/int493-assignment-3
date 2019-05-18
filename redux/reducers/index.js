import { combineReducers } from 'redux'
import restaurantReducers from './restaurantReducers'
import reviewReducers from './reviewReducers'
import userReducers from './userReducers'

const rootReducers = combineReducers({
    restaurantReducers,
    reviewReducers,
    userReducers
})
export default rootReducers