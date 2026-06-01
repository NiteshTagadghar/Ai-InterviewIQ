import React from 'react'
import { Link } from 'react-router-dom'

function FallbackComponent() {
  return (
    <div className='h-screen flex justify-center items-center'>
      <div>

        <p>Page not found</p>

        <Link to="/">Redirect to <span className='text-blue-500'>Home</span></Link>
      </div>
    </div>
  )
}

export default FallbackComponent