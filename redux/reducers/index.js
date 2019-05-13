import { combineReducers } from 'redux'
import restaurantReducers from './restaurantReducers'
import reviewReducers from './reviewReducers'

const rootReducers = combineReducers({
    restaurantReducers,
    reviewReducers
})
export default rootReducers