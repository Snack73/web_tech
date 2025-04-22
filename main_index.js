// your code goes here
// script.js - Quiz Logic and Interactivity

// --- Quiz Questions Data ---
// Replace these with your college's actual history/course questions
const questions = [
    {
        question: "In what year was Harvard Law School founded?",
        options: ["1776", "1817", "1865", "1900"],
        answer: "1817",
        explanation: "Harvard Law School was founded in 1817, making it the oldest continuously operating law school in the United States."
    },
    {
        question: "What is the famous teaching method most closely associated with Harvard Law School?",
        options: ["Lecture Method", "Socratic Method", "Case Method", "Problem-Based Learning"],
        answer: "Case Method",
        explanation: "The Case Method, which uses appellate court cases to illustrate legal principles, was pioneered and popularized at HLS."
    },
    {
        question: "Which U.S. President is a graduate of Harvard Law School?",
        options: ["John F. Kennedy", "Richard Nixon", "Barack Obama", "Bill Clinton"],
        answer: "Barack Obama",
        explanation: "Barack Obama graduated from HLS in 1991, where he also served as the first African American president of the Harvard Law Review."
    },
    {
        question: "What is the name of Harvard Law School's primary library building?",
        options: ["Ames Hall", "Langdell Hall", "Griswold Hall", "Story Hall"],
        answer: "Langdell Hall",
        explanation: "Langdell Hall houses the Harvard Law School Library, one of the largest academic law libraries in the world."
    },
    {
        question: "Justice Ruth Bader Ginsburg, before transferring, attended Harvard Law School. How many women were in her HLS class when she enrolled?",
        options: ["Around 5", "Around 20", "Around 50", "Around 100"],
        answer: "Around 5",
        explanation: "When Ruth Bader Ginsburg enrolled in 1956, there were only 9 women in a class of over 500 students. (The question asks 'around 5' as an option close to the actual number)."
    },
    {
        question: "What is the name of the highly influential, student-run law journal based at HLS?",
        options: ["Yale Law Journal", "Stanford Law Review", "Columbia Law Review", "Harvard Law Review"],
        answer: "Harvard Law Review",
        explanation: "The Harvard Law Review is one of the most prestigious and widely cited law journals in the world."
    },
    {
        question: "What is the standard degree program for aspiring lawyers in the United States offered at HLS?",
        options: ["LL.M.", "S.J.D.", "J.D.", "Master of Law Studies"],
        answer: "J.D.",
        explanation: "The Juris Doctor (J.D.) is the primary professional degree program for those seeking to practice law in the U.S."
    },
     {
        question: "Which of these famous Supreme Court Justices is NOT an HLS alumnus?",
        options: ["Elena Kagan", "Stephen Breyer", "Clarence Thomas", "Antonin Scalia"],
        answer: "Clarence Thomas",
        explanation: "Justices Kagan, Breyer, and Scalia are all HLS alumni. Justice Clarence Thomas graduated from Yale Law School."
    },
    {
        question: "Harvard Law School is part of which larger university?",
        options: ["Stanford University", "Yale University", "Harvard University", "Massachusetts Institute of Technology (MIT)"],
        answer: "Harvard University",
        explanation: "Harvard Law School is one of the professional graduate schools within Harvard University, located in Cambridge, Massachusetts."
    },
    {
        question: "The Harvard Law School campus is located in which city?",
        options: ["Boston, MA", "New Haven, CT", "Palo Alto, CA", "Cambridge, MA"],
        answer: "Cambridge, MA",
        explanation: "While close to Boston, Harvard University (including the Law School) is primarily located in Cambridge, Massachusetts."
    }
];


// --- DOM Element References ---
const questionText = document.getElementById('question-text');
const optionsArea = document.getElementById('options-area');
const submitButton = document.getElementById('submit-answer');
const feedbackArea = document.getElementById('feedback-area');
const scoreArea = document.getElementById('score-area');
const finalScoreSpan = document.getElementById('final-score');
const totalQuestionsSpan = document.getElementById('total-questions');
const retakeQuizButton = document.getElementById('retake-quiz');
const progressBar = document.getElementById('progress-bar'); // Optional progress bar element


// --- Quiz State Variables ---
let currentQuestionIndex = 0;
let score = 0;
let selectedOptionElement = null; // Stores the button element the user clicked


// --- Quiz Logic Functions ---

// Loads and displays a question based on its index
function loadQuestion(index) {
    // Check if quiz is finished
    if (index >= questions.length) {
        endQuiz();
        return;
    }

    const currentQuestion = questions[index];

    // --- Reset UI for new question ---
    optionsArea.innerHTML = ''; // Clear previous options
    feedbackArea.textContent = ''; // Clear feedback text
    feedbackArea.className = 'feedback'; // Reset feedback classes (removes correct/incorrect)
    feedbackArea.style.visibility = 'hidden'; // Hide feedback area
    feedbackArea.style.opacity = 0; // Reset opacity for fade transition
    submitButton.disabled = true; // Disable submit until an option is selected
    selectedOptionElement = null; // Clear previously selected option

    // --- Display Question ---
    questionText.textContent = currentQuestion.question;
    // Trigger question text animation by resetting and reapplying it
    questionText.style.animation = 'none';
    void questionText.offsetWidth; // Trigger reflow (a trick to restart CSS animation)
    questionText.style.animation = 'fadeIn 0.7s ease-out'; // Apply animation


    // --- Display Options ---
    currentQuestion.options.forEach((option, i) => {
        const button = document.createElement('button');
        button.classList.add('option-btn');
        button.textContent = option;
        button.dataset.option = option; // Store the option text
        button.addEventListener('click', selectOption);
        optionsArea.appendChild(button);

        // Optional: Add animation delay for staggering effect
        // button.style.animationDelay = `${i * 0.05}s`; // Adjust delay time as needed
        // button.classList.add('animate-option'); // Add a class if needed for specific stagger animation in CSS
    });

    // --- Optional: Update progress bar ---
    updateProgressBar();
}

