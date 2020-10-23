import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import DashboardLayout from 'src/layouts/DashboardLayout'
import AccountView from 'src/components/account/AccountView'
import PatientListView from 'src/components/patient/PatientListView'
import DashboardView from 'src/components/patient-treatment'
import { useSelector } from 'react-redux'
import LoginView from './components/auth/views/LoginView'
import RegisterView from './components/auth/views/RegisterView'
import MainLayout from './layouts/MainLayout'
import NotFoundView from './components/errors/NotFoundView'
import SecuredRoute from './components/auth/SecuredRoute'
import TreatmentListView from './components/treatment/TreatmentListView'

const AppRoutes = () => {
  const currentState = useSelector((state) => state.Auth)

  return (
    <Routes>
      <Route path="app" element={<DashboardLayout />}>
        <SecuredRoute isAuth={currentState.isAuthenticated} path="patients" component={PatientListView} redirectTo="/login" />
        <SecuredRoute isAuth={currentState.isAuthenticated} path="treatments" component={TreatmentListView} redirectTo="/login" />
        <SecuredRoute isAuth={currentState.isAuthenticated} path="patient-treatments" component={DashboardView} redirectTo="/login" />
        <SecuredRoute isAuth={currentState.isAuthenticated} path="account" component={AccountView} redirectTo="/login" />
        <Route path="*" element={<Navigate to="/404" />} />
      </Route>
      <Route path="/" element={<MainLayout />}>
        <Route path="login" element={<LoginView />} />
        <Route path="register" element={<RegisterView />} />
        <Route path="404" element={<NotFoundView />} />
        <Route path="/" element={<Navigate to="login" />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
