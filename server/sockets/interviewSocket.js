import { askAI } from "../controllers/auth/interview.js"


const interviewSessions = new Map()

function interviewSocket(socket){

    // socket.on("first-message",(data)=>{
    //     console.log("first message recieved", data)

    //     socket.emit("confirm-interview",{message : "first message recieved good to start interview"})
    // })


    // socket.on("disconnect",(data)=>{
        
    //     console.log("socket connection closed")
    // })


     socket.on(
        "start-interview",
        async ({
            stack = "MERN",
            experience = "Fresher"
        }) => {

            try {

                /*
                ------------------------------------------------------
                | Create Session
                ------------------------------------------------------
                */

                const session = {

                    stack,

                    experience,

                    conversation: [

                        {
                            role: "system",

                            content: `
You are a Senior Technical Interviewer.

Candidate Stack:
${stack}

Experience:
${experience}

Rules:

1. Ask only one question.
2. Ask follow-up questions.
3. Challenge weak answers, or ask follow up question if answer is not 100% correct
4. Increase difficulty gradually.
5. Never provide solutions.
`
                        }
                    ]
                }

                // Store conversation with socket id (to identify unique clients sockets)
                interviewSessions.set(
                    socket.id,
                    session
                )

                /*
                ------------------------------------------------------
                | Generate First Question
                ------------------------------------------------------
                */

                const firstQuestion =
                    await askAI({

                        messages:
                            session.conversation
                    })

                /*
                ------------------------------------------------------
                | Save AI Question
                ------------------------------------------------------
                */

                session.conversation.push({

                    role: "assistant",

                    content:
                        firstQuestion
                })

                socket.emit(
                    "ai-question",
                    {
                        question:
                            firstQuestion
                    }
                )

            } catch (err) {

                console.log(err)

                socket.emit(
                    "error",
                    {
                        message:
                            err.message
                    }
                )
            }
        }
    )

    /*
    |--------------------------------------------------------------------------
    | USER ANSWER
    |--------------------------------------------------------------------------
    */

    socket.on(
        "submit-answer",
        async ({ answer }) => {

            try {

                const session =
                    interviewSessions.get(
                        socket.id
                    )

                if (!session)
                    return

                /*
                ------------------------------------------------------
                | Save User Answer For Maintaining History Of Conversation
                ------------------------------------------------------
                */

                session.conversation.push({

                    role: "user",

                    content:
                        answer
                })

                /*
                ------------------------------------------------------
                | Ask Next Question
                ------------------------------------------------------
                */

                const nextQuestion =
                    await askAI({

                        messages:
                            session.conversation
                    })

                /*
                ------------------------------------------------------
                | Save AI Question
                ------------------------------------------------------
                */

                session.conversation.push({

                    role: "assistant",

                    content:
                        nextQuestion
                })

                socket.emit(
                    "ai-question",
                    {
                        question:
                            nextQuestion
                    }
                )

            } catch (err) {

                console.log(err)
            }
        }
    )

    /*
    |--------------------------------------------------------------------------
    | VIEW CONVERSATION
    |--------------------------------------------------------------------------
    |
    | Useful for debugging
    |
    */

    socket.on(
        "get-conversation",
        () => {

            const session =
                interviewSessions.get(
                    socket.id
                )

            socket.emit(
                "conversation-data",

                session?.conversation ||
                []
            )
        }
    )

    /*
    |--------------------------------------------------------------------------
    | END INTERVIEW
    |--------------------------------------------------------------------------
    */

    socket.on(
        "end-interview",
        () => {

            const session =
                interviewSessions.get(
                    socket.id
                )

            console.log(
                "Final Conversation:"
            )

            console.log(
                session?.conversation
            )

            interviewSessions.delete(
                socket.id
            )
        }
    )

    /*
    |--------------------------------------------------------------------------
    | DISCONNECT
    |--------------------------------------------------------------------------
    */

    socket.on(
        "disconnect",
        () => {

            interviewSessions.delete(
                socket.id
            )

            console.log(
                "Disconnected:",
                socket.id
            )
        }
    )

}





export default interviewSocket


/* 

 Complete the flow for converstion between user and ai for interview

 1. Create a prompt to send to ai for the first time where you will define user stack, user experience and the difficulty level
 2. Create a map to store all socket ids and mapped with conversation (to pass it to next question as context)
 3. Create a commong function called askAI and pass complete conversation as history so that we can get follow up question
 4. Create an event to start interview, submit answer, end interview
 5. On socket disconnect or end interview delete socketid and conversation of that perticuler client

*/




