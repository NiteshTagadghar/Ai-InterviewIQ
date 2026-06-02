import React from 'react'

function UpdateProfile({setIsEditEnabled}) {
  return (
    <div className='absolute h-[400px] shadow-2xl flex  bg-white left-[25%] w-[400px]'>
        <div className='w-full'>
            <div className=' flex justify-end' >
                <button onClick={()=>setIsEditEnabled(false)} >Close</button>
            </div>
            <div>
                <form ></form>
            </div>
        </div>
    </div>
  )
}

export default UpdateProfile