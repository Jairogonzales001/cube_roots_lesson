// State Management
let currentPhase = 1;
let totalPhases = 5;
let guidedExercisesDone = 0;
let independentScore = 0;
let independentAnswered = 0;

// Independent Practice Data
const independentProblems = [
    { equation: 'x³ = 8', answer: 2 },
    { equation: 'x³ = 125', answer: 5 },
    { equation: 'x³ = -27', answer: -3 },
    { equation: 'x³ = 1', answer: 1 },
    { equation: 'x³ = -64', answer: -4 },
    { equation: 'x³ = 0', answer: 0 },
    { equation: 'x³ = -1', answer: -1 },
    { equation: 'x³ = -125', answer: -5 },
    { equation: 'x³ = 216', answer: 6 },
    { equation: 'x³ = 1000', answer: 10 }
];

let studentAnswers = {};

// Phase Navigation
function updateProgress() {
    const progress = ((currentPhase - 1) / (totalPhases - 1)) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
    document.getElementById('progressText').textContent = Math.round(progress) + '%';

    document.querySelectorAll('.phase-dot').forEach((dot, index) => {
        dot.classList.remove('active', 'completed');
        if (index + 1 < currentPhase) {
            dot.classList.add('completed');
        } else if (index + 1 === currentPhase) {
            dot.classList.add('active');
        }
    });
}

function showPhase(phase) {
    document.querySelectorAll('.content-card').forEach(card => {
        card.classList.remove('active');
    });
    document.getElementById('phase' + phase).classList.add('active');
    currentPhase = phase;
    updateProgress();
}

function nextPhase() {
    if (currentPhase < totalPhases) {
        showPhase(currentPhase + 1);
    }
}

function prevPhase() {
    if (currentPhase > 1) {
        showPhase(currentPhase - 1);
    }
}

// Exercise 1 Functions
function checkStep1Ex1() {
    const select = document.getElementById('ex1-select1');
    const result = document.getElementById('ex1-result1');

    if (select.value === 'cube root') {
        result.className = 'result-badge correct';
        result.textContent = '✓ Correct!';
        document.getElementById('ex1-step1').classList.remove('active');
        document.getElementById('ex1-step1').classList.add('completed');
        document.getElementById('ex1-step2').classList.add('visible', 'active');
    } else {
        result.className = 'result-badge incorrect';
        result.textContent = '✗ Try again!';
    }
}

function checkStep2Ex1() {
    const input = document.getElementById('ex1-answer');
    const result = document.getElementById('ex1-result2');

    if (parseInt(input.value) === 3) {
        result.className = 'result-badge correct';
        result.textContent = '✓ Correct! 3³ = 27';
        document.getElementById('ex1-step2').classList.remove('active');
        document.getElementById('ex1-step2').classList.add('completed');
        document.getElementById('ex1-step3').classList.add('visible', 'active');
    } else {
        result.className = 'result-badge incorrect';
        result.textContent = '✗ Try again!';
    }
}

// Exercise 2 Functions
function checkStep1Ex2() {
    const select = document.getElementById('ex2-select1');
    const result = document.getElementById('ex2-result1');

    if (select.value === 'yes') {
        result.className = 'result-badge correct';
        result.textContent = '✓ Correct!';
        document.getElementById('ex2-step1').classList.remove('active');
        document.getElementById('ex2-step1').classList.add('completed');
        document.getElementById('ex2-step2').classList.add('visible', 'active');
    } else {
        result.className = 'result-badge incorrect';
        result.textContent = '✗ Try again!';
    }
}

function checkStep2Ex2() {
    const input = document.getElementById('ex2-answer');
    const result = document.getElementById('ex2-result2');

    if (parseInt(input.value) === -2) {
        result.className = 'result-badge correct';
        result.textContent = '✓ Correct! (-2)³ = -8';
        document.getElementById('ex2-step2').classList.remove('active');
        document.getElementById('ex2-step2').classList.add('completed');
        document.getElementById('ex2-step3').classList.add('visible', 'active');
    } else {
        result.className = 'result-badge incorrect';
        result.textContent = '✗ Try again! (hint: it\'s negative)';
    }
}

// Exercise 3 Functions
function checkStep1Ex3() {
    const select = document.getElementById('ex3-select1');
    const result = document.getElementById('ex3-result1');

    if (select.value === '1') {
        result.className = 'result-badge correct';
        result.textContent = '✓ Correct!';
        document.getElementById('ex3-step1').classList.remove('active');
        document.getElementById('ex3-step1').classList.add('completed');
        document.getElementById('ex3-step2').classList.add('visible', 'active');
    } else {
        result.className = 'result-badge incorrect';
        result.textContent = '✗ Try again!';
    }
}

function checkStep2Ex3() {
    const input = document.getElementById('ex3-answer');
    const result = document.getElementById('ex3-result2');

    if (parseInt(input.value) === 4) {
        result.className = 'result-badge correct';
        result.textContent = '✓ Correct! 4³ = 64';
        document.getElementById('ex3-step2').classList.remove('active');
        document.getElementById('ex3-step2').classList.add('completed');
        document.getElementById('ex3-step3').classList.add('visible', 'active');
    } else {
        result.className = 'result-badge incorrect';
        result.textContent = '✗ Try again!';
    }
}

