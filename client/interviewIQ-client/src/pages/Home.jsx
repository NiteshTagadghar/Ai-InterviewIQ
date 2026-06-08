import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { api } from '../apis/interceptors'
import socket from '../interviewSocket'

function Home() {

  const aiContentContainer = useRef()
  const aiResponse = "Okay, here's a well-structured and comprehensive answer for an interview, designed to demonstrate your understanding of Express.js.\n\n---\n\n**Interview Answer:**\n\n\"Express.js is a **fast, minimalist, and unopinionated web application framework for Node.js**. It provides a robust set of features for building web and mobile applications, and is the *de facto* standard for creating powerful and scalable RESTful APIs with Node.js.\n\n**Why is it so popular and widely used?**\n\n1.  **Simplifies Node.js Development:** While Node.js itself is excellent for server-side JavaScript, Express.js abstracts away many low-level details, making it significantly easier and faster to build web applications and APIs.\n2.  **Minimalist & Flexible:** It comes with core functionalities but doesn't impose a rigid structure or design pattern. This 'unopinionated' nature gives developers the freedom to choose their own architecture, database, and templating engine.\n3.  **Powerful Routing:** It provides a robust routing system that allows you to define how your application responds to specific client requests to particular endpoints (URIs) and HTTP methods (GET, POST, PUT, DELETE).\n4.  **Extensive Middleware Ecosystem:** This is one of its most powerful features. Middleware functions have access to the request object (`req`), the response object (`res`), and the `next` middleware function in the application's request-response cycle. They can perform various tasks like parsing request bodies (e.g., `body-parser`), logging, authentication, session management, and error handling, making applications highly modular.\n5.  **Performance & Scalability:** Being built on Node.js, Express inherits its non-blocking I/O model, making it very efficient for handling concurrent requests and building highly performant and scalable applications.\n6.  **Large Community & Resources:** It has a massive and active community, meaning abundant documentation, tutorials, and a vast array of third-party middleware and packages.\n\n**How it fundamentally works:**\n\nAt its core, Express.js functions by listening for incoming HTTP requests. When a request arrives, it passes through a series of **middleware functions** that can process the request, modify it, or respond to it. Finally, a **route handler** matches the request's URL and HTTP method and generates a response, typically sending back JSON data for APIs, rendering an HTML page, or redirecting.\n\n**In summary**, Express.js is an essential tool in the Node.js ecosystem because it provides the necessary structure and tools to efficiently build scalable, high-performance web applications and APIs, while maintaining flexibility and a lightweight footprint.\"\n\n---\n\n**Key takeaways from this answer for an interviewer:**\n\n*   You know the core definition.\n*   You understand *why* it's used (benefits).\n*   You can articulate its two most fundamental concepts: Routing and Middleware.\n*   You can explain the Request/Response cycle implicitly.\n*   You connect it back to Node.js's strengths.\n*   You use appropriate terminology confidently."

  const [userText,setUserText] = useState("")

  async function callAi(e){
    e.preventDefault()

    if(!userText){
      toast("Add prompt to ai", {theme :"dark"})
      return
    }


    try{
      const response = await api.post('/interview/liveInterview', {prompt : userText })

      console.log(response,response?.data?.data,'ai response')

      aiContentContainer.current.innerText = response.data.data

    }catch(err){
      console.log(err,'error while calling ai')

      toast.error(err.message)
    }

    console.log("calling ai",userText)


  }


 
  


  function sendFirstMessage(){
    socket.emit("first-message", {message : "Lets start interview"})
  }

   useEffect(()=>{
    socket.connect()

    socket.on("confirm-interview",(data)=>{
      console.log(data,'data for confirming interview')
    });


   return ()=>{

    socket.off("confirm-interview")

    socket.disconnect()

    }
  },[])

  return (
    <div className='h-[900px]'>
      {/* <form className='flex justify-center gap-4 mt-4' onSubmit={callAi} >
        <textarea type="text" className='w-80 border-1 shadow-2xl' placeholder='Ask ai' onChange={(e)=>setUserText(e.target.value)} />
        <input type="submit" value="Submit" disabled={!userText.length ? true : false}  className={`${!userText.length ? "bg-blue-200" :"bg-blue-400 cursor-pointer"  }   rounded text-white p-2`}  />

      </form>
      <div ref={aiContentContainer}>

      </div> */}


      <button onClick={sendFirstMessage}>Send first message</button>

      <br />

      <button>Get interview question</button>
    </div>
  )
}

export default Home


 /*
 1. A function that should accept text and convert into speech
 2. User will click a button  called start then start talking (giving answer)
 3. A function that should listen to speech and convert it into text
 4. User will click a button called stop to stop giving answer
 5. User can have one more button which says re-attempt to replace current answer
 6. User can have one more button whcih says No-Answer in red color 
 7. Once user gives answer then there should be a button saying submit answer
 
 
 */