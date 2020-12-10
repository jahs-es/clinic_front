import React from 'react'
import { Route, Navigate } from 'react-router-dom'

const SecuredRoute = ({ component: Component, redirectTo, isAuth, path }) => {
  if (!isAuth) {
    return <Navigate to={redirectTo} />
  }
  return <Route path={path} element={<Component />} />
}

export default SecuredRoute
