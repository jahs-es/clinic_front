import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import API_ROUTE from '../../../../apiRoute'
import {
  BEFORE_STATE_PATIENT,
  CREATE_PATIENT_SUCCESS,
  FETCH_PATIENTS,
  GET_PATIENT_SUCCESS,
  UPDATE_PATIENT_SUCCESS,
  RESET_STATE_PATIENT,
  FETCH_PATIENT_TREATMENTS,
  CREATE_PATIENT_TREATMENT_SUCCESS,
  UPDATE_PATIENT_TREATMENT_SUCCESS,
  PATIENT_ERROR
} from '../patientTypes'

export const fetchPatients = (value) => {
  return async (dispatch) => {
    value = (value === undefined ? '' : value)

    dispatch({ type: BEFORE_STATE_PATIENT })
    try {
      const res = await axios.get(`${API_ROUTE}/patient?name=${value}&email=${value}&address=${value}`)

      dispatch({ type: FETCH_PATIENTS, payload: res.data })
    } catch (err) {
      dispatch({ type: PATIENT_ERROR, payload: err })
    }
  }
}

export const setPatient = (patient) => {
  return async (dispatch) => {
    dispatch({ type: BEFORE_STATE_PATIENT })

    try {
      dispatch({ type: GET_PATIENT_SUCCESS, payload: patient })

      console.log('setPatient ', patient)
      if (patient.id !== '') {
        const res = await axios.get(`${API_ROUTE}/patient_treatment/${patient.id}`)

        dispatch({ type: FETCH_PATIENT_TREATMENTS, payload: res.data })
      }
    } catch (err) {
      console.log('setPatient', err)
      dispatch({ type: PATIENT_ERROR, payload: err })
    }
  }
}

export const resetPatient = () => {
  return async (dispatch) => {
    dispatch({ type: RESET_STATE_PATIENT })
  }
}

export const createPatient = (patientToCreate) => {
  return async (dispatch) => {
    dispatch({ type: BEFORE_STATE_PATIENT })

    try {
      patientToCreate.id = uuidv4()

      await axios.post(`${API_ROUTE}/patient`, patientToCreate)

      dispatch({
        type: CREATE_PATIENT_SUCCESS,
        payload: patientToCreate
      })
    } catch (err) {
      dispatch({ type: PATIENT_ERROR, payload: err })
    }
  }
}

export const createPatientTreatment = (patientTreatmentToCreate) => {
  return async (dispatch) => {
    dispatch({ type: BEFORE_STATE_PATIENT })

    try {
      patientTreatmentToCreate.id = uuidv4()

      const selectedTreatment = patientTreatmentToCreate.treatment_id

      patientTreatmentToCreate.treatment_id = selectedTreatment.value
      patientTreatmentToCreate.treatment = selectedTreatment.label

      await axios.post(`${API_ROUTE}/patient_treatment`, patientTreatmentToCreate)

      dispatch({
        type: CREATE_PATIENT_TREATMENT_SUCCESS,
        payload: patientTreatmentToCreate
      })
    } catch (err) {
      dispatch({ type: PATIENT_ERROR, payload: err })
    }
  }
}

export const updatePatientTreatment = (patientTreatmentToUpdate) => {
  return async (dispatch) => {
    dispatch({ type: BEFORE_STATE_PATIENT })

    try {
      const selectedTreatment = patientTreatmentToUpdate.treatment_id

      patientTreatmentToUpdate.treatment_id = selectedTreatment.value
      patientTreatmentToUpdate.treatment = selectedTreatment.label

      await axios.put(`${API_ROUTE}/patient_treatment`, patientTreatmentToUpdate)

      dispatch({
        type: UPDATE_PATIENT_TREATMENT_SUCCESS,
        payload: patientTreatmentToUpdate
      })
    } catch (err) {
      dispatch({ type: PATIENT_ERROR, payload: err })
    }
  }
}

export const updatePatient = (patientToUpdate) => {
  return async (dispatch) => {
    try {
      await axios.put(`${API_ROUTE}/patient`, patientToUpdate)

      dispatch({
        type: UPDATE_PATIENT_SUCCESS,
        payload: patientToUpdate
      })
    } catch (err) {
      dispatch({ type: PATIENT_ERROR, payload: err })
    }
  }
}
