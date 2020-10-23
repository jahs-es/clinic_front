import axios from 'axios'
import API_ROUTE from '../../../../apiRoute'
import setAuthorizationToken from '../../../../services/auth/authorization'
import {
  BEFORE_STATE,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  SIGNUP_ERROR,
  SIGNUP_SUCCESS,
} from '../authTypes'

export const signIn = (credentials) => {
  return async (dispatch) => {
    dispatch({ type: BEFORE_STATE })
    try {
      const res = await axios.post(`${API_ROUTE}/login`, credentials)
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user_data', JSON.stringify(res.data))
      setAuthorizationToken(res.data.token)
      dispatch({ type: LOGIN_SUCCESS, payload: res.data })
    } catch (err) {
      console.log('error', err)
      dispatch({ type: LOGIN_ERROR, payload: 'Ha habido un error en el logado' })
    }
  }
}

export const signOut = () => {
  return (dispatch) => {
    localStorage.removeItem('token')
    setAuthorizationToken(false)
    dispatch({ type: LOGOUT_SUCCESS })
    window.localStorage.clear()
  }
}

export const signUp = (newUser) => {
  return async (dispatch) => {
    dispatch({ type: BEFORE_STATE })
    try {
      await axios.post(`${API_ROUTE}/users`, newUser)
      dispatch({ type: SIGNUP_SUCCESS })
    } catch (err) {
      dispatch({ type: SIGNUP_ERROR, payload: 'Ha habido un error en el registro' })
    }
  }
}
