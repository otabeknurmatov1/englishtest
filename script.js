//selecting all required elements
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
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
  if (userScore > 30) { // if user scored more than 3
    //creating a new span tag and passing the user score number and total question number
    let scoreTag = '<span>WOW! 🎉 Natija : <p>' + userScore + '</p> ta togri javob.</span>';
    scoreText.innerHTML = scoreTag; //adding new span tag inside score_Text
  } else if (userScore > 20) { // if user scored more than 1
    let scoreTag = '<span>😎 Natija : <p>' + userScore + '</p> ta.</span>';
    scoreText.innerHTML = scoreTag;
  } else { // if user scored less than 1
    let scoreTag = '<span>😐 Natija : <p>' + userScore + '</p> ta.</span>';
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
  counterLine = setInterval(timer, 120);

  function timer() {
    time += 1; //upgrading time value with 1
    time_line.style.width = time + "px"; //increasing width of time_line with px by time value
    if (time > 549) { //if time value is greater than 549
      clearInterval(counterLine); //clear counterLine
    }
  }
}

function queCounter(index) {
  //creating a new span tag and passing the question number and total question
  let totalQueCounTag = '<span><p>' + index + '</p> of <p>' + questions.length + '</p> Questions</span>';
  bottom_ques_counter.innerHTML = totalQueCounTag; //adding new span tag inside bottom_ques_counter
}

// creating an array and passing the number, questions, options, and answers
let questions = [{
      numb: 1,
      question: "I stopped ... when I was thirty",
      answer: "smoking",
      options: [
        "smoke",
        "smoking",
        "to smoke",
        "to smoking"
      ]
    },
    {
      numb: 2,
      question: "Why did I agree ... with you? I can't stand it.",
      answer: "to work",
      options: [
        "to work",
        "work",
        "working",
        "to working"
      ]
    },
    {
      numb: 3,
      question: "Please start your meal. If you ... your soup now, it ... cold",
      answer: "didn't have / would go",
      options: [
        "didn't have / would go",
        "had / got",
        "can eat / doesn't go",
        "had been / would have gone"
      ]
    },
    {
      numb: 4,
      question: "Prince Charles ... Canadian. He ... English.",
      answer: "is not / is",
      options: [
        "was not / were",
        "is not / was",
        "was not / is",
        "is not / is"
      ]
    },
    {
      numb: 5,
      question: "We ... see Tom last night.",
      answer: "didn't",
      options: [
        "doesn't",
        "don't",
        "isn't",
        "didn't"
      ]
    },
    {
      numb: 6,
      question: "You'll find the poem ... page 16.",
      answer: "on",
      options: [
        "in",
        "on",
        "at",
        "over"
      ]
    },
    {
      numb: 7,
      question: "I know that I ... late 2 days ago, but this time I ... late.",
      answer: "wasn't / am",
      options: [
        "am / were",
        "wasn't / am",
        "am not / am not",
        "was / was"
      ]
    },
    {
      numb: 8,
      question: "Lucy often ... red.",
      answer: "",
      options: [
        "wear",
        "is wearing",
        "worn",
        "wears"
      ]
    },
    {
      numb: 9,
      question: "He's ... older than he looks.",
      answer: "*",
      options: [
        "much",
        "*",
        "more",
        "the"
      ]
    },
    {
      numb: 10,
      question: "The doctor recommended that she ... in bed for a few days.",
      answer: "would stay",
      options: [
        "will stay",
        "stay",
        "would stay",
        "to stay"
      ]
    },
    {
      numb: 11,
      question: "Mike is sitting ... the desk ... front of the door.",
      answer: "on / on",
      options: [
        "at / in",
        "on / on",
        "on / at",
        "in / at"
      ]
    },
  {
    numb: 12,
    question: "Most men are anxious ... the advancement of their children.",
    answer: "for",
    options: [
      "for",
      "from",
      "on",
      "with"
    ]
  }, 
  {
    numb: 13,
    question: "She left without ... goodbye.",
    answer: "saying",
    options: [
      "to say",
      "say",
      "saying",
      "having said"
    ]
  }, 
  {
    numb: 14,
    question: "They were expected ... back by eleven.",
    answer: "beeing",
    options: [
      "beeing",
      "been",
      "have been",
      "to be"
    ]
  }, 
  {
    numb: 15,
    question: "The boy ... a blue jacket is an excellent tennis player.",
    answer: "wearing",
    options: [ 
      "wears",
      "to be worn",
      "worn",
      "wearing"
    ]
  }, 
  {
    numb: 16,
    question: "would you like ... rice?",
    answer: "some",
    options: [
      "a",
      "some",
      "any",
      "an"
    ]
  }, 
  {
    numb: 17,
    question: "He always has ... egg for breakfast",
    answer: "an",
    options: [
      "an",
      "a",
      "any",
      "the"
    ]
  }, 
  {
    numb: 18,
    question: "The phone rang ... I was having supper",
    answer: "while",
    options: [
      "for",
      "while",
      "during",
      "in"
    ]
  }, 
  {
    numb: 19,
    question: "Traffic is always bad ... the rush hour.",
    answer: "during",
    options: [
      "during",
      "while",
      "for",
      "in"
    ]
  }, 
  {
    numb: 20,
    question: "... I take your pen for a moment?",
    answer: "May",
    options: [
      "May",
      "Might",
      "Should",
      "Must"
    ]
  }, 
  {
    numb: 21,
    question: "You ... do this for it's necessary.",
    answer: "have to",
    options: [
      "must",
      "have to",
      "can",
      "could"
    ]
  }, 
  {
    numb: 22,
    question: "The girl ... in the yard asked me the time",
    answer: "playing",
    options: [
      "play",
      "playing",
      "to play",
      "was playing"
    ]
  }, 
  {
    numb: 23,
    question: "Tom ... already left when you arrived",
    answer: "had",
    options: [
      "he",
      "just",
      "had",
      "was"
    ]
  }, 
  {
    numb: 24,
    question: "Everyone will ... lunch by 2:30.",
    answer: "have had",
    options: [
      "had have",
      "be",
      "have had",
      "eat for"
    ]
  }, 
  {
    numb: 25,
    question: "Excuse me, officer. I'd like you ... me.",
    answer: "to help",
    options: [
      "helping",
      "for help",
      "to help",
      "help"
    ]
  }, 
  {
    numb: 26,
    question: "Mr Bond's suitcase ... examined already by the customs officer",
    answer: "has",
    options: [
      "has",
      "has been",
      "carefully",
      "is"
    ]
  }, 
  {
    numb: 27,
    question: "They asked a lot of questions ... his job.",
    answer: "about",
    options: [
      "about",
      "of",
      "for",
      "on"
    ]
  }, 
  {
    numb: 28,
    question: "He didn't know ... or go home.",
    answer: "whether to wait",
    options: [
      "to wait",
      "if to wait",
      "if that he should wait",
      "whether to wait"
    ]
  }, 
  {
    numb: 29,
    question: "We won't have ... apples.",
    answer: "any",
    options: [
      "some",
      "a",
      "few",
      "some"
    ]
  }, 
  {
    numb: 30,
    question: "The ... outside the house said 'Private'.",
    answer: "notice",
    options: [
      "notice",
      "signal",
      "label",
      "advice"
    ]
  },
];
