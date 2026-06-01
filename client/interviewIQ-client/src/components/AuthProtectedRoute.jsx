import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import ContextProvider from './ContextProvider'

function AuthProtectedRoute() {

    if(!localStorage.getItem("user")) return <Navigate  to="/login" replace/>
  return (
    <div>
      <ContextProvider>
        <Outlet />
      </ContextProvider>
    </div>
  )
}

export default AuthProtectedRoute