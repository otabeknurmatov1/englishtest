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
      question: "Can I park here?",
      answer: "Only for half an hour",
      options: [
        "Only for half an hour",
        "Sorry, I did that.",
        "It's the same place",
        "..."
      ]
    },
    {
      numb: 2,
      question: "What colour will you paint the children's bedroom?",
      answer: "We can't decide.",
      options: [
        "I hope it was right.",
        "We can't decide.",
        "It wasn't very difficult.",
        "..."
      ]
    },
    {
      numb: 3,
      question: "I can't understand this email.",
      answer: "Would you like some help?",
      options: [
        "Would you like some help?",
        "Don't you know?",
        "I suppose you can.",
        "..."
      ]
    },
    {
      numb: 4,
      question: "I'd like two tickets for tomorrow night.",
      answer: "I'll just check for you.",
      options: [
        "How much did you pay?",
        "Afternoon and evening.",
        "I'll just check for you.",
        "..."
      ]
    },
    {
      numb: 5,
      question: "Shall we go to the gym now?",
      answer: "I'm too tired.",
      options: [
        "I'm too tired.",
        "It's very good.",
        "Not at all.",
        "..."
      ]
    },
    {
      numb: 6,
      question: "His eyes were ...... bad that he couldn't read the number plate of the car in front.",
      answer: "so",
      options: [
        "such",
        "too",
        "so",
        "very"
      ]
    },
    {
      numb: 7,
      question: "The company needs to decide ...... and for all what its position is on this point.",
      answer: "once",
      options: [
        "here",
        "first",
        "once",
        "finally"
      ]
    },
    {
      numb: 8,
      question: "Don't put your cup on the ...... of the table – someone will knock it off.",
      answer: "edge",
      options: [
        "outside",
        "edge",
        "boundary",
        "border"
      ]
    },
    {
      numb: 9,
      question: "I'm sorry - I didn't ...... to disturb you.",
      answer: "mean",
      options: [
        "suppose",
        "mean",
        "think",
        "hope"
      ]
    },
    {
      numb: 10,
      question: "The singer ended the concert ...... her most popular song.",
      answer: "with",
      options: [
        "by",
        "with",
        "in",
        "as"
      ]
    },
    {
      numb: 11,
      question: "Would you mind ...... these plates a wipe before putting them in the cupboard?",
      answer: "giving",
      options: [
        "giving",
        "making",
        "getting",
        "doing"
      ]
    },
  {
    numb: 12,
    question: "I was looking forward ...... at the new restaurant, but it was closed.",
    answer: "to eating",
    options: [
      "eating",
      "to have eaten",
      "to eat",
      "to eating"
    ]
  }, 
  {
    numb: 13,
    question: "...... tired Melissa is when she gets home from work, she always makes time to say goodnight to the children.",
    answer: "No matter how",
    options: [
      "Whatever",
      "No matter how",
      "However much",
      "Although"
    ]
  }, 
  {
    numb: 14,
    question: "It was only ten days ago ...... she started her new job.",
    answer: "that",
    options: [
      "then",
      "since",
      "after",
      "that"
    ]
  }, 
  {
    numb: 15,
    question: "The shop didn't have the shoes I wanted, but they've ...... a pair specially for me.",
    answer: "ordered",
    options: [ 
      "ordered",
      "booked",
      "asked",
      "commanded"
    ]
  },
  {
    numb: 16,
    question: "Have you got time to discuss your work now or are you ...... to leave?",
    answer: "about",
    options: [ 
      "thinking",
      "round",
      "planned",
      "about"
    ]
  },
  {
    numb: 17,
    question: "She came to live here ...... a month ago.",
    answer: "almost",
    options: [ 
      "quite",
      "beyond",
      "already",
      "almost"
    ]
  },
  {
    numb: 18,
    question: "Once the plane is in the air, you can ...... your seat belts if you wish.",
    answer: "unfasten",
    options: [ 
      "unlock",
      "untie",
      "undress",
      "unfasten"
    ]
  },
  {
    numb: 19,
    question: "I left my last job because I had no ...... to travel.",
    answer: "opportunity",
    options: [ 
      "place",
      "position",
      "opportunity",
      "possibility"
    ]
  },
  {
    numb: 20,
    question: "It wasn't a bad crash and ...... damage was done to my car.",
    answer: "little",
    options: [ 
      "light",
      "mere",
      "little",
      "small"
    ]
  },
  {
    numb: 21,
    question: "I'd rather you ...... to her why we can't go.",
    answer: "explained",
    options: [ 
      "would explain",
      "explained",
      "to explain",
      "will explain"
    ]
  },
  {
    numb: 22,
    question: "Before making a decision, the leader considered all ...... of the argument.",
    answer: "sides",
    options: [ 
      "sides",
      "features",
      "perspectives",
      "shades"
    ]
  },
  {
    numb: 23,
    question: "This new printer is recommended as being ...... reliable.",
    answer: "highly",
    options: [ 
      "greatly",
      "highly",
      "strongly",
      "readily"
    ]
  },
  {
    numb: 24,
    question: "When I realised I had dropped my gloves, I decided to ...... my steps.",
    answer: "retrace",
    options: [ 
      "retrace",
      "regress",
      "resume",
      "return"
    ]
  },
  {
    numb: 25,
    question: "Anne's house is somewhere in the ...... of the railway station.",
    answer: "vicinity",
    options: [ 
      "region",
      "quarter",
      "vicinity",
      "district"
    ]
  }
];
