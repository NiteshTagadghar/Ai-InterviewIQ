import React from 'react'
import Reducer from '../components/Reducer'
import { useDispatch, useSelector } from 'react-redux'
import { customTwenty, decrement, increment } from '../features/counter/counterSlice'

function History() {

  const count = useSelector((state) => {
    console.log(state.counter)
    return state.counter.count
  }
  )


  const dispatch = useDispatch()

  console.log(count, 'count')
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