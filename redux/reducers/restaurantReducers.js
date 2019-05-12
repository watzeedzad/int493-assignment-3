const initialState = {
    restaurants: { data: null, isLoading: true, isRejected: false },
    restaurantTypes: { data: null, isLoading: true, isRejected: false },
}

export default (state = initialState, action) => {
    switch (action.type) {
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

        default:
            return state
    }
}