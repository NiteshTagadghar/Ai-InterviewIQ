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
        !isBarHidden && <div className="border-1 w-46">
          <Sidebar />

        </div>
      }

      <div className=" w-full">

        <Outlet />

      </div>

    </div>
  )
}


export default App
