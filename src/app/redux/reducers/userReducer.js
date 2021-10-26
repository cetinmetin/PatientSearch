import { SEARCH_NAME, SEARCH_PARAMETERS, SET_TABLE_DATA, RESET_TABLE_DATA } from '../actions/actionTypes'

const initialState = {
    name: '',
    searchParameters: [],
    tableData: [[]]
}

export default (payload = initialState, action) => {
    switch (action.type) {
        case SEARCH_NAME:
            return {
                ...payload,
                name: action.status
            }
        case SEARCH_PARAMETERS:
            return {
                ...payload,
                searchParameters: action.status
            }
        case SET_TABLE_DATA:
            return {
                ...payload,
                tableData: action.status
            }
        case RESET_TABLE_DATA:
            return {
                ...payload,
                tableData: [[]]
            }
        default:
            return payload
    }
}