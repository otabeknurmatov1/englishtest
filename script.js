//selecting all required elements
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector(".count_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");

// if startQuiz button clicked
start_btn.onclick = () => {
  info_box.classList.add("activeInfo"); //show info box
}

// if exitQuiz button clicked
exit_btn.onclick = () => {
  info_box.classList.remove("activeInfo"); //hide info box
}

// if continueQuiz button clicked
continue_btn.onclick = () => {
  info_box.classList.remove("activeInfo"); //hide info box
  quiz_box.classList.add("activeQuiz"); //show quiz box
  showQuetions(0); //calling showQestions function
  queCounter(1); //passing 1 parameter to queCounter
  startTimer(180); //calling startTimer function
  startTimerLine(0); //calling startTimerLine function
}

let timeValue = 180;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

// if restartQuiz button clicked
restart_quiz.onclick = () => {
  quiz_box.classList.add("activeQuiz"); //show quiz box
  result_box.classList.remove("activeResult"); //hide result box
  timeValue = 180;
  que_count = 0;
  que_numb = 1;
  userScore = 0;
  widthValue = 0;
  showQuetions(que_count); //calling showQestions function
  queCounter(que_numb); //passing que_numb value to queCounter
  clearInterval(counter); //clear counter
  clearInterval(counterLine); //clear counterLine
  startTimer(timeValue); //calling startTimer function
  startTimerLine(widthValue); //calling startTimerLine function
  timeText.textContent = "Time Left"; //change the text of timeText to Time Left
  next_btn.classList.remove("show"); //hide the next button
}

