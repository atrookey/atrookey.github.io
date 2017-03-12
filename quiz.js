/**
 * quiz.js
 * Author: Oliver Farrell
 */

var Quiz = (function () {

  // settings
  var settings = {
    json: '/questions.json',
    numberOfQuestions: 2,
    questionsTemplate: '/question.html',
    resultsTemplate: '/results.html',
    wrongAnswersTemplate: '/wrong-answers.html',
    container: 'quiz',
    questionIds: []
  };

  var questions, score;
  var wrongQuestions = [];

  // template helper
  var _getFileContents = function(template, callback) {

    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      if (request.readyState == 4 && request.status == 200) {
        callback(request.responseText);
      }
    };
    request.open('GET', template, true);
    request.send();

  };


  // parse the questions
  var _parseQuestions = function (file, callback) {

    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      if (this.readyState === 4) {
        if (this.status >= 200 && this.status < 400) {
          callback(this.responseText);
        } else {
          console.error('Error parsing JSON file.');
        }
      }
    };
    request.open('GET', file, true);
    request.send();
    request = null;

  };


  // build quiz
  var _buildQuiz = function () {

    // grab the template file
    _getFileContents(settings.questionsTemplate, function (response) {
      document.getElementById(settings.container).innerHTML = response;
      document.querySelector('#total').innerHTML = settings.numberOfQuestions;
    });

    // parse the questions
    _parseQuestions(settings.json, function (response) {
      questions = JSON.parse(response);

      for (var key in questions) {
        if (questions.hasOwnProperty(key)) {
          settings.questionIds.push(questions[key]._id);
        }
      }

      // change the total questions value
      var total = document.querySelector('#total');
      total.innerHTML = +settings.numberOfQuestions;

      _getQuestion();
    });

    score = 0;

  };


  // get question
  var _getQuestion = function () {

    // grab a question
    var questionId = settings.questionIds[Math.floor(Math.random() * settings.questionIds.length)];
    var question = questions[questionId];

    // remove the current question from the questions array
    var i = settings.questionIds.indexOf(question._id);
    settings.questionIds.splice(i, 1);

    // build up the question
    var quiz = document.getElementById('quiz'),
        list = document.getElementById('answers'),
        title = quiz.getElementsByTagName('h2'),
        answers = question.answers;

    list.innerHTML = "";

    // change the question number
    var current = document.querySelector('#current');
    current.innerHTML = +current.innerHTML + 1;

    // add question title
    for(var i = 0; i < title.length; i++) {
      title[i].innerHTML = question.question;
    }

    // add the answers
    for(var i = 0; i < answers.length; i++) {
      var el = document.createElement('option');
      var text = document.createTextNode(answers[i].answer);

      el.appendChild(text);
      el.dataset.id = [i];
      list.appendChild(el);

      el.onclick = _chooseAnswer;
    }

    // add in the next button
    var oldNextButton = document.getElementById("next");
    var newNextButton = oldNextButton.cloneNode(true);
    oldNextButton.parentNode.replaceChild(newNextButton, oldNextButton);

    // add click events to next button
    var next = document.getElementById('next');
    next.addEventListener('click', function() {

      var quiz = document.getElementById('quiz');
      var answers = document.getElementById('answers');
      var chosenAnswer = answers.options[answers.selectedIndex];

      if(current.innerHTML == settings.numberOfQuestions.toString()) {
          _checkAnswer(question, chosenAnswer);
          _getResults();
      } else {
        if (quiz.contains(chosenAnswer)) {
          _getQuestion();
          _checkAnswer(question, chosenAnswer);
        } else {
          alert('Please select an answer.');
        }
      }

    });

    // add in the reset button
    var oldResetButton = document.getElementById("reset");
    var newResetButton = oldResetButton.cloneNode(true);
    oldResetButton.parentNode.replaceChild(newResetButton, oldResetButton);

    // add click events to reset button
    var next = document.getElementById('reset');
    next.addEventListener('click', function() {
      _resetQuiz();
    });

  };


  var _chooseAnswer = function () {

    var answers = document.querySelectorAll('#answers li');
    for(var i = 0; i < answers.length; i++) {
      answers[i].dataset.state = '';
    }

    this.dataset.state = 'active';

  };


  var _checkAnswer = function (question, userAnswer) {

    var correctAnswer = question.correct,
        userAnswer = userAnswer.dataset.id;

    if(correctAnswer == userAnswer)
      _incrementScore();
    else
      wrongQuestions.push(question._id);

  };


  // increment score
  var _incrementScore = function () {
    score++;
  };


  // get results
  var _getResults = function () {

    // grab the template file
    _getFileContents(settings.resultsTemplate, function (response) {
      document.getElementById(settings.container).innerHTML = response;
      document.querySelector('#total').innerHTML = settings.numberOfQuestions;
      document.querySelector('#current').innerHTML = score;

      // add in the next button
      var oldResetButton = document.getElementById("reset");
      var newResetButton = oldResetButton.cloneNode(true);
      oldResetButton.parentNode.replaceChild(newResetButton, oldResetButton);

      // add click events to next button
      var next = document.getElementById('reset');
      next.addEventListener('click', function() {
        _resetQuiz();
      });

      if(wrongQuestions.length) {

        // add in the show wrong answers button
        var oldWrongAnswersButton = document.getElementById("showWrongAnswers");
        var newWrongAnswersButton = oldWrongAnswersButton.cloneNode(true);
        oldWrongAnswersButton.parentNode.replaceChild(newWrongAnswersButton, oldWrongAnswersButton);

        // add click events to next button
        var wrongAnswersButton = document.getElementById('showWrongAnswers');
        wrongAnswersButton.addEventListener('click', function() {
          _getWrongAnswers();
        });

      } else {

        var oldWrongAnswersButton = document.getElementById("showWrongAnswers");
        oldWrongAnswersButton.parentNode.removeChild(oldWrongAnswersButton);

      }
    });

  };


  // show wrong answers
  var _getWrongAnswers = function () {

    // grab the template file
    _getFileContents(settings.wrongAnswersTemplate, function (response) {
      document.getElementById(settings.container).innerHTML = response;
      var container = document.getElementById('questions');

      for(var i = 0; i < wrongQuestions.length; i++) {

        var title = document.createElement('h3'),
            titleText = document.createTextNode(questions[wrongQuestions[i]].question),
            answer = document.createElement('p'),
            answerText = document.createTextNode('Correct answer: ' + questions[wrongQuestions[i]].answers[questions[wrongQuestions[i]].correct].answer);

        title.appendChild(titleText);
        container.appendChild(title);

        answer.appendChild(answerText);
        title.parentNode.insertBefore(answer, answerText.nextSibling);

      }

      // add in the next button
      var oldResetButton = document.getElementById("reset");
      var newResetButton = oldResetButton.cloneNode(true);
      oldResetButton.parentNode.replaceChild(newResetButton, oldResetButton);

      // add click events to next button
      var next = document.getElementById('reset');
      next.addEventListener('click', function() {
        _resetQuiz();
      });
    });

  };


  // reset quiz
  var _resetQuiz = function () {

    settings.questionIds = [];
    wrongQuestions = [];
    score = 0;

    _buildQuiz();
    _getQuestion();

  };


  // kick it all off
  var init = function() {
    _buildQuiz();
    _getQuestion();
  };


  return {
    init: init
  };

})();
