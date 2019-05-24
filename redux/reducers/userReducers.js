const initialState = {
    login: { data: null, isLoading: true, isRejected: false },
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return { ...state, login: { data: true, isLoading: false, isRejected: false } }
        case 'LOGIN_REJECTED':
            return { ...state, login: { data: action.payload, isLoading: false, isRejected: true } }

        case 'LOGOUT_SUCCESS':
            return { ...state, login: { data: true, isLoading: false, isRejected: false } }

        default:
            return state
    }
}