import React, { useContext } from 'react'
import { UserProvider } from './ContextProvider'


function Profile() {
  const {userDetails} = useContext(UserProvider)

  console.log(userDetails,'user details')
  return (
    <div className='h-screen'>

      <div className='h-40 mt-10 border-1'>

        <div className='flex justify-end '>
          <button className='mr-2'>Edit</button>
        </div>

        <div>
          <p>Name : {}</p>
        </div>

      </div>
    </div>
  )
}

export default Profile