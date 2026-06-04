import OpenAI from "openai"






export async function liveInterview(req, res) {


    const body = req.body

    if (!body) {
        res.status(401).json({ message: "No prompt provided" })
    }

    try {

        const client = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY, // This is the default and can be omitted
        });


        console.log(body.prompt, 'prompt')
        const response = await client.responses.create({
            model: 'gpt-5.5',
            input: body.prompt
        });



        console.log(response)

        res.status(200).json({ message: "ok", data: response.output_text })

    } catch (err) {

        res.status(500).json({ message: err.message })

    }



} 