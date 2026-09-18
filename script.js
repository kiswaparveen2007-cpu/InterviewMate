/* ==========================================
   LOGIN
========================================== */

function login() {

    let name = document.getElementById("username").value;
    let email = document.getElementById("email").value;

    if (name === "" || email === "") {

        alert("Please enter your name and email.");

        return;
    }

    document.getElementById("studentName").innerText = name;

    document.getElementById("loginPage").style.display = "none";

    document.getElementById("dashboard").style.display = "block";
}


function logout() {

    document.getElementById("dashboard").style.display = "none";

    document.getElementById("loginPage").style.display = "flex";
}


/* ==========================================
   DASHBOARD
========================================== */

function backToDashboard() {

    document.getElementById("resultPage").style.display = "none";

    document.getElementById("dashboard").style.display = "block";
}


/* ==========================================
   AI APTITUDE
========================================== */

let aptitudeQuestions = [

    {
        question: "What is 20% of 150?",

        options: [
            "20",
            "25",
            "30",
            "35"
        ],

        answer: "30",

        explanation:
        "20% of 150 = (20/100) × 150 = 30."
    },


    {
        question:
        "Find the next number: 2, 4, 8, 16, ?",

        options: [
            "20",
            "24",
            "32",
            "36"
        ],

        answer: "32",

        explanation:
        "Each number is multiplied by 2. Therefore, 16 × 2 = 32."
    },


    {
        question:
        "If a train travels 120 km in 2 hours, what is its speed?",

        options: [
            "40 km/h",
            "50 km/h",
            "60 km/h",
            "80 km/h"
        ],

        answer: "60 km/h",

        explanation:
        "Speed = Distance / Time = 120 / 2 = 60 km/h."
    },


    {
        question:
        "Which word is opposite in meaning to 'Ancient'?",

        options: [
            "Old",
            "Historic",
            "Modern",
            "Past"
        ],

        answer: "Modern",

        explanation:
        "Modern means relating to the present or recent times."
    },


    {
        question:
        "If 5 × 6 = 30, what is 30 ÷ 5?",

        options: [
            "4",
            "5",
            "6",
            "7"
        ],

        answer: "6",

        explanation:
        "30 divided by 5 equals 6."
    }

];


let aptitudeCurrent = 0;

let aptitudeScore = 0;

let selectedAptitudeAnswer = null;


function startAIAptitude() {

    document.getElementById("dashboard").style.display = "none";

    document.getElementById("aptitudePage").style.display = "block";

    aptitudeCurrent = 0;

    aptitudeScore = 0;

    showAptitudeQuestion();
}


function showAptitudeQuestion() {

    let q = aptitudeQuestions[aptitudeCurrent];

    document.getElementById("aptitudeNumber").innerText =
        aptitudeCurrent + 1;

    document.getElementById("aptitudeQuestion").innerText =
        q.question;

    document.getElementById("difficulty").innerText =
        aptitudeCurrent < 2 ? "Easy" :
        aptitudeCurrent < 4 ? "Medium" :
        "Hard";


    let optionsHTML = "";

    q.options.forEach((option) => {

        optionsHTML += `
            <div
                class="aptitude-option"
                onclick="selectAptitudeOption(this, '${option}')">

                ${option}

            </div>
        `;

    });


    document.getElementById("aptitudeOptions").innerHTML =
        optionsHTML;


    document.getElementById("aptitudeFeedback").style.display =
        "none";


    selectedAptitudeAnswer = null;


    let progress =
        ((aptitudeCurrent + 1) /
        aptitudeQuestions.length) * 100;

    document.getElementById("aptitudeProgress").style.width =
        progress + "%";
}


function selectAptitudeOption(element, answer) {

    document.querySelectorAll(".aptitude-option")
        .forEach(option => {

            option.classList.remove("selected");

        });


    element.classList.add("selected");

    selectedAptitudeAnswer = answer;
}


function submitAptitudeAnswer() {

    if (selectedAptitudeAnswer === null) {

        alert("Please select an answer.");

        return;
    }


    let q = aptitudeQuestions[aptitudeCurrent];

    let feedback =
        document.getElementById("aptitudeFeedback");


    if (selectedAptitudeAnswer === q.answer) {

        aptitudeScore++;

        feedback.innerHTML =
            "✅ <strong>Correct!</strong><br>" +
            q.explanation;

    } else {

        feedback.innerHTML =
            "❌ <strong>Incorrect.</strong><br>" +
            "Correct Answer: <strong>" +
            q.answer +
            "</strong><br>" +
            q.explanation;
    }


    feedback.style.display = "block";


    setTimeout(() => {

        aptitudeCurrent++;

        if (aptitudeCurrent <
            aptitudeQuestions.length) {

            showAptitudeQuestion();

        } else {

            finishAptitude();

        }

    }, 1800);

}


function finishAptitude() {

    document.getElementById("aptitudePage").style.display =
        "none";

    document.getElementById("resultPage").style.display =
        "flex";


    let percentage =
        Math.round(
            (aptitudeScore /
            aptitudeQuestions.length) * 100
        );


    document.getElementById("score").innerText =
        percentage + "%";


    document.getElementById("resultMessage").innerText =
        "You scored " +
        aptitudeScore +
        " out of " +
        aptitudeQuestions.length +
        ". Keep practicing to improve your performance.";
}


function exitAptitude() {

    document.getElementById("aptitudePage").style.display =
        "none";

    document.getElementById("dashboard").style.display =
        "block";
}


/* ==========================================
   AI CODING
========================================== */

