import { SEARCH_NAME } from '../actions/actionTypes'

const initialState = {
    name: ''
}

export default (payload = initialState, action) => {
    switch (action.type) {
        case SEARCH_NAME:
            return {
                ...payload,
                name: action.status
            }
        default:
            return payload
    }
}