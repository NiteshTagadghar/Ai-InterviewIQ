import React from 'react'
import { navItems } from '../utils/navItems'
import { Link, useNavigate } from 'react-router-dom'

function Sidebar() {

  const navigate = useNavigate()

  /* 
  
  Nav items

  1. Dashboard  (Display the graph of grouwth, weak areas and strong areas also a button to book new interview)
  2. New Interview (Take details like, frontend or backend, level of interview easy, medium or hard, duration of the interview, send mail after completion of interview)
  3. History (Display all previous interviews data )
  4. Profile (Can update name, email, phone, stack,change password, languages and skills)
  5. Log out (Clear user details from localstorage )
  
  */

  function logout(){
    localStorage.clear()
    navigate("/login")
  }


  return (
    <div className='flex flex-col justify-between h-screen py-5 pl-2'>

      <div>

        <header>
          <h1>Ai-InterviewIQ</h1>
        </header>

        <nav className='mt-10'>

          <ul>
            {navItems.map((item) => {
              return <li key={item.path}>
                <Link to={item.path}  > {item.name}</Link>
              </li>
            })}
          </ul>

        </nav>
      </div>

      <div>
        <button onClick={logout} className='cursor-pointer'>Log Out</button>
      </div>
    </div>
  )
}

export default Sidebar