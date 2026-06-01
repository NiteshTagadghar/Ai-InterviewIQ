import { Navigate, Outlet } from 'react-router-dom'

function ProtectedLayout() {


  const user = localStorage.getItem('user')

  // navigate("/",{replace : true})

  if(user){
    return <Navigate to="/" replace />
  }else{
    return <Outlet />
  }


}

export default ProtectedLayout