import React, { useEffect } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'

function ProtectedLayout() {


    // const navigate = useNavigate()

    function redirect(){
        const userCredentials = localStorage.getItem("user")
        console.log(userCredentials,'user credentials')
        if(userCredentials){
            console.log('executing if condition')

            // navigate('/')

            return <Navigate to="/" />
        }

    }


    redirect()

  return (
    <div>
        <Outlet />
    </div>
  )
}

export default ProtectedLayout