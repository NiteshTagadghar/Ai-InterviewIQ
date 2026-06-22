import React, { useEffect } from 'react'
import Reducer from '../components/Reducer'
import { useDispatch, useSelector } from 'react-redux'
import { customTwenty, decrement, increment } from '../features/counter/counterSlice'
import { fetchUsers } from '../features/users/userSlice'

function History() {

  const count = useSelector((state) => {
    console.log(state.counter)
    return state.counter.count
  }
  )


  const {isLoading,users,err} = useSelector((state) =>{

    console.log(state,'state in useSelector for users')
    return state.users
  })

  const dispatch = useDispatch()



  useEffect(()=>{
    dispatch(fetchUsers())
  },[])

  // console.log(count, 'count')

  console.log(isLoading,users,err,'users state from store')
  return (
    <div>
      RTK
      <br />


      <button onClick={()=>dispatch(increment())} className='h-8 w-8 border cursor-pointer'>+</button>
      <p>{count}</p>
      <button onClick={()=>dispatch(decrement())} className='h-8 w-8 border cursor-pointer'>-</button>

    <button onClick={()=>dispatch(customTwenty(20))}>Add 20</button>
      {/* <Reducer /> */}
    </div>
  )
}

export default History