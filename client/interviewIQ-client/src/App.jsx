import { BrowserRouter, Route, Routes, useParams, useRoutes, useSearchParams } from "react-router-dom"
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


function App() {

  const params = useParams()
  const [hideSidebar,setHideSidebar] = useState(false)
  // const searchParams = useSearchParams()

  console.log(params)


  /*

  
  if(route == "signup" || route =="login"){

    setHideSidebar(true)
  }
  */

  console.log(hideSidebar,'hide side bar')

  return (
    <>

      <ToastContainer />



      <BrowserRouter>
            <Routes>

              <Route element={<ProtectedLayout />}>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
              </Route>


              <Route element={<AuthProtectedRoute />}>
                <Route path="*" element={<FallbackComponent />} />
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
              </Route>
            </Routes>
      </BrowserRouter>



    </>
  )
}

export default App