// if quitQuiz button clicked
quit_quiz.onclick = () => {
  window.location.reload(); //reload the current window
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

// if Next Que button clicked
next_btn.onclick = () => {
  if (que_count < questions.length - 1) { //if question count is less than total question length
    que_count++; //increment the que_count value
    que_numb++; //increment the que_numb value
    showQuetions(que_count); //calling showQestions function
    queCounter(que_numb); //passing que_numb value to queCounter
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    startTimer(timeValue); //calling startTimer function
    startTimerLine(widthValue); //calling startTimerLine function
    timeText.textContent = "Time Left"; //change the timeText to Time Left
    next_btn.classList.remove("show"); //hide the next button
  } else {
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    showResult(); //calling showResult function
  }
}

// getting questions and options from array
function showQuetions(index) {
  const que_text = document.querySelector(".que_text");

  //creating a new span and div tag for question and option and passing the value using array index
  let que_tag = '<span>' + questions[index].numb + ". " + questions[index].question + '</span>';
  let option_tag = '<div class="option"><span>' + questions[index].options[0] + '</span></div>' +
    '<div class="option"><span>' + questions[index].options[1] + '</span></div>' +
    '<div class="option"><span>' + questions[index].options[2] + '</span></div>' +
    '<div class="option"><span>' + questions[index].options[3] + '</span></div>';
  que_text.innerHTML = que_tag; //adding new span tag inside que_tag
  option_list.innerHTML = option_tag; //adding new div tag inside option_tag

  const option = option_list.querySelectorAll(".option");

  // set onclick attribute to all available options
  for (i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}
// creating the new div tags which for icons
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//if user clicked on option
function optionSelected(answer) {
  clearInterval(counter); //clear counter
  clearInterval(counterLine); //clear counterLine
  let userAns = answer.textContent; //getting user selected option
  let correcAns = questions[que_count].answer; //getting correct answer from array
  const allOptions = option_list.children.length; //getting all option items

  if (userAns == correcAns) { //if user selected option is equal to array's correct answer
    userScore += 1; //upgrading score value with 1
    answer.classList.add("correct"); //adding green color to correct selected option
    answer.insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to correct selected option
    console.log("Correct Answer");
    console.log("Your correct answers = " + userScore);
  } else {
    answer.classList.add("incorrect"); //adding red color to correct selected option
    answer.insertAdjacentHTML("beforeend", crossIconTag); //adding cross icon to correct selected option
    console.log("Wrong Answer");

    for (i = 0; i < allOptions; i++) {
      if (option_list.children[i].textContent == correcAns) { //if there is an option which is matched to an array answer 
        option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
        option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
        console.log("Auto selected correct answer.");
      }
    }
  }
  for (i = 0; i < allOptions; i++) {
    option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
  }
  next_btn.classList.add("show"); //show the next button if user selected any option
}

function showResult() {
  info_box.classList.remove("activeInfo"); //hide info box
  quiz_box.classList.remove("activeQuiz"); //hide quiz box
  result_box.classList.add("activeResult"); //show result box
  const scoreText = result_box.querySelector(".score_text");
  if (userScore == 25) {
    let scoreTag = '<span>WOW! 🎉 Natija : <p>' + userScore + '</p> ta togri javob.\nVa sizning darajangiz C1</span>';
    scoreText.innerHTML = scoreTag; 
  } else if (userScore >= 20 && userScore <=24) { 
    let scoreTag = '<span>😎 Natija : <p>' + userScore + '</p> ta.\nVa sizning darajangiz B2</span>';
    scoreText.innerHTML = scoreTag;
  }
  else if (userScore >= 15 && userScore <= 19) { 
    let scoreTag = '<span>😎 Natija : <p>' + userScore + '</p> ta.\nVa sizning darajangiz B1</span>';
    scoreText.innerHTML = scoreTag;
  }
  else if (userScore >= 10 && userScore <= 15) { 
    let scoreTag = '<span>😎 Natija : <p>' + userScore + '</p> ta.\nVa sizning darajangiz A2</span>';
    scoreText.innerHTML = scoreTag;
  } 
  else {
    let scoreTag = '<span>😐 Natija : <p>' + userScore + '</p> ta.\nVa sizning darajangiz A1</span>';
    scoreText.innerHTML = scoreTag;
  }
}

function startTimer(time) {
  counter = setInterval(timer, 1000);

  function timer() {
    timeCount.textContent = time; //changing the value of timeCount with time value
    time--; //decrement the time value
    if (time < 9) { //if timer is less than 9
      let addZero = timeCount.textContent;
      timeCount.textContent = "0" + addZero; //add a 0 before time value
    }
    if (time < 0) { //if timer is less than 0
      clearInterval(counter); //clear counter
      timeText.textContent = "Time Off"; //change the time text to time off
      const allOptions = option_list.children.length; //getting all option items
      let correcAns = questions[que_count].answer; //getting correct answer from array
      for (i = 0; i < allOptions; i++) {
        if (option_list.children[i].textContent == correcAns) { //if there is an option which is matched to an array answer
          option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
          option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
          console.log("Time Off: Auto selected correct answer.");
        }
      }
      for (i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
      }
      next_btn.classList.add("show"); //show the next button if user selected any option
    }
  }
}

function startTimerLine(time) {
  if (window.innerWidth > 768){
    alert("Iltimos testni diqqat bilan imkon bo'lsa hech narsaga qaramasdan ishlang!")
    counterLine = setInterval(timer, 33.3);
    function timer() {
      time += 0.1; //upgrading time value with 1
      time_line.style.width = time + "px"; //increasing width of time_line with px by time value
      if (time == 180) { //if time value is greater than 549
        clearInterval(counterLine); //clear counterLine
      }
    }
  } else if (window.innerWidth > 480) {
    alert("Iltimos testni diqqat bilan imkon bo'lsa hech narsaga qaramasdan ishlang!")
    counterLine = setInterval(timer, 430);
    function timer() {
      time += 1; //upgrading time value with 1
      time_line.style.width = time + "px"; //increasing width of time_line with px by time value
      if (time == 380) { //if time value is greater than 549
        clearInterval(counterLine); //clear counterLine
      }
    }
  } else {
    alert("Iltimos testni diqqat bilan imkon bo'lsa hech narsaga qaramasdan ishlang!")
    counterLine = setInterval(timer, 480);
    function timer() {
      time += 1; //upgrading time value with 1
      time_line.style.width = time + "px"; //increasing width of time_line with px by time value
      if (time == 390) { //if time value is greater than 549
        clearInterval(counterLine); //clear counterLine
      }
    }
  }
  
  
}

function queCounter(index) {
  //creating a new span tag and passing the question number and total question
  let totalQueCounTag = '<span><p>' + index + '</p> of <p>' + questions.length + '</p> Questions</span>';
  bottom_ques_counter.innerHTML = totalQueCounTag; //adding new span tag inside bottom_ques_counter
}

// creating an array and passing the number, questions, options, and answers
let questions = [
  {
    numb: 1,
    question: "I _____ my homework tomorrow.",
    answer: "will do",
    options: ["will do", "am going to do", "do", "did"]
  },
  {
    numb: 2,
    question: "He _____ to the store every day.",
    answer: "goes",
    options: ["goes", "will go", "is going", "went"]
  },
  {
    numb: 3,
    question: "She _____ a sandwich for lunch.",
    answer: "eats",
    options: ["eats", "will eat", "is eating", "ate"]
  },
  {
    numb: 4,
    question: "They _____ to the park every weekend.",
    answer: "go",
    options: ["go", "will go", "are going", "went"]
  },
  {
    numb: 5,
    question: "I _____ my hair every morning.",
    answer: "brush",
    options: ["brush", "will brush", "am brushing", "brushed"]
  },
  {
    numb: 6,
    question: "He _____ at home on Sunday.",
    answer: "stays",
    options: ["stays", "will stay", "is staying", "stayed"]
  },
  {
    numb: 7,
    question: "She _____ to the gym every morning.",
    answer: "goes",
    options: ["goes", "will go", "is going", "went"]
  },
  {
    numb: 8,
    question: "I _____ my room every week.",
    answer: "clean",
    options: ["clean", "will clean", "am cleaning", "cleaned"]
  },
  {
    numb: 9,
    question: "He _____ his car every day.",
    answer: "washes",
    options: ["washes", "will wash", "is washing", "washed"]
  },
  {
    numb: 10,
    question: "She _____ to bed at 10 pm every night.",
    answer: "goes",
    options: ["goes", "will go", "is going", "went"]
  },
  {
    numb: 11,
    question: "I _____ to the gym tomorrow.",
    answer: "will go",
    options: ["will go", "am going", "went", "go"]
  },
  {
    numb: 12,
    question: "He _____ a lot of books next week.",
    answer: "will read",
    options: ["will read", "is reading", "read", "reads"]
  },
  {
    numb: 13,
    question: "She _____ her dog for a walk in an hour.",
    answer: "will take",
    options: ["will take", "is taking", "took", "takes"]
  },
  {
    numb: 14,
    question: "They _____ to work by bus tomorrow.",
    answer: "will go",
    options: ["will go", "go", "going", "gone"]
  },
  {
    numb: 15,
    question: "I _____ my teeth before bed.",
    answer: "will brush",
    options: ["will brush", "brush", "brushing", "brushed"]
  },
  {
    numb: 16,
    question: "He _____ his sister next month.",
    answer: "will visit",
    options: ["will visit", "visits", "visiting", "visited"]
  },
  {
    numb: 17,
    question: "She _____ a lot of emails later today.",
    answer: "will send",
    options: ["will send", "sends", "sending", "sent"]
  },
  {
    numb: 18,
    question: "They _____ a lot of time on their phones tonight.",
    answer: "will spend",
    options: ["will spend", "spend", "spending", "spent"]
  },
  {
    numb: 19,
    question: "I _____ to the park in the afternoon.",
    answer: "am going",
    options: ["am going", "will go", "went", "go"]
  },
  {
    numb: 20,
    question: "He _____ his hair next week.",
    answer: "will cut",
    options: ["will cut", "cuts", "cutting", "cut"]
  },
  {
    numb: 21,
    question: "She _____ a lot of water every day.",
    answer: "drinks",
    options: ["drinks", "will drink", "drinking", "drunk"]
  },
  {
    numb: 22,
    question: "They _____ their vacation next month.",
    answer: "will take",
    options: ["will take", "took", "takes", "taking"]
  },
  {
    numb: 23,
    question: "I _____ my driver's license test next week.",
    answer: "will take",
    options: ['take', 'took', 'will take', 'taked']
  },
  {
    numb: 24,
    question: "He ___ the news every morning.",
    answer: "watches",
    options: ["watches", "watch", "watching", "watched"]
  },
  {
    numb: 25,
    question: "She ___ to music while she works.",
    answer: "listens",
    options: ["listens", "listen", "listening", "listened"]
  },
  {
    numb: 26,
    question: "They ___ dinner at 7 pm every night.",
    answer: "have",
    options: ["have", "has", "having", "had"]
  },
  {
    numb: 27,
    question: "I ___ a lot of coffee in the morning.",
    answer: "drink",
    options: ["drink", "drinks", "drinking", "drunk"]
  },
  {
    numb: 28,
    question: "He ___ his laundry every weekend.",
    answer: "does",
    options: ["does", "do", "did", "done"]
  },
  {
    numb: 29,
    question: "She ___ to yoga class every Tuesday.",
    answer: "goes",
    options: ["goes", "go", "going", "gone"]
  },
  {
    numb: 30,
    question: "They ___ a lot of traveling every year.",
    answer: "do",
    options: ["do", "does", "did", "done"]
  }
];
