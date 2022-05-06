//gettimg all required elements
const textArea = document.querySelector("textarea");
voiceList = document.querySelector("select"),
speechBtn = document.querySelector("button");


let synth = speechSynthesis,
isSpeaking = true;

voices();

function voices(){
    for(let voice of synth.getVoices()){ // getVoices return list of available voices on the list
        console.log(voice);
         //selecting "Google US English" voice as default
        let selected = voice.name === "Google US English" ? "selected" : "";
        //creating an option tag with voice name and voice language
        let option = `<option value="${voice.name}" ${selected} />${voice.name} (${voice.lang})</option>`;
        voiceList.insertAdjacentHTML("beforeend", option); //inserting option tag before end of select tag*/ 
    }
}

synth.addEventListener("voiceschanged", voices);

function textToSpeech(text){
    let utterance = new SpeechSynthesisUtterance(text);
    for(let voice of synth.getVoices()){
        //if the available voice name is equal to the user selected voice name
        //then set the speech voice to the user selected voice
        if(voice.name === voiceList.value){
            utterance.voice = voice;
        }
    }

    synth.speak(utterance); // speak the speech utterance
}

speechBtn.addEventListener('click', e => {
    e.preventDefault();
    if(textArea.value !== ""){
        if(!synth.speaking){ // if an utterance value is not currently in the process of speaking
            textToSpeech(textArea.value);
        }
        if(textArea.value.length > 80){
            //if isSpeaking is true then change it's value to false and resume the utterance/speech 
            //else change it's value to true and pause the speech
            if(isSpeaking){
                synth.resume();
                isSpeaking = false;
                speechBtn.innerText = "Pause Speech";
            }else{
                synth.pause();
                isSpeaking = true;
                speechBtn.innerText = "Resume Speech";
            }
             //checking is utterance/speech is speaking process or not in every 100ms
            // if not then set the value of isSpeaking to true and change the button text
            setInterval(() =>{
                if(!synth.speaking && !isSpeaking){
                    isSpeaking = true;
                    speechBtn.innerText = "Convert To Speech";
                } 
            });

        }else{
            speechBtn.innerText = "Convert To Speech";
        }

    }
});
