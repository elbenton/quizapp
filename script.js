const STORE = [
  {
    question: 'What is the name of Jerry Seinfeld’s neighbor with whom he does NOT get along?',
    
    answers: [
      'Cosmo Kramer',
      'George Costanza',
      'Elaine Benes',
      'Newman'
    ],
    correctAnswer: 3,
  },
  {
    question: 'What celebrity does George Costanza believe previously owned his vehicle?',
    
    answers: [
      'Celine Dion',
      'Jon Voight',
      'Walt Disney',
      'Dolly Parton'
    ],
    correctAnswer: 1,
  },
  {
    question: 'What is the job that Cosmo Kramer is constantly on strike from?',
    
    answers: [
      'Deli Professional at Zabars',
       'Bagel Technician at H&H Bagels',
       'Professor of psychology at Fordham College',
       'Night guard at The Tenement Museum'
    ],

    correctAnswer: 1,
  },
  {
    question: 'What does Elaine Benes do at her company party that embarrasses her?',

    answers: [
      'Dances terribly',
      'Overdresses',
      'Kisses her boss',
      'Forgets to flush the toilet'
    ],

    correctAnswer: 0,
  },
  {
    question: 'What is Jerry Seinfeld called for saying a certain dentist was too sensitive after being offended by his dentist jokes?',

    answers: [
      'The dental Hitler',
      'An enamelphobe',
      'An anti-dentite',
      'A floss pirate'
    ],
    correctAnswer: 2,
  }
];

let score = 0;
let questionNumber = 0;
let currentUserAswer = null;



function handleQuizStartClick() {
  $('#startBox').hide();
  $('#startButton').hide();
  console.log(questionNumber);
  displayQuestion();
}

function displayQuestion() {
	const currentQuestion = STORE[questionNumber];
	let questionHTML = '<span id="questionText">'+currentQuestion.question+'</span>';
  
  
	
	$('#questionBox').html(questionHTML);
  let answerHTML = '';
  for(i = 0; i<currentQuestion.answers.length; i++) {
	  answerHTML += '<div><input type="radio" name="answer" value="'+ i +'" id="a'+i+'"> ';
	  answerHTML += '<label for="a'+i+'">'+currentQuestion.answers[i]+'</label></div>';
  }
  answerHTML += '<button class="button" onclick="submitAnswer();">Submit</button>';
  $('#responseBox').hide();
  $('#answerBox').html(answerHTML);
  $('#questionBox').show();
  $('#answerBox').show();
	
}

function submitAnswer() {
    event.preventDefault();
    $('#questionBox').hide();
    $('#answerBox').hide();
    $('#wrong').hide();
    $('#correct').hide();
    $('.responseBox').show();
    let selected = $('input:checked');
    let answer = selected.val();
    let correct = STORE[questionNumber].correctAnswer;
    if (answer == correct) {
      correctAnswer();
    } else {
      wrongAnswer();
    }
}


function updateStats() {
	$('#questionnumber').html(questionNumber + 1);
	$('#score').html(score);
  
}

function correctAnswer() {
	let answerIndex = STORE[questionNumber].correctAnswer;
	let answerText = STORE[questionNumber].answers[answerIndex];
	$('#correctAnswer').html(`<h3>Correct!</h3>
    <img src="gifs/thats_true.gif" alt="Kramer saying that's true" class="thatsTrue">
      <br><button type="button" class="nextButton button">Next</button>`);
      nextQuestion();
  $('#wrongAnswer').hide();
  $('#correctAnswer').show();
  score++;
  updateStats();
}

function wrongAnswer() {
	
	let answerIndex = STORE[questionNumber].correctAnswer;
	let answerText = STORE[questionNumber].answers[answerIndex];
	$('#wrongAnswer').html(`<h3>Incorrect!</h3>
    <img src="gifs/serenity_now.gif" alt="George Costanza yelling serenity now!" class="serentiyNow">
      <br><button type="button" class="nextButton button">Next</button>`);
      nextQuestion();
  $('#correctAnswer').hide();
  $('#wrongAnswer').show();
}

function nextQuestion() {
  $('.nextButton').on('click', function (event) {
	  questionNumber++;
	  if(questionNumber <5) {
	  displayQuestion();
    updateStats();
      }	else {
		  endQuiz();
	  }
  });
}

function endQuiz() {
	let finalBoxHTML = '<h3>You scored '
	+ '<span class="finalScore">'+score+'</span> out of 5</h3>'
	$('.endClose').hide();
	$('#finalBox').html(finalBoxHTML);
	$('#finalBox').show();
}

function initialHandlers() {
	$('#startButton').click(handleQuizStartClick);
}
$('#questionBox').hide()
$('#answerBox').hide()
$('#responseBox').hide()
$('#finalBox').hide()
$( document ).ready(function() {
    initialHandlers();
});