let codingProblems = [

    {
        title:
        "Find the Largest Number",

        description:
        "Write a Python program to find the largest number from a list of numbers.",

        example:
        "Input: [10, 25, 7, 40]\nOutput: 40",

        difficulty: "Easy",

        expectedKeywords: [
            "max"
        ]
    },


    {
        title:
        "Check Even or Odd",

        description:
        "Write a Python program to check whether a given number is even or odd.",

        example:
        "Input: 8\nOutput: Even",

        difficulty: "Easy",

        expectedKeywords: [
            "%",
            "even"
        ]
    },


    {
        title:
        "Reverse a String",

        description:
        "Write a Python program to reverse a given string.",

        example:
        "Input: hello\nOutput: olleh",

        difficulty: "Medium",

        expectedKeywords: [
            "[::-1]"
        ]
    }

];


let codingCurrent = 0;


function startAICoding() {

    document.getElementById("dashboard").style.display =
        "none";

    document.getElementById("codingPage").style.display =
        "block";

    codingCurrent = 0;

    showCodingProblem();
}


function showCodingProblem() {

    let problem =
        codingProblems[codingCurrent];


    document.getElementById("codingNumber").innerText =
        codingCurrent + 1;


    document.getElementById("codingDifficulty").innerText =
        problem.difficulty;


    document.getElementById("codingTitle").innerText =
        problem.title;


    document.getElementById("codingDescription").innerText =
        problem.description;


    document.getElementById("codingExample").innerText =
        problem.example;


    document.getElementById("codeEditor").value = "";


    document.getElementById("codingFeedback").style.display =
        "none";
}


function submitCoding() {

    let code =
        document.getElementById("codeEditor")
        .value
        .trim();


    if (code === "") {

        alert("Please write your code first.");

        return;
    }


    let problem =
        codingProblems[codingCurrent];


    let feedback =
        document.getElementById("codingFeedback");


    let codeLower =
        code.toLowerCase();


    let matched = false;


    for (let keyword of problem.expectedKeywords) {

        if (codeLower.includes(
            keyword.toLowerCase()
        )) {

            matched = true;

            break;
        }
    }


    if (matched) {

        feedback.innerHTML =
            "✅ <strong>Good solution!</strong><br>" +
            "The AI Coding Agent detected a valid approach. " +
            "Your code can now be evaluated more deeply by the Python backend.";

    } else {

        feedback.innerHTML =
            "💡 <strong>Try again.</strong><br>" +
            "The AI Coding Agent suggests checking your logic and solution approach.";

    }


    feedback.style.display = "block";


    setTimeout(() => {

        codingCurrent++;

        if (codingCurrent <
            codingProblems.length) {

            showCodingProblem();

        } else {

            document.getElementById("codingPage").style.display =
                "none";

            document.getElementById("resultPage").style.display =
                "flex";

            document.getElementById("score").innerText =
                "Completed";

            document.getElementById("resultMessage").innerText =
                "You have completed the AI Coding Assessment.";

        }

    }, 2200);

}


function exitCoding() {

    document.getElementById("codingPage").style.display =
        "none";

    document.getElementById("dashboard").style.display =
        "block";
}


/* ==========================================
   AI HR INTERVIEW
========================================== */

let aiQuestions = [

    "Tell me about yourself.",

    "What are your strengths and weaknesses?",

    "Why should we hire you?",

    "Where do you see yourself in five years?",

    "Tell me about a challenge you faced and how you handled it."

];


let aiCurrentQuestion = 1;


function startAIInterview() {

    document.getElementById("dashboard").style.display =
        "none";

    document.getElementById("aiPage").style.display =
        "block";


    aiCurrentQuestion = 1;


    document.getElementById("chatBox").innerHTML = `

        <div class="message bot-message">

            <strong>🤖 AI Interviewer</strong>

            <p>
                Hello! Let's begin your interview.
                Tell me about yourself.
            </p>

        </div>

    `;


    document.getElementById("aiQuestionNumber").innerText =
        "1";


    document.getElementById("userAnswer").value = "";

}


function submitAIAnswer() {

    let answer =
        document.getElementById("userAnswer")
        .value
        .trim();


    if (answer === "") {

        alert("Please enter your answer.");

        return;
    }


    let chatBox =
        document.getElementById("chatBox");


    let userMessage =
        document.createElement("div");


    userMessage.className =
        "message user-message";


    userMessage.innerHTML = `

        <strong>👤 You</strong>

        <p>${answer}</p>

    `;


    chatBox.appendChild(userMessage);


    document.getElementById("userAnswer").value =
        "";


    aiCurrentQuestion++;


    if (aiCurrentQuestion <= 5) {

        setTimeout(() => {

            let botMessage =
                document.createElement("div");


            botMessage.className =
                "message bot-message";


            botMessage.innerHTML = `

                <strong>🤖 AI Interviewer</strong>

                <p>
                    ${aiQuestions[
                        aiCurrentQuestion - 1
                    ]}
                </p>

            `;


            chatBox.appendChild(botMessage);


            document.getElementById(
                "aiQuestionNumber"
            ).innerText =
                aiCurrentQuestion;


            chatBox.scrollTop =
                chatBox.scrollHeight;

        }, 700);

    } else {

        setTimeout(() => {

            let botMessage =
                document.createElement("div");


            botMessage.className =
                "message bot-message";


            botMessage.innerHTML = `

                <strong>🤖 AI Interviewer</strong>

                <p>
                    🎉 Thank you for completing
                    the interview!
                    Your responses have been recorded.
                </p>

            `;


            chatBox.appendChild(botMessage);

            chatBox.scrollTop =
                chatBox.scrollHeight;

        }, 700);

    }

}


function exitAIInterview() {

    document.getElementById("aiPage").style.display =
        "none";

    document.getElementById("dashboard").style.display =
        "block";

}