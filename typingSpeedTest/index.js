const originTextURL = "https://uselessfacts.jsph.pl/random.json?language=en"
const getButton = document.querySelector(".get-text-btn")
const showText = document.querySelector(".origin-text")
const textWrapper = document.querySelector(".text-wrapper")
const textArea = document.querySelector(".text-area")
const minCounter = document.querySelector("#minutes")
const secCounter = document.querySelector("#seconds")
const milliSecCounter = document.querySelector("#milliSeconds")
const timerCounter = document.querySelector(".timer")
const resetButton = document.querySelector(".reset-btn")
let totalTime = 0
let ms = 0
let sec = 0
let min = 0
let interval
let timerRunning = false

async function getText() {
    let response = await axios(originTextURL)
    let newText = ""
    let text = response.data.text
    
    if (text.includes("`")) {
      newText = text.replace(/`/g, "'")
      showText.innerHTML = newText
    } else {
        showText.innerHTML = text
    }
  
    if (showText.classList.contains("d-none")) {
        showText.classList.remove("d-none")
    }
}



//run timer
function setTime() {

    timerCounter.innerHTML = `${pad(min)}:${pad(sec)}:${pad(ms)}`
    totalTime++
    ms = Math.floor((totalTime) - (sec * 100) - (min * 6000))
    sec = Math.floor((totalTime / 100) - (min * 60))
    min = Math.floor((totalTime / 100) / 60)
}


//adding leading 0 to timer
function pad(val) {
    return val >= 9 ? val : "0" + val
}

//reset timer 
function reset() {
    clearInterval(interval)
    timerRunning = false
    textArea.value = "";
    timerCounter.innerHTML = "00:00:00"
    textWrapper.style.borderColor = "grey"

}

//start timer
function startTimer() {
    let textLength = textArea.value.length
    if (textLength === 0 && !timerRunning) {
        timerRunning = true
        interval = setInterval(setTime, 10)
    }
    // console.log(textLength)
}

//check if letters match
function match() {
    let textEntered = textArea.value;
    let originText = showText.innerHTML.trim()

    let originTextMatch = originText.substring(0, textEntered.length);


    if (textEntered === originText) {
        clearInterval(interval);
        textWrapper.style.borderColor = "#228B22";
    } else {
        if (textEntered == originTextMatch) {
            textWrapper.style.borderColor = "#0000FF";
        } else {
            textWrapper.style.borderColor = "#FF0000";
        }
    }

}



// eventlisteners to fetch text
getButton.addEventListener("click", getText, false)
// eventlistner to start timer when key is press
textArea.addEventListener("keypress", startTimer, false)
textArea.addEventListener("keyup", match, false)
//event listener to reset timer
resetButton.addEventListener("click", reset, false)

