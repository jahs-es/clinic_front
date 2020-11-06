import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import API_ROUTE from '../../../../apiRoute'
import {
  BEFORE_STATE_TREATMENT,
  CREATE_TREATMENT_SUCCESS,
  FETCH_TREATMENTS,
  TREATMENT_ERROR,
  UPDATE_TREATMENT_SUCCESS
} from '../treatmentTypes'

export const fetchTreatments = () => {
  return async (dispatch) => {
    dispatch({ type: BEFORE_STATE_TREATMENT })
    try {
      console.log('fetchTreatments')
      const res = await axios.get(`${API_ROUTE}/v1/treatment`)

      dispatch({ type: FETCH_TREATMENTS, payload: res.data })
    } catch (err) {
      dispatch({ type: TREATMENT_ERROR, payload: err })
    }
  }
}

export const createTreatment = (treatmentToCreate) => {
  return async (dispatch) => {
    dispatch({ type: BEFORE_STATE_TREATMENT })

    try {
      treatmentToCreate.id = uuidv4()

      await axios.post(`${API_ROUTE}/v1/treatment`, treatmentToCreate)

      dispatch({
        type: CREATE_TREATMENT_SUCCESS,
        payload: treatmentToCreate
      })
    } catch (err) {
      dispatch({ type: TREATMENT_ERROR, payload: err })
    }
  }
}

export const updateTreatment = (treatmentToUpdate) => {
  return async (dispatch) => {
    dispatch({ type: BEFORE_STATE_TREATMENT })

    try {
      await axios.put(`${API_ROUTE}/v1/treatment`, treatmentToUpdate)

      dispatch({
        type: UPDATE_TREATMENT_SUCCESS,
        payload: treatmentToUpdate
      })
    } catch (err) {
      dispatch({ type: TREATMENT_ERROR, payload: err })
    }
  }
}
