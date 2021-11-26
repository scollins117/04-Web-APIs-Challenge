var startButton = document.getElementById("start-btn")
var nextButton = document.getElementById("next-btn")
var containerElement = document.getElementById("questions")
var questionElement = document.getElementById("question")
var answerButtonElement = document.getElementById("answer-btns")

var randomizedQuestions;
var questionIndex;

startButton.addEventListener("click", startGame)
nextButton.addEventListener("click", () => {
    questionIndex++
    nextQuestion()
})

function startGame() {
    console.log("started")
    startButton.classList.add("hide")
    randomizedQuestions = questionList.sort(() => Math.random() - .5)
    questionIndex = 0
    containerElement.classList.remove("hide")
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
        question: "What does event.preventDefault() do?",
        answer: [
            {text: "It stops the browser from reloading the page upon a form submission", correct: true},
            {text: "It stops the browser from allowing the form submission event to occur", correct: false}
        ]
    },
    {
        question: "The browser event submit allows us to do the following",
        answer: [
            {text: "Submit a form using a button", correct: false},
            {text: "Submit a form using the enter key", correct: false},
            {text: "Submit a form using both a button and the enter key", correct: true}
        ]
    }
]