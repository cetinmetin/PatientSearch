import { SEARCH_NAME, SEARCH_PARAMETERS, SET_TABLE_DATA, RESET_TABLE_DATA } from './actionTypes'

export const setName = (newStatus) => ({
    type: SEARCH_NAME,
    status: newStatus
})
export const setSearchParameters = (newStatus) => ({
    type: SEARCH_PARAMETERS,
    status: newStatus
})
export const setTabledata = (newStatus) => ({
    type: SET_TABLE_DATA,
    status: newStatus
})
export const resetTableData = () => ({
    type: RESET_TABLE_DATA
})