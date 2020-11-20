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
  errorSignUp: null,
  errorLogin: null
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
        errorSignUp: null
      }
    case SIGNUP_ERROR:
      return {
        ...state,
        isLoading: false,
        errorSignUp: action.payload
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        currentUser: action.payload,
        isAuthenticated: !isEmpty(action.payload),
        errorLogin: null
      }
    case LOGIN_ERROR:
      return {
        ...state,
        isLoading: false,
        errorLogin: action.payload
      }
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        currentUser: {},
        errorLogin: null,
        errorSignUp: null,
        isLoading: false
      }
    default:
      return state
  }
}

export default authReducer
