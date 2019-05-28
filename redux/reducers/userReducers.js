const initialState = {
    login: { data: null, isLoading: true, isRejected: false },
    register: { data: null, isLoading: true, isRejected: false },
    editUser: { data: null, isLoading: true, isRejected: false },
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return { ...state, login: { data: true, isLoading: false, isRejected: false } }
        case 'LOGIN_REJECTED':
            return { ...state, login: { data: action.payload, isLoading: false, isRejected: true } }

        case 'LOGOUT_SUCCESS':
            return { ...state, login: { data: true, isLoading: false, isRejected: false } }

        case 'REGISTER_SUCCESS':
            return { ...state, register: { data: true, isLoading: false, isRejected: false } }
        case 'REGISTER_REJECTED':
            return { ...state, register: { data: action.payload, isLoading: false, isRejected: true } }

        case 'EDIT_USER_SUCCESS':
            return { ...state, editUser: { data: true, isLoading: false, isRejected: false } }
        case 'EDIT_USER_REJECTED':
            return { ...state, editUser: { data: action.payload, isLoading: false, isRejected: true } }

        default:
            return state
    }
}