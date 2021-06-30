import { setAlert } from './alerts'
import Axios from 'axios'
import { API_URL } from '../../utils/config'
import { GET_REPOS } from '../types/repos'

export const addRepo = (name) => async (dispatch) => {
    try {
        const token = localStorage.getItem('auth-token')
        const res = await Axios.post(
            `${API_URL}/repos/addRepos`,
            { repoName: name },
            {
                headers: { 'x-auth-token': token }
            }
        )
        dispatch({
            type: GET_REPOS,
            payload: res.data
        })
    } catch (err) {
        dispatch(setAlert(err.response.data.msg, 'error'))
    }
}

export const getAllRepos = () => async (dispatch) => {
    try {
        const token = localStorage.getItem('auth-token')
        const res = await Axios.get(`${API_URL}/repos/getUsersRepos`, {
            headers: { 'x-auth-token': token }
        })

        dispatch({
            type: GET_REPOS,
            payload: res.data
        })
    } catch (err) {
        dispatch(setAlert(err.response.data.msg, 'error'))
    }
}

export const deleteRepo = (repoId) => async (dispatch) => {
    try {
        const token = localStorage.getItem('auth-token')
        const res = await Axios.delete(`${API_URL}/repos/deleteRepo?repoId=${repoId}`, {
            headers: { 'x-auth-token': token }
        })

        dispatch({
            type: GET_REPOS,
            payload: res.data
        })
    } catch (err) {
        dispatch(setAlert(err.response.data.msg, 'error'))
    }
}

export const updateRepo = (repo) => async (dispatch) => {
    try {
        const token = localStorage.getItem('auth-token')
        const res = await Axios.put(
            `${API_URL}/repos/updateRepo`,
            { repoData: repo },
            {
                headers: { 'x-auth-token': token }
            }
        )

        dispatch({
            type: GET_REPOS,
            payload: res.data
        })
    } catch (err) {
        dispatch(setAlert(err.response.data.msg, 'error'))
    }
}
