import { toast } from "react-toastify"

// Should update these functions to support all browsers

function textToSpeech(text,setIsAiSpeaking){

    if(!text) return toast("Text not provided to speak")


    const speechSynthesis = window.speechSynthesis

    if(!speechSynthesis){
        toast("Browswer not supporting speech, Please enable speaker from browser")
        return
    }

    // If any text is being spoken currently cancle it and start an new speech
    speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)

    utterance.onstart = ()=>{
        setIsAiSpeaking(true)
    }

    utterance.onend = ()=>{
        setIsAiSpeaking(false)
    }

    console.log(utterance,'utterance')

    speechSynthesis.speak(utterance)
}


let recognition = null

function startListning(onTranscript){

    // Check if browser supports speech recognition
    const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if(!speechRecognition){
        toast("Your browser doesnt support sppech")
        return
    }

    // Create a new instance for speech recognition
    recognition = new speechRecognition()

    recognition.lang = "en-US "

    // Dont stop listning even after user completes the sentence
    recognition.continuous = true


    // Return to all partial text 
    /*
        This
        This is
        This is my 
        This is my answer
    */
    recognition.interimResults = true;


    // Execute whenever spoke
    recognition.onresult = (data)=>{
        // console.log(data,'data from on result event')

        let transcript = ""

        for(let i =0; i< data.results.length; i++){
            transcript += data.results[i][0].transcript
        }

        // setAnswer/setState(speech converted text)
        onTranscript(transcript)

    }

    console.log(recognition,'recognition')


    // Start listning
    recognition.start()

}

function stopListning(){
    if(recognition){
        recognition.stop()
    }
}

export {textToSpeech,startListning,stopListning}