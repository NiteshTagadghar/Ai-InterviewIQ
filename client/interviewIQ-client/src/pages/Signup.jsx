import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'

function Signup() {

    const [formValues,setFormValues] = useState({name : "", email :"", age : 0, phone : "", password : "", confirmPassword : ""})
   
   
    function updateFormData(e){

        const {name,value} = e.target

        console.log(name,value)



        // Create a new object copy formValues 
        const updatedFormValues = {...formValues}


        updatedFormValues[name] = value


        if(name == "phone" && value.length > 10){
            console.log("wrong number format")
            return
        }


        setFormValues(updatedFormValues)



    }


    async function signUp(e){
        e.preventDefault()

        if(formValues.password !== formValues.confirmPassword) {
            toast("Password does not match",{
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: "Bounce",

            })
            return
        }



        const data =  await axios.post("http://localhost:4000/auth/signup")
        console.log(data,' data from signup')



    }

    console.log(formValues,'form values')
   
    return (
        <div className='h-screen flex justify-center items-center'>
            <form className='flex gap-3 flex-col' onSubmit={signUp} >
                <div>
                    <label htmlFor="name"> Name </label>
                    <input className='border-1' type="text" value={formValues.name}  name='name' id='name'  onChange={updateFormData} />
                </div>
                <div>
                    <label htmlFor="email"> Email </label>
                    <input className='border-1' type="email" name='email' id='email' onChange={updateFormData}  />
                </div>
                <div>
                    <label htmlFor="age"> Age </label>
                    <input className='border-1' type="number" name='age' id='age' onChange={updateFormData}  />
                </div>  <div>
                    <label htmlFor="phone"> Phone </label>
                    <input className='border-1' type="text" name='phone' value={formValues.phone} id='phone'  onChange={updateFormData}  />
                </div>
                <div>
                    <label htmlFor="password"> Password </label>
                    <input className='border-1' type="password" name='password' id='password' onChange={updateFormData}  />
                </div>
                <div>
                    <label htmlFor="confirmPassword"> Confirm Password </label>
                    <input className='border-1' type="password" name='confirmPassword' id='confirmPassword' onChange={updateFormData}  />
                </div>


                <div>
                    <input type="submit" value="Submit" />
                </div>
            </form>


        </div>
    )
}

export default Signup