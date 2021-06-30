import { GET_REPOS } from '../types/repos'

const initialState = {
    repos: []
}

const reposReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case GET_REPOS:
            return {
                ...state,
                repos: payload
            }
        default:
            return state
    }
}

export default reposReducer
