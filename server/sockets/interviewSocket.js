import { askAI } from "../controllers/auth/interview.js"


const interviewSessions = new Map()

function interviewSocket(socket) {

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
            

                // [{role : "system", content : "You are a senior softwer.."}, {role : "assistant", content : "What is javascript"}, {role : "user", content : "Javascript is a single threaded la..."}]

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


            // {technicalScore : 8, communicationScore : 2, strongAreas : ["react","react-router","react-practical"], weakAreas : ["DSA","JS fundamentals","Constructor function"], roadMap : "Should practice more on DSA part for week 1 ...."}


            // Before ending the interview get a feedback, get total score out of 10, get score for communication out of 5 and return an array for strong areas and weak areas also generate a week road map
            const lastConversation = {
                role: "stystem",
                content: "Based on the all the answers give or rate stduent out of 10 technically, and rate student out of 5 based on students  communication. Also return the strong areas where student performed good and week areas where student needs to work on "
            }



            const interviewFeedbackPrompt = {
  
                systemInstruction: `
You are a senior technical interviewer. 
Evaluate the FULL interview transcript provided by the user.

Return ONLY valid JSON — no markdown, no explanation.

Scoring rules:
- technicalScore: integer 0-10. Base on correctness, depth, React practical, DSA, JS fundamentals.
- communicationScore: integer 0-5. Base on clarity, structure, English fluency, confidence.
- strongAreas: array of  strings (skills where candidate was solid)
- weakAreas: array of strings (skills to improve)
- roadMap: object with 7 days for week 1, each day is a specific task

JSON schema to follow exactly:
{
  "technicalScore": 8,
  "communicationScore": 2,
  "strongAreas": ["react", "react-router", "react-practical"],
  "weakAreas": ["DSA", "JS fundamentals", "Constructor function"],
  "roadMap": {
    "day1": "DSA basics - arrays and time complexity",
    "day2": "JS fundamentals - closures and hoisting",
    "day3": "Constructor functions vs classes",
    "day4": "Practice 5 LeetCode easy array problems",
    "day5": "React practical - build small router app",
    "day6": "Mock interview - explain code out loud",
    "day7": "Review weak areas and retake quiz"
  }
}
`,
                generationConfig: {
                    responseMimeType: "application/json",
                    temperature: 0.2
                }
            }

            // // usage with Gemini API
            // const result = await model.generateContent({
            //   contents: [{
            //     role: "user",
            //     parts: [{ text: `INTERVIEW TRANSCRIPT:\n${fullTranscript}` }]
            //   }],
            //   systemInstruction: interviewFeedbackPrompt.systemInstruction,
            //   generationConfig: interviewFeedbackPrompt.generationConfig
            // });

            // const feedback = JSON.parse(result.response.text());





            // Store result in database 



















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




