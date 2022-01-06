var questions = [
  {
    text: "What is JJ's big brother's name?",
    choices: ["Cody", "TomTom", "RJ", "YoYo"],
    answer: "TomTom",
  },
  {
    text: "What hand me down toy does JJ receive from TomTom?",
    choices: ["Train", "Ball", "Star Plush", "Teddy Bear"],
    answer: "Star Plush",
  },
  {
    text: "Who is JJ's teacher?",
    choices: ["Ms Nina", "Ms Cherrytart", "Ms Applebees", "Ms Appleberry"],
    answer: "Ms Appleberry",
  },
  {
    text: "Which child is obsessed with dinosaurs?",
    choices: ["Cody", "Nora", "JJ", "Emma"],
    answer: "Cody",
  },
  {
    text: "Why do toddlers love CoCoMelon?",
    choices: [
      "Witchcraft",
      "Endorphins",
      "Bright colors and repetition",
      "All of the above",
    ],
    answer: "All of the above",
  },
];

var TIME_PER_QUESTION = 5;
var quizQuestionsIndex = 0;
var timerId;
var timeCount = questions.length * TIME_PER_QUESTION;

// HTML elements
var startScreenEl = document.getElementById("start-screen");
var startBtn = document.getElementById("start");
var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var questionTextEl = document.getElementById("question-text");
// choices element
var choicesEl = document.getElementById("choices");
// feedback element
var feedbackEl = document.getElementById("feedback");
// end screen element
var endScreenEl = document.getElementById("end-screen");
// final score element
var finalScoreEl = document.getElementById("final-score");
// initials Input Element
var initialsInputEl = document.getElementById("initials");
// initials Submit Btn
var initialsSubmitBtn = document.getElementById("submit");

function startQuiz() {
  startScreenEl.setAttribute("class", "hide");
  questionsEl.setAttribute("class", "show");
  timerId = setInterval(handleTicks, 1000);

  askQuestions();
}

function askQuestions() {
  var currentQuestionObj = questions[quizQuestionsIndex];
  console.log(currentQuestionObj);
  var questionText = currentQuestionObj.text;

  questionTextEl.textContent = questionText;
  choicesEl.innerHTML = "";
  choicesEl.textContent = "";
  var choicesArr = currentQuestionObj.choices;
  for (var i = 0; i < choicesArr.length; i++) {
    var liEl = document.createElement("li");
    console.log(choicesArr[i]);
    liEl.setAttribute("value", choicesArr[i]);
    liEl.textContent = i + 1 + ". " + choicesArr[i];

    choicesEl.appendChild(liEl);
  }
}

function quizEnd() {
  console.log("quizEnd");

  clearInterval(timerId);

  questionsEl.setAttribute("class", "hide");

  finalScoreEl.textContent = timeCount;

  endScreenEl.setAttribute("class", "show");

  return;
}

function handleTicks() {
  timeCount--;
  timerEl.textContent = timeCount;
  if (!timeCount) {
    console.log("Time is up");
    clearInterval(timerId);
    quizEnd();
  }
}

function handleChoices(event) {
  console.log("handleChoices");
  var choiceValue = event.target.getAttribute("value");
  console.log(choiceValue);
  if (choiceValue === questions[quizQuestionsIndex].answer) {
    feedbackEl.textContent = "Correct!";
  } else {
    timeCount -= TIME_PER_QUESTION;
    if (timeCount < 0) {
      timeCount = 0;
    }
    timerEl.textContent = timeCount;
    feedbackEl.textContent = "Wrong!";
  }

  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function () {
    feedbackEl.setAttribute("class", "hide");
  }, 1500);

  quizQuestionsIndex++;
  if (quizQuestionsIndex === questions.length) {
    quizEnd();
  } else {
    askQuestions();
  }
}

function saveScores() {
  var initialsValue = initialsInputEl.value.trim();
  // get localStorage item
  var scores = [];
  if (initialsValue) {
    scores = JSON.parse(localStorage.getItem("scores"));
    if (!scores) {
      scores = [];
    }

    var newScore = {
      score: timeCount,
      initials: initialsValue,
    };
    console.log(scores);
    scores.push(newScore);
    localStorage.setItem("scores", JSON.stringify(scores));
  }
  location.href = "./highscores.html";

  return;
}

function handleInitialsKeyup(event) {
  if (event.key === "Enter") {
    saveScores();
  }
  return;
}

function handleInitialsSubmit(event) {
  console.log("handleInitialsSubmit");

  saveScores();
}

startBtn.addEventListener("click", startQuiz);

choicesEl.onclick = handleChoices;
initialsInputEl.onkeyup = handleInitialsKeyup;
initialsSubmitBtn.addEventListener("click", handleInitialsSubmit);
