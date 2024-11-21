// Selectors
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const next_btn = document.querySelector(".next_btn");
const timer_sec = document.querySelector(".timer_sec");
const total_que = document.querySelector(".total_que span p:first-child"); // Current question number
const total_que_count = document.querySelector(".total_que span p:last-child"); // Total question count

// Variables
let current_question = 0;
let timer;
let timeLeft = 15;

// Start Quiz Button
start_btn.onclick = () => {
    info_box.classList.add("activeInfo"); // Show info box
};

// Restart Quiz Button in Info Box
document.querySelector(".restart").onclick = () => {
    info_box.classList.remove("activeInfo");
    quiz_box.classList.add("activeQuiz");
    current_question = 0; // Reset question index
    updateQuestionCounter(current_question + 1); // Update counter
    showQuestion(current_question);
    startTimer(timeLeft);
};

// Timer Function
function startTimer(time) {
    clearInterval(timer); // Clear any existing timer
    timer = setInterval(() => {
        time--;
        timer_sec.textContent = time;
        if (time <= 0) {
            clearInterval(timer);
            next_btn.click(); // Automatically proceed to the next question
        }
    }, 1000);
}

// Show a Question
function showQuestion(index) {
    const question_text = document.querySelector(".que_text");
    question_text.innerHTML = `<span>${questions[index].numb}. ${questions[index].question}</span>`;
    
    let options = '';
    questions[index].options.forEach(option => {
        options += `<div class="option">${option}</div>`;
    });
    option_list.innerHTML = options;

    const allOptions = option_list.querySelectorAll(".option");
    allOptions.forEach(option => {
        option.onclick = () => {
            // Remove styling from all options
            allOptions.forEach(o => o.classList.remove("correct", "selected"));
            
            // Highlight the selected option with the 'correct' style
            option.classList.add("correct");
            
            // Show the "Next" button
            next_btn.classList.add("show");
        };
    });

    next_btn.classList.remove("show"); // Hide "Next" button initially
    timeLeft = 15;
    startTimer(timeLeft); // Start timer for the new question
}

// Next Button Functionality
next_btn.onclick = () => {
    if (current_question < questions.length - 1) {
        current_question++;
        updateQuestionCounter(current_question + 1); // Update counter
        showQuestion(current_question);
    } else {
        clearInterval(timer); // Stop timer when quiz ends
        showResult();
    }
};

// Update the Question Counter
function updateQuestionCounter(current) {
    total_que.textContent = current; // Update current question number
    total_que_count.textContent = questions.length; // Update total question count
}

// Display Results (Surprise Message)
function showResult() {
    quiz_box.classList.remove("activeQuiz");
    result_box.classList.add("activeResult");
    result_box.innerHTML = `
        <div class="final-message">
            <h3>Do you want to be my girlfriend? ❤️</h3>
            <img src="path-to-picture1.jpg" alt="Picture 1">
            <img src="path-to-picture2.jpg" alt="Picture 2">
        </div>
    `;
}
// Show Loading Screen and Suspense Sequence
function showLoadingAndSuspense() {
    // Hide the quiz box
    quiz_box.classList.remove("activeQuiz");

    // Show loading screen
    result_box.classList.add("activeResult");
    result_box.innerHTML = `<div class="loading">Estamos analizando tus respuestas...</div>`;

    // Wait for a few seconds, then start the suspense sequence
    setTimeout(() => {
        showSuspenseSequence();
    }, 3000); // 3-second delay
}

// Show Suspense Sequence
function showSuspenseSequence() {
    const messages = [
        "Sofia Garces", 
        "Pero todavía hay algo muy importante...", 
        "Que tienes que responder..."
    ];

    let delay = 0;
    result_box.innerHTML = ""; // Clear result box

    messages.forEach((message, index) => {
        setTimeout(() => {
            const div = document.createElement("div");
            div.classList.add("suspense");
            div.textContent = message;
            result_box.appendChild(div);
        }, delay);
        delay += 1500; // 1.5-second delay between messages
    });

    // Show the final surprise after the suspense sequence
    setTimeout(() => {
        showFinalSurprise();
    }, delay + 1000); // Add an extra second before the final reveal
}

// Show Final Surprise
function showFinalSurprise() {
    result_box.innerHTML = `
        <div class="final-message">
            <h3>¿Quieres ser mi novia? ❤️</h3>
            <img src="../imagen1.jpeg" alt="Picture 1">
            <img src="../imagen2.jpeg" alt="Picture 2">
        </div>
    `;
}

// Adjusted showResult to include the suspense
function showResult() {
    showLoadingAndSuspense();
}