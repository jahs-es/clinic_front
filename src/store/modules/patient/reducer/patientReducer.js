import {
  BEFORE_STATE_PATIENT,
  FETCH_PATIENTS,
  CREATE_PATIENT_SUCCESS,
  UPDATE_PATIENT_SUCCESS,
  GET_PATIENT_SUCCESS,
  RESET_STATE_PATIENT,
  FETCH_PATIENT_TREATMENTS,
  CREATE_PATIENT_TREATMENT_SUCCESS,
  PATIENT_ERROR, UPDATE_PATIENT_TREATMENT_SUCCESS
} from '../patientTypes'

export const initState = {
  patients: [],
  patientTreatments: [],
  patient: {},
  error: null,
  isLoading: false
}

export const patientsState = (state = initState, action) => {
  const { payload, type } = action
  switch (type) {
    case BEFORE_STATE_PATIENT:
      return {
        ...state,
        error: null,
        isLoading: true
      }
    case FETCH_PATIENTS:
      return {
        ...state,
        patients: payload,
        isLoading: false
      }

    case FETCH_PATIENT_TREATMENTS:
      return {
        ...state,
        patientTreatments: payload,
        isLoading: false
      }

    case GET_PATIENT_SUCCESS:
      return {
        ...state,
        patient: payload,
        patientTreatments: [],
        error: null,
        isLoading: false
      }

    case CREATE_PATIENT_SUCCESS:
      return {
        ...state,
        patients: [payload, ...state.patients],
        error: null,
        isLoading: false
      }

    case UPDATE_PATIENT_SUCCESS:
      return {
        ...state,
        patients: state.patients.map((patient) => (patient.id === payload.id
          ? {
            id: payload.id,
            name: payload.name,
            email: payload.email,
            address: payload.address,
            phone: payload.phone
          } : patient)),
        patient: payload,
        error: null,
        isLoading: false
      }

    case CREATE_PATIENT_TREATMENT_SUCCESS:
      return {
        ...state,
        patientTreatments: [payload, ...state.patientTreatments],
        error: null,
        isLoading: false
      }

    case UPDATE_PATIENT_TREATMENT_SUCCESS:
      return {
        ...state,
        // eslint-disable-next-line max-len
        patientTreatments: state.patientTreatments.map((patientTreatment) => (patientTreatment.id === payload.id
          ? {
            id: payload.id,
            detail: payload.detail,
            active: payload.active,
            patient_id: payload.patient_id,
            treatment_id: payload.treatment_id,
            patient: payload.patient,
            treatment: payload.treatment,
          } : patientTreatment)),
        error: null,
        isLoading: false
      }

    case PATIENT_ERROR:
      return {
        ...state,
        error: payload,
        isLoading: false
      }

    case RESET_STATE_PATIENT:
      return {
        ...state,
        patient: { },
        patients: [],
        patientTreatments: []
      }

    default:
      return state
  }
}