// Handles when a user clicks an option button
function selectOption(event) {
    // Remove 'selected' class from the previously selected option, if any
    if (selectedOptionElement) {
        selectedOptionElement.classList.remove('selected');
    }

    // Set the newly selected option element and add the 'selected' class
    selectedOptionElement = event.target;
    selectedOptionElement.classList.add('selected');

    // Enable the submit button
    submitButton.disabled = false;
}

// Handles when the user clicks the submit button
function submitAnswer() {
    // Check if an option has been selected (redundant if button is disabled, but safe)
    if (!selectedOptionElement) {
        alert("Please select an option before submitting.");
        return;
    }

    const selectedAnswer = selectedOptionElement.dataset.option;
    const correctAnswer = questions[currentQuestionIndex].answer;
    const explanation = questions[currentQuestionIndex].explanation;

    // --- Disable all options and submit button after submission ---
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.disabled = true;
        // Add a class to non-correct disabled buttons for distinct styling if needed
        if (btn !== selectedOptionElement || selectedAnswer !== correctAnswer) {
             btn.classList.add('disabled-after-submit');
        }
    });
    submitButton.disabled = true;

    // --- Provide Feedback ---
    feedbackArea.style.visibility = 'visible'; // Make feedback visible
    feedbackArea.style.opacity = 1; // Fade in feedback

    if (selectedAnswer === correctAnswer) {
        score++; // Increment score if correct
        feedbackArea.textContent = "Correct!";
        feedbackArea.classList.add('correct'); // Add class for correct styling
        feedbackArea.classList.remove('incorrect');
        // Add indicator class to the selected (correct) answer
        selectedOptionElement.classList.add('correct-answer-indicator');
         selectedOptionElement.classList.remove('disabled-after-submit'); // Remove incorrect style if it was applied initially by mistake
    } else {
        feedbackArea.textContent = "Incorrect.";
        feedbackArea.classList.add('incorrect'); // Add class for incorrect styling
        feedbackArea.classList.remove('correct');
        // Add indicator class to the correct answer (even if user selected differently)
        document.querySelectorAll('.option-btn').forEach(btn => {
             if (btn.dataset.option === correctAnswer) {
                 btn.classList.add('correct-answer-indicator'); // Highlight the correct one
                 btn.classList.remove('disabled-after-submit'); // Ensure it looks correct, not just disabled
             }
        });
         // Ensure the actually selected (wrong) option gets the incorrect styling
         if(selectedOptionElement.dataset.option !== correctAnswer) {
             selectedOptionElement.classList.add('disabled-after-submit');
         }
    }

    // Add explanation if available
    if (explanation) {
        const explanationSpan = document.createElement('span');
        explanationSpan.classList.add('explanation');
        explanationSpan.textContent = explanation;
        feedbackArea.appendChild(explanationSpan);
    }

    // --- Move to the next question ---
    // Use a timeout to give the user time to read the feedback and see animations
    setTimeout(() => {
        currentQuestionIndex++;
        loadQuestion(currentQuestionIndex); // Load the next question or end quiz
    }, 2500); // Adjust delay (milliseconds) as needed
}

// Ends the quiz and displays the final score
function endQuiz() {
    // Hide quiz elements
    questionText.style.display = 'none';
    optionsArea.style.display = 'none';
    submitButton.style.display = 'none';
    feedbackArea.style.display = 'none';
    progressBar.style.display = 'none'; // Hide progress bar

    // Show score area
    scoreArea.style.display = 'block';
    finalScoreSpan.textContent = score; // Display final score
    totalQuestionsSpan.textContent = questions.length; // Display total questions

    // Optional: Add animation to the score area when it appears
    scoreArea.style.animation = 'fadeIn 1s ease-out'; // Assuming you have a fadeIn animation in CSS
}

// Restarts the quiz from the beginning
function restartQuiz() {
    // Reset state variables
    currentQuestionIndex = 0;
    score = 0;
    selectedOptionElement = null;

    // Reset UI visibility
    questionText.style.display = 'block';
    optionsArea.style.display = 'grid'; // Or whatever display property you used initially
    submitButton.style.display = 'block';
    feedbackArea.style.display = 'block'; // Keep block but hidden by visibility/opacity
    scoreArea.style.display = 'none'; // Hide score area
    progressBar.style.display = 'block'; // Show progress bar

    // Load the first question to start over
    loadQuestion(currentQuestionIndex);
    updateProgressBar(); // Reset and update progress bar
}

// Optional: Updates the width of the progress bar
function updateProgressBar() {
    const progressPercent = (currentQuestionIndex / questions.length) * 100;
    progressBar.style.width = `${progressPercent}%`;
    // Update ARIA attributes for accessibility
    progressBar.setAttribute('aria-valuenow', currentQuestionIndex); // Current question index
    progressBar.setAttribute('aria-valuemax', questions.length); // Total questions
    // You could also add a visual percentage text inside the bar if desired
    // progressBar.textContent = `${Math.round(progressPercent)}%`;
}

// --- Event Listeners ---
submitButton.addEventListener('click', submitAnswer);
retakeQuizButton.addEventListener('click', restartQuiz);


// --- Initialization ---
// Start the quiz by loading the first question when the script loads
loadQuestion(currentQuestionIndex);
// Set the total number of questions displayed in the score area on initial load
totalQuestionsSpan.textContent = questions.length;
// Initial progress bar update (optional)
updateProgressBar();