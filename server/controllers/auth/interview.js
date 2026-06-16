import dotenv from 'dotenv'
dotenv.config()

import OpenAI from "openai"
import { GoogleGenAI } from '@google/genai';
import { endInterviewSystemPrompt } from '../../utils/prompts.js';


console.log(process.env.GEMINI_API_KEY, ' api key')

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });



export async function liveInterview(req, res) {


    const body = req.body

    if (!body) {
        res.status(401).json({ message: "No prompt provided" })
    }

    try {

        // OPEN AI
        const client = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY, // This is the default and can be omitted
        });


        // console.log(body.prompt, 'prompt')
        const response = await client.responses.create({
            model: 'gpt-5.5',
            input: body.prompt
        });


        // GEMINI AI
        // const response = await ai.models.generateContent({
        //     model: 'gemini-2.5-flash',
        //     contents: body.prompt,
        // });




        console.log(response.text)

        // Open ai Response
        res.status(200).json({ message: "ok", data: response.output_text })

        // Gemini Response
        // res.status(200).json({ message: "ok", data: response.text })

    } catch (err) {
        console.log(err, 'error while calling ai')
        res.status(500).json({ message: err.message })

    }



}


async function askAI({ messages }) {


    const prompt = messages.map((item) => {
        return `${item.role} : ${item.content}`
    }).join("/n")


    try {

        // GEMINI AI
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt
        });


        return response.text

    } catch (err) {
        return Promise.reject(err)
    }

}

// Get return data in json format
async function getFeedbackFromAI({ messages }) {
    console.log(messages)

    const prompt = messages.map((item) => {

        // console.log(messages,prompt)
        return `${item.role} : ${item.content}`
    }).join("/n")



    try {

        // GEMINI AI
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json"
            }

        });

        return response.text

    } catch (err) {
        return Promise.reject(err)
    }
}



const dummyConversation = [{ role: "assistant", content: "Explain promise in javascript" }, { role: "user", content: "Promise is an object, we use promises to handle async tasks, it has 2 stages resolved and rejected" }, { role: "stystem", content: endInterviewSystemPrompt() }]




export { askAI, getFeedbackFromAI }