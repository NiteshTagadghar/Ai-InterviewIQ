import React, { createContext, useEffect, useState } from 'react'


export const UserProvider = createContext()

function ContextProvider({children}) {



  const [userDetails,setUserDetails] = useState({})
  // const [userPreference,setUserPrefernece] = useState()

  useEffect(()=>{
    const newDetails = JSON.parse(localStorage.getItem('user'))
    setUserDetails(newDetails)
  },[])


  return (
    <UserProvider.Provider value={{userDetails}}>
      {children}
    </UserProvider.Provider>
  )
}

export default ContextProvider