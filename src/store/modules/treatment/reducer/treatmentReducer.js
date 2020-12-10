import {
  BEFORE_STATE_TREATMENT,
  FETCH_TREATMENTS,
  CREATE_TREATMENT_SUCCESS,
  UPDATE_TREATMENT_SUCCESS,
  GET_TREATMENT_SUCCESS,
  TREATMENT_ERROR
} from '../treatmentTypes'

export const initState = {
  treatments: [],
  treatment: {},
  treatmentsError: null,
  isLoading: false,

}

export const treatmentsState = (state = initState, action) => {
  const { payload, type } = action
  switch (type) {
    case BEFORE_STATE_TREATMENT:
      return {
        ...state,
        treatmentsError: null,
        isLoading: true,

      }
    case FETCH_TREATMENTS:
      return {
        ...state,
        treatments: payload,
        isLoading: false,
      }

    case GET_TREATMENT_SUCCESS:
      return {
        ...state,
        treatment: payload,
        treatmentsError: null,
        isLoading: false
      }

    case CREATE_TREATMENT_SUCCESS:
      return {
        ...state,
        treatments: [payload, ...state.treatments],
        treatmentsError: null,
        isLoading: false,

      }

    case UPDATE_TREATMENT_SUCCESS:
      return {
        ...state,
        treatments: state.treatments.map((treatment) => (treatment.id === payload.id
          ? {
            id: payload.id,
            name: payload.name,
            active: payload.active
          } : treatment)),
        treatment: payload,
        treatmentsError: null,
        isLoading: false
      }

    case TREATMENT_ERROR:
      return {
        ...state,
        treatmentsError: payload,
        isLoading: false
      }

    default:
      return state
  }
}
