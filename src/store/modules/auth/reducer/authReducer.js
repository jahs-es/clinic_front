import isEmpty from 'lodash/isEmpty'
import {
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_SUCCESS,
  BEFORE_STATE,
} from '../authTypes'

export const initState = {
  isAuthenticated: false,
  currentUser: {},
  isLoading: false,
  error: null
}

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case BEFORE_STATE:
      return {
        ...state,
        isLoading: true,
      }
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null
      }
    case SIGNUP_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        currentUser: action.payload,
        isAuthenticated: !isEmpty(action.payload),
        error: null
      }
    case LOGIN_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        currentUser: {},
        error: null,
        isLoading: false
      }
    default:
      return state
  }
}

export default authReducer
