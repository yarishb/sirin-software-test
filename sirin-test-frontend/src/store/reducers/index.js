import { combineReducers } from 'redux'
import authReducer from './authReducer'
import alertReducer from './alertReducer'
import reposReducer from './reposReducer'

const rootReducer = combineReducers({
    auth: authReducer,
    alert: alertReducer,
    repos: reposReducer
})

export default rootReducer
