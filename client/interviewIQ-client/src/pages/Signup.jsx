import React from 'react'
import { useState } from 'react'

function Signup() {

    const [formValues,setFormValues] = useState({name : "", email :"", age : 0, phone : "", password : "", confirmPassword : ""})
    return (
        <div className='h-screen flex justify-center items-center'>
            <form className='flex gap-3 flex-col' >
                <div>
                    <label htmlFor="name"> Name </label>
                    <input className='border-1' type="text" name='name' id='name' />
                </div>
                <div>
                    <label htmlFor="email"> Email </label>
                    <input className='border-1' type="email" name='email' id='email' />
                </div>
                <div>
                    <label htmlFor="age"> Age </label>
                    <input className='border-1' type="number" name='age' id='age' />
                </div>  <div>
                    <label htmlFor="phone"> Phone </label>
                    <input className='border-1' type="text" name='phone' id='phone'  />
                </div>
                <div>
                    <label htmlFor="password"> Password </label>
                    <input className='border-1' type="password" name='password' id='password' />
                </div>
                <div>
                    <label htmlFor="confirm-password"> Confirm Password </label>
                    <input className='border-1' type="password" name='confirm-password' id='confirm-password' />
                </div>


                <div>
                    <input type="submit" value="Submit" />
                </div>
            </form>
        </div>
    )
}

export default Signup