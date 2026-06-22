import axios from 'axios'
import React, { useEffect, useState } from 'react'

function State() {

    const [users,setUsers] = useState([])
    const [isLoading,setIsLoading] = useState(false)
    const [err,setError] = useState("")


    const [count,setCount] = useState(0)


    async function getUsers(){

        setIsLoading(true)

        try{

            // setTimeout(async()=>{

                const users = await axios.get(`https://dummyjon.com/users`)
    
                console.log(users,'users data')
    
                setUsers(users.data.users)
                setIsLoading(false)
            // },3000)

        }catch(err){

            console.log(err,'err')

            setIsLoading(false)
            setError("Failed to load users")
        }
    }

    console.log(isLoading,'is loading')

    console.log(users,'users')


    useEffect(()=>{
        getUsers()
    },[])
  return (
    <div>

            {isLoading && <p>Loading...</p>}

            {err && <p>{err}</p>}
        <ol>
            {users.map((user)=>{
                return <li>{user.firstName}</li>
            })}
        </ol>

        {count}

        <button onClick={()=>setCount(count + 1)}>+</button>
    </div>
  )
}

export default State