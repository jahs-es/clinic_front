import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducer from './modules/index'

// FOR LOCAL BUILD
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = process.env.NODE_ENV === 'development'
  ? createStore(
    reducer,
    composeEnhancers(
      applyMiddleware(thunk)
    )
  )
  : createStore(
    reducer,
    applyMiddleware(thunk)
  )

export default store
