import React, { useContext, useState } from 'react'
import { UserProvider } from './ContextProvider'
import { toast } from 'react-toastify'
import axios from 'axios'

function UpdateProfileForm() {

    const {userDetails} = useContext(UserProvider)

    const [user,setUser] = useState(userDetails)

    function updateForm(value,keyName){
        const newDetails = {...user}

        newDetails[keyName] = value

        setUser(newDetails)
    }

    async function updateProfile(e){
        e.preventDefault()
        try{
            const update = await axios.patch(`http://localhost:4000/user/updateProfile`)
            console.log(update)
        }catch(err){
            console.log(err.message)

            toast.error(err.message)
        }
    }
  return (
    <div>
       <form className='flex gap-3 flex-col' onSubmit={updateProfile} >
                <div>
                    <label htmlFor="name"> Name </label>
                    <input className='border-1' type="text" required name='name' id='name' value={user.name} onChange={(e)=>updateForm(e.target.value,'name')}   />
                </div>
                <div>
                    <label htmlFor="email"> Email </label>
                    <input className='border-1' type="email" name='email' id='email'  required value={user.email} onChange={(e)=>updateForm(e.target.value,'email')}  />
                </div>
                <div>
                    <label htmlFor="dob"> Dob </label>
                    <input className='border-1' type="date" name='dob' id='dob' value={user.dob} onChange={(e)=>updateForm(e.target.value,'dob')}    />
                </div>  <div>
                    <label htmlFor="phone"> Phone </label>
                    <input className='border-1' type="text" name='phone' required  id='phone' value={user.phone} onChange={(e)=>updateForm(e.target.value,'phone')}    />
                </div>
                <div>
                    <input type="submit" value="Submit" />
                </div>
            </form>
    </div>
  )
}

export default UpdateProfileForm