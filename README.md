[![Code Climate](https://codeclimate.com/github/oliverfarrell/quiz.js/badges/gpa.svg)](https://codeclimate.com/github/oliverfarrell/quiz.js)

Quiz.js is a configurable vanilla Javascript multi-choice quiz.

## Creator
Oliver Farrell
https://github.com/oliverfarrell/multi-choice-quiz

## Usage
```
Quiz.init({
  json: '/questions.json',
  numberOfQuestions: 10,
  questionsTemplate: '/question.html',
  resultsTemplate: '/results.html',
  wrongAnswersTemplate: '/wrong-answers.html',
  container: 'quiz'
});

```

## Options

### json
The location of the JSON file that contains the questions. See `/questions.json` inside this repo for the necessary example format.

### numberOfQuestions
The number of questions that should be displayed on the front-end.

### questionsTemplate
The HTML template that should be used to display the questions.

### resultsTemplate
The HTML template that should be used to display the results.

### wrongAnswersTemplate
The HTML template that should be used to display the questions that were incorrect.

### container
The ID of the element that should be used as the quiz container.

## TODO
* Put a check in place against the requested number of questions and the number of questions available in the JSON file
* Store users incorrect answer and display on request