// Complete Exercise
function completeExercise(exerciseNum) {
    guidedExercisesDone++;

    if (exerciseNum < 3) {
        document.getElementById('exercise' + exerciseNum).style.display = 'none';
        document.getElementById('exercise' + (exerciseNum + 1)).style.display = 'block';
    }

    if (guidedExercisesDone >= 3) {
        document.getElementById('phase3Next').disabled = false;
    }
}

// Independent Practice
function checkIndependent(problem, correctAnswer) {
    const input = document.getElementById(`ind${problem}-input`);
    const resultEl = document.getElementById(`ind${problem}-result`);
    const btn = input.parentElement.querySelector('.quick-btn');

    if (resultEl.textContent !== '') return;

    const userAnswer = parseInt(input.value);
    const isCorrect = userAnswer === correctAnswer;

    studentAnswers[problem] = {
        userAnswer: userAnswer,
        correctAnswer: correctAnswer,
        isCorrect: isCorrect
    };

    input.disabled = true;
    btn.disabled = true;

    if (isCorrect) {
        input.classList.add('correct');
        resultEl.textContent = '✅';
        independentScore++;
    } else {
        input.classList.add('incorrect');
        resultEl.textContent = '❌ (' + correctAnswer + ')';
    }

    independentAnswered++;
    document.getElementById('independentScore').textContent = independentScore;

    if (independentAnswered >= 10) {
        document.getElementById('finalScore').style.display = 'block';
        document.getElementById('finalScoreNumber').textContent = independentScore + '/10';
        document.getElementById('phase4Next').disabled = false;
        document.getElementById('overallScore').textContent = (3 + independentScore) + '/13';
    }
}

// Print Worksheet
function printWorksheet() {
    document.body.classList.add('printing-worksheet');
    window.print();
    document.body.classList.remove('printing-worksheet');
}

// Print Results
function printResults() {
    const resultsContainer = document.getElementById('printIndependentResults');
    let resultsHTML = '';

    for (let i = 1; i <= 10; i++) {
        const problem = independentProblems[i - 1];
        const answer = studentAnswers[i];
        const isCorrect = answer ? answer.isCorrect : false;
        const userAns = answer ? answer.userAnswer : 'N/A';
        const correctAns = answer ? answer.correctAnswer : problem.answer;

        resultsHTML += `
            <div class="result-item ${isCorrect ? 'correct' : 'incorrect'}">
                <span>${i}. ${problem.equation}</span>
                <span>x = ${userAns} ${isCorrect ? '✓' : '✗ (Answer: ' + correctAns + ')'}</span>
            </div>
        `;
    }

    resultsContainer.innerHTML = resultsHTML;

    const totalCorrect = 3 + independentScore;
    const percentage = Math.round((totalCorrect / 13) * 100);
    document.getElementById('printFinalScore').textContent = totalCorrect + '/13';
    document.getElementById('printPercentage').textContent = percentage + '%';

    window.print();
}

// Restart Lesson
function restartLesson() {
    currentPhase = 1;
    guidedExercisesDone = 0;
    independentScore = 0;
    independentAnswered = 0;
    studentAnswers = {};

    // Reset Exercise 1
    document.getElementById('exercise1').style.display = 'block';
    document.getElementById('exercise2').style.display = 'none';
    document.getElementById('exercise3').style.display = 'none';

    // Reset all steps
    for (let ex = 1; ex <= 3; ex++) {
        for (let step = 1; step <= 3; step++) {
            const stepEl = document.getElementById(`ex${ex}-step${step}`);
            if (stepEl) {
                stepEl.classList.remove('completed', 'visible', 'active');
                if (step === 1) {
                    stepEl.classList.add('visible', 'active');
                }
            }
        }
    }

    // Reset selects and inputs
    document.getElementById('ex1-select1').value = '';
    document.getElementById('ex2-select1').value = '';
    document.getElementById('ex3-select1').value = '';
    document.getElementById('ex1-answer').value = '';
    document.getElementById('ex2-answer').value = '';
    document.getElementById('ex3-answer').value = '';

    // Reset result badges
    for (let ex = 1; ex <= 3; ex++) {
        for (let r = 1; r <= 2; r++) {
            const resultEl = document.getElementById(`ex${ex}-result${r}`);
            if (resultEl) {
                resultEl.className = 'result-badge';
                resultEl.textContent = '';
            }
        }
    }

    // Reset independent practice
    for (let i = 1; i <= 10; i++) {
        const input = document.getElementById(`ind${i}-input`);
        const resultEl = document.getElementById(`ind${i}-result`);
        const btn = document.querySelector(`#ind${i} .quick-btn`);

        input.value = '';
        input.disabled = false;
        input.classList.remove('correct', 'incorrect');
        resultEl.textContent = '';
        btn.disabled = false;
    }

    document.getElementById('independentScore').textContent = '0';
    document.getElementById('finalScore').style.display = 'none';
    document.getElementById('phase3Next').disabled = true;
    document.getElementById('phase4Next').disabled = true;

    showPhase(1);
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    updateProgress();

    // Phase dot click navigation
    document.querySelectorAll('.phase-dot').forEach(dot => {
        dot.addEventListener('click', () => {
            const phase = parseInt(dot.dataset.phase);
            if (phase <= currentPhase || dot.classList.contains('completed')) {
                showPhase(phase);
            }
        });
    });
});
