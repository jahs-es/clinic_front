import React from 'react'
import { Route, Navigate } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
const SecuredRoute = ({ component: Component, redirectTo, isAuth, path, ...props }) => {
  if (!isAuth) {
    return <Navigate to={redirectTo} />
  }
  return <Route path={path} element={<Component />} />
}

export default SecuredRoute
