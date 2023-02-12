const quizData = [
    {
        question: "1 Who is the President of US?",
        a: "Florin Pop",
        b: "Robert D Junior",
        c: "Ivan Saldano",
        d: "Donald Trumph",
        correct: "d",
    },
    {

        question: "2 Who is president of india?",
        a: "Atal Bihari",
        b: "Narendra Modi",
        c: "Ramnath Kvoind",
        d: "Arnab Goswami",
        correct: "c",
    },
    {
        question: "3 How many shnkaracharya's are there?",
        a: "2",
        b: "4",
        c: "6",
        d: "none of the above",
        correct: "b",
    },
    {
        question: "4 When did india got free?",
        a: "1942",
        b: "1949",
        c: "1999",
        d: "1947",
        correct: "d",
    },

    {
        question: "5 How many Avatar's of lord Vishu are there?",
        a: "5",
        b: "6",
        c: "10",
        d: "20",
        correct: "c",

    },
    {
        question: "6 The last avatar of Vishnu is yet to come. What is its name? ",
        a: "Lord buddha",
        b: "kali",
        c: "kalki",
        d: "None of the above",
        correct: "c",

    }

];


let dis = document.getElementById('err');
let quiz = document.getElementById('quiz');

const answersEls = document.querySelectorAll('.answer');
const questionEl = document.getElementById('question');

const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');


const btn = document.getElementById('sub');

let currentQuiz = 0;
let score = 0;


loadQuiz();

function loadQuiz() {

    deselect();
    const cuurentQuiData = quizData[currentQuiz];
    questionEl.innerText = cuurentQuiData.question;
    a_text.innerText = cuurentQuiData.a;
    b_text.innerText = cuurentQuiData.b;
    c_text.innerText = cuurentQuiData.c;
    d_text.innerText = cuurentQuiData.d;

}

function getSelected() {

    console.log('I am stil inside getSelected');
    let answer = undefined;

    answersEls.forEach((answerEl) => {

        if (answerEl.checked) {
            answer = answerEl.id;
        }
    });

    if (answer == undefined) {

        dis.style.display = "block";
        setTimeout(turnOff, 1200)
    }
    return answer;

}

function deselect() {
    answersEls.forEach((answerEl) => {

        answerEl.checked = false;

    });
}

function turnOff() {
    dis.style.display = 'none';

}



btn.addEventListener('click', () => {
    const answer = getSelected();

    if (answer) {

        console.log(' Hey hey I got inside the if')

        if (answer === quizData[currentQuiz].correct) {
            score++;
        }

        currentQuiz++;
        if (currentQuiz < quizData.length) {

            loadQuiz();
        }
        else {
            quiz.innerHTML = `<br><br><br><h4>&nbsp &nbsp  Well Done..</h4>&nbsp &nbsp &nbsp Your score is ${score} / ${quizData.length} .<br><br>&nbsp &nbsp &nbsp Thank you.. <br><br><br><br><br>`;
            
        }

    }


})