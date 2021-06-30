import * as ACTION_TYPES from '../types/auth.js'

const initialState = {
    token: undefined,
    user: undefined,
    isLogged: undefined
}

const authReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case ACTION_TYPES.AUTH_LOGIN:
            return {
                ...state,
                token: payload.token,
                user: payload.user,
                isLogged: true
            }
        case ACTION_TYPES.AUTH_CHECK:
            return {
                ...state,
                user: payload,
                isLogged: true
            }
        case ACTION_TYPES.AUTH_CHECK_FAIL:
            return {
                ...state,
                isLogged: false
            }
        default:
            return state
    }
}

export default authReducer
