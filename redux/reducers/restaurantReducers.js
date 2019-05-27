const initialState = {
    restaurant: { data: null, isLoading: true, isRejected: false },
    restaurants: { data: null, isLoading: true, isRejected: false },
    restaurantTypes: { data: null, isLoading: true, isRejected: false },
    addRestaurant: { data: null, isLoading: true, isRejected: false },
    editRestaurant: { data: null, isLoading: true, isRejected: false },
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'LOAD_RESTAURANT_PENDING':
            return { ...state, restaurant: { data: null, isLoading: true, isRejected: false } }
        case 'LOAD_RESTAURANT_SUCCESS':
            return { ...state, restaurant: { data: action.payload, isLoading: false, isRejected: false } }
        case 'LOAD_RESTAURANT_REJECTED':
            return { ...state, restaurant: { data: action.payload, isLoading: false, isRejected: true } }

        case 'LOAD_RESTAURANTS_PENDING':
            return { ...state, restaurants: { data: null, isLoading: true, isRejected: false } }
        case 'LOAD_RESTAURANTS_SUCCESS':
            return { ...state, restaurants: { data: action.payload, isLoading: false, isRejected: false } }
        case 'LOAD_RESTAURANTS_REJECTED':
            return { ...state, restaurants: { data: action.payload, isLoading: false, isRejected: true } }

        case 'LOAD_RESTAURANTTYPES_PENDING':
            return { ...state, restaurantTypes: { data: null, isLoading: true, isRejected: false } }
        case 'LOAD_RESTAURANTTYPES_SUCCESS':
            return { ...state, restaurantTypes: { data: action.payload, isLoading: false, isRejected: false } }
        case 'LOAD_RESTAURANTTYPES_REJECTED':
            return { ...state, restaurantTypes: { data: action.payload, isLoading: false, isRejected: true } }

        case 'ADD_RESTAURANT_SUCCESS':
            return { ...state, addRestaurant: { data: true, isLoading: false, isRejected: false } }
        case 'ADD_RESTAURANT_REJECTED':
            return { ...state, addRestaurant: { data: action.payload, isLoading: false, isRejected: true } }

        case 'EDIT_RESTAURANT_SUCCESS':
            return { ...state, editRestaurant: { data: true, isLoading: false, isRejected: false } }
        case 'EDIT_RESTAURANT_REJECTED':
            return { ...state, editRestaurant: { data: action.payload, isLoading: false, isRejected: true } }

        default:
            return state
    }
}