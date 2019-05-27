const initialState = {
    reviews: { data: null, isLoading: true, isRejected: false },
    addReview: { data: null, isLoading: true, isRejected: false },

}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'LOAD_REVIEWS_PENDING':
            return { ...state, reviews: { data: null, isLoading: true, isRejected: false } }
        case 'LOAD_REVIEWS_SUCCESS':
            return { ...state, reviews: { data: action.payload, isLoading: false, isRejected: false } }
        case 'LOAD_REVIEWS_REJECTED':
            return { ...state, reviews: { data: action.payload, isLoading: false, isRejected: true } }

        case 'ADD_REVIEW_SUCCESS':
            return { ...state, addReview: { data: true, isLoading: false, isRejected: false } }
        case 'ADD_REVIEW_REJECTED':
            return { ...state, addReview: { data: action.payload, isLoading: false, isRejected: true } }

        default:
            return state
    }
}