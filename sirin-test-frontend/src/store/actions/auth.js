import * as ACTION_TYPES from '../types/auth.js'
import { API_URL, config } from '../../utils/config'
import { setAlert } from './alerts'

import Axios from 'axios'

export const checkLogged = () => (dispatch) => {
    return new Promise(async (resolve) => {
        try {
            let token = localStorage.getItem('auth-token')
            if (token === null) {
                localStorage.setItem('auth-token', '')
                token = ''
            }

            const tokenRes = await Axios.post(`${API_URL}/auth/validToken`, null, {
                headers: { 'x-auth-token': token }
            })

            if (tokenRes.data) {
                const userRes = await Axios.get(`${API_URL}/auth/`, {
                    headers: { 'x-auth-token': token }
                })

                dispatch({
                    type: ACTION_TYPES.AUTH_CHECK,
                    payload: userRes.data
                })

                resolve(userRes.data)
            } else {
                dispatch({
                    type: ACTION_TYPES.AUTH_CHECK_FAIL
                })
            }
        } catch (err) {
            dispatch(setAlert(err.response.data.msg, 'error'))
        }
    })
}

export const login = (data) => async (dispatch) => {
    try {
        const loginRes = await Axios.post(`${API_URL}/auth/login`, data, config)
        localStorage.setItem('auth-token', loginRes.data.token)

        dispatch({
            type: ACTION_TYPES.AUTH_LOGIN,
            payload: loginRes.data
        })
        dispatch(checkLogged())
    } catch (err) {
        dispatch(setAlert(err.response.data.msg, 'error'))
    }
}

export const register = (data) => async (dispatch) => {
    try {
        await Axios.post(`${API_URL}/auth/register`, data, config)
        dispatch(login(data))
        dispatch(setAlert('Реєстрація пройшла успішно.', 'success'))
    } catch (err) {
        console.log(err)
        if (err.response) {
            dispatch(setAlert(err.response.data.msg, 'error'))
        }
    }
}
