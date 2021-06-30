import { SET_ALERT, REMOVE_ALERT } from '../types/alertTypes'

const initialState = []
const alertReducer = (state = initialState, action) => {
    const { type, payload } = action

    switch (type) {
        case SET_ALERT:
            return [...state, payload]
        case REMOVE_ALERT:
            return state.filter((alert) => alert.id !== payload)
        case REMOVE_ALERT:
            return {
                ...state,
                close_alert: true
            }
        default:
            return state
    }
}

export default alertReducer
