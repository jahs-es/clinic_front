import { combineReducers } from 'redux'
import authReducer from './auth/reducer/authReducer'
import { patientsState } from './patient/reducer/patientReducer'
import { treatmentsState } from './treatment/reducer/treatmentReducer'

const reducer = combineReducers({
  Auth: authReducer,
  PatientsState: patientsState,
  TreatmentsState: treatmentsState
})

export default reducer
