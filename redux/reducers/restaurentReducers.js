const initialState = {
    restaurents: { data: null, isLoading: true, isRejected: false },
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'LOAD_RESTAURENTS_PENDING':
            return { ...state, restaurents: { data: null, isLoading: true, isRejected: false } }
        case 'LOAD_RESTAURENTS_SUCCESS':
            return { ...state, restaurents: { data: action.payload, isLoading: false, isRejected: false } }
        case 'LOAD_RESTAURENTS_REJECTED':
            return { ...state, restaurents: { data: action.payload, isLoading: false, isRejected: true } }

        default:
            return state
    }
}