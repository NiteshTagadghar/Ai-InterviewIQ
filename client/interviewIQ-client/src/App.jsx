import { BrowserRouter, Outlet, Route, Routes, useLocation, useParams, useRoutes, useSearchParams } from "react-router-dom"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Home from "./pages/Home"
import { ToastContainer } from "react-toastify"
import ProtectedLayout from "./components/ProtectedLayout"
import AuthProtectedRoute from "./components/AuthProtectedRoute"
import FallbackComponent from "./components/FallbackComponent"
import Sidebar from "./components/Sidebar"
import Profile from "./components/Profile"
import { useState } from "react"
import NewInterview from "./pages/NewInterview"
import History from "./pages/History"
import ContextProvider from "./components/ContextProvider"
import Dashboard from "./pages/Dashboard"


function App() {

  return (
    <>

      <ToastContainer />
      
      <BrowserRouter>
        <Routes>

          <Route element={<Layout />}>

            <Route element={<ProtectedLayout />}>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
            </Route>


              <Route element={<AuthProtectedRoute />}>
                <Route path="*" element={<FallbackComponent />} />
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/new-interview" element={<NewInterview />} />
                <Route path="/history" element={<History />} />
              </Route>

          </Route>

        </Routes>
      </BrowserRouter>
    </>
  )
}



function Layout() {

  const location = useLocation()

  const isBarHidden = location.pathname == "/login" || location.pathname == "/signup"

  return (
    <div className="h-screen flex">

      {
        !isBarHidden && <div className="shadow-2xl w-46 ">
          <Sidebar />

        </div>
      }

      <div className=" w-full overflow-auto ">

        <Outlet />

      </div>

    </div>
  )
}


export default App

/* 

Step 1 : Create a folder for api, then file for interceptors

Step 2 : Create axios instance using axios.create('baseurl')

Step 3 : Create interceptors for req and res

Step 4 : In req interceptor get token and tag it to headers authorization of api request 

Step 5 : In res interceptor if response is like token expired or invalid token log out user

*/
