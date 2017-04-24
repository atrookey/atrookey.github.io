#!/bin/python

import json

DONE = 'done'

questions_list = []

def create_question(question, answers, correct):
    question_dict = {}
    question_dict['question'] = question
    question_dict['answers'] = []
    question_dict['correct'] = ord(correct.lower()) - (ord('a')+1)
    for answer in answers:
        question_dict['answers'].append({
            'answer' : answer
        })
    return question_dict

while (True):
    question = input('question? ')
    if question == DONE:
        break
    answers = []
    while (True):
        answer = input('answer? ')
        if answer == DONE:
            break
        answers.append(answer)
    correct = input('correct? ')
    question_dict = create_question(question, answers, correct)
    questions_list.append(question_dict)

with open('dumpquestions.json', 'w') as f:
    json.dump(questions_list, f)
