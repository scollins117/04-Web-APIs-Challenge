var startButton = document.getElementById("start-btn")
var nextButton = document.getElementById("next-btn")
var containerElement = document.getElementById("questions")
var questionElement = document.getElementById("question")
var answerButtonElement = document.getElementById("answer-btns")
var currentTime = document.getElementById("time")
var endGame = document.getElementById("game-over")
var score = 0;

var randomizedQuestions;
var questionIndex;

startButton.addEventListener("click", startGame)
nextButton.addEventListener("click", () => {
    questionIndex++
    nextQuestion()
})

function startGame() {
    console.log("started")
    stopWatch()
    startButton.classList.add("hide")
    randomizedQuestions = questionList.sort(() => Math.random() - .5)
    questionIndex = 0
    containerElement.classList.remove("hide")
    endGame.classList.add("hide")
    nextQuestion()
}

function nextQuestion() {
    resetAnswers()
    displayQuestion(randomizedQuestions[questionIndex])
}

function displayQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        var button = document.createElement("button")
        button.innerText = answer.text
        button.classList.add("btn")

        if(answer.correct) {
            button.dataset.correct = answer.correct
            score++
        } else {
            score--;
            currentTime -50;
        }

        button.addEventListener("click", selectAnswer)
        answerButtonElement.appendChild(button)
    })
}

function resetAnswers() {
    nextButton.classList.add("hide")

    while(answerButtonElement.firstChild) {
        answerButtonElement.removeChild
        (answerButtonElement.firstChild)
    }
}

function selectAnswer(e) {
    var selectedButton = e.target
    var correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if(randomizedQuestions.length > questionIndex + 1) {
        nextButton.classList.remove("hide")
    } else {
        console.log("end")
        gameOver()
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if(correct) {
        element.classList.add("correct")
    } else {
        element.classList.add("wrong")
    }
}

function clearStatusClass(element) {
    element.classList.remove("correct")
    element.classList.remove("wrong")
}

var questionList = [
    {
        question: "True of False: The DOM is built into the JavaScript language.",
        answers: [
            {text: "True", correct: true},
            {text: "False", correct: false}
        ]
    },
    {
        question: "True or False: Other sections of the page are still accesible while an alert() method is displayed.",
        answers: [
            {text: "True", correct: false},
            {text: "False", correct: true}
        ]
    },
    {
        question: "The appendChild() Methods appends a node as the:",
        answers: [
            {text: "parent of a node", correct: false},
            {text: "last child of a node", correct: true},
            {text: "first child of a node", correct: false},
            {text: "parent of all child nodes", correct: false}

        ]
    },
    {   
        question: "On the event object, how do you get the element that triggered the event?:",
        answers: [
            {text: "target.event", correct: false},
            {text: "event.target", correct: true},
            {text: "event.getElementById('target')", correct: false},
            {text: "element.addClassList('target')", correct: false}

        ]
    },
    {   
        question: "In the DOM’s event object, what does its target property refer to?",
        answers: [
            {text: "It refers to the HTML element that was interacted with to dispatch the event.", correct: true},
            {text: "It refers to the HTML element we want to affect as a result of our dispatched event.", correct: false}

        ]
    },
    {   
        question: "If you save your array of objects to the browser’s local storage and it looks like [Object object] when you visit it in Chrome’s DevTools, what’s wrong?",
        answers: [
            {text: "The array wasn’t stringified with JSON.stringify() before saving it in Local Storage.", correct: true},
            {text: "The array wasn’t parsed with JSON.parse() before saving it to Local Storage.", correct: false}

        ]
    },
]


function stopWatch() {
    currentTime = setInterval(countDown, 250);
    var i = 250;
    function countDown() {
        document.getElementById("time").innerHTML = i--;
        if(i ==0) {
            clearInterval(currentTime);
            console.log("end")
            gameOver()

        }
    }
}

function gameOver() {
  console.log("the game is over") 
  containerElement.classList.add("hide")    
  endGame.classList.remove("hide")

}