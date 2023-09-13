const questions_answers = [
    {
        question: "what is Abhi's fav colour?",
        answers: [
            { text: "Red", correct: false},
            { text: "Green", correct: false},
            { text: "Blue", correct: true},
            { text: "Yellow", correct: false}
        ]
    },
    {
        question: "what instrument can Abhi play?",
        answers: [
            { text: "Piano", correct: false},
            { text: "Guitar", correct: true},
            { text: "Trumpet", correct: false},
            { text: "Drums", correct: false}
        ]
    },
    {
        question: "How many languages can Abhi speak?",
        answers: [
            { text: "4", correct: true},
            { text: "2", correct: false},
            { text: "3", correct: false},
            { text: "6", correct: false}
        ]
    },
    {
        question: "what is his fav sport?",
        answers: [
            { text: "Basketball", correct: false},
            { text: "Cricket", correct: false},
            { text: "Football", correct: true},
            { text: "Tennis", correct: false}
        ]
    },
    {
        question: "what does he like the most out of these?",
        answers: [
            { text: "Ice-Cream", correct: true},
            { text: "Coffee", correct: false},
            { text: "Cookies", correct: false},
            { text: "Cake", correct: false}
        ]
    },
    {
        question: "does he like pineapple on pizza?",
        answers: [
            { text: "Yes", correct: false},
            { text: "No", correct: true}
        ]
    }
];


const questions = document.querySelector('#questions');
const answer_options = document.querySelector('#options');
const next_btn = document.querySelector('#next-btn');

let questionIndex = 0;
let score = 0;

function startQuiz(){
    questionIndex = 0;
    score = 0;
    next_btn.innerHTML = "Next"
    showQuestion();
};

function showQuestion(){
    resetState();
    let currentQuestion = questions_answers[questionIndex];
    let questionNo = questionIndex + 1;
    questions.innerHTML = `${questionNo}. ${currentQuestion.question}`

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('choices');
        answer_options.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer);
    })
}

function resetState(){
    next_btn.style.display = "none";
    while(answer_options.firstChild){
        answer_options.removeChild(answer_options.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct-ans");
        score++;
    } else {
        selectedBtn.classList.add('wrong-ans');
    }
    Array.from(answer_options.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct-ans")
        } 
        button.disabled = true;
    });
    next_btn.style.display = "block";
}

function showScore(){
    resetState();
    questions.innerHTML = `You got ${score} out of ${questions_answers.length} correct!`;
    next_btn.innerHTML = "Play Again";
    next_btn.style.display = "block";
}

function handleNextButton(){
    questionIndex++;
    if(questionIndex < questions_answers.length){
        showQuestion();
    } else{
        showScore();
    }
}

next_btn.addEventListener('click', () => {
    if(questionIndex < questions_answers.length){
        handleNextButton();
    } else {
        startQuiz();
    }
})

startQuiz();