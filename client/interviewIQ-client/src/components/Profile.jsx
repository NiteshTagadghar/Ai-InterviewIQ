import React, { useContext, useState } from 'react'
import { UserProvider } from './ContextProvider'
import moment from 'moment'
import UpdateProfile from './UpdateProfile'


function Profile() {



  const {userDetails} = useContext(UserProvider)
  const [isEditEnabled,setIsEditEnabled] = useState(false)



  function calculateAge(dob){
    if(!dob) return null

    const age = moment().diff(dob,'years')

    return age
  }

  console.log(userDetails,'user details')
  return (
    <div className='h-screen relative'>

      {isEditEnabled ? <UpdateProfile setIsEditEnabled={setIsEditEnabled} /> : null}

      <div className='h-40 mt-10 border-1'>

        <div className='flex justify-end '>
          <button className='mr-2 cursor-pointer' onClick={()=>setIsEditEnabled(!isEditEnabled)}>Edit</button>
        </div>

        <div>
          <p>Name : {userDetails.name}</p>
        </div>
        <div>
          <p>Email : {userDetails.email}</p>
        </div>  
        <div>
          <p>Age : {userDetails.dob ? calculateAge (userDetails.dob) : "N/A" } </p>
        </div>  
        <div>
          <p>Phone No. : {userDetails.phone}</p>
        </div>

      </div>
    </div>
  )
}

export default Profile