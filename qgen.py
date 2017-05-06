#!/bin/python

import json

DONE = 'done'

questions_list = []

class State(Enum):
    QUESTION = 0
    ANSWERS = 1
    CORRECT = 2

def new_question():
    question = {'answers' : []}

int state = 0;

with open('questions.txt', 'r') as q:
    question_dict = new_question()
    question = False
    for line in q:
        if question:
            question_dict['question'] = line
            question = False
        if 'ANSWER' in line:
            questions_list.append(question_dict)
            question_dict = new_question()
            question = True
        else:
            question_dict['answers'].append({
                'answer' : line
            })




def create_question(question, answers, correct):
    question_dict = {}
    question_dict['question'] = question
    question_dict['answers'] = []
    question_dict['correct'] = ord(correct.lower()) - (ord('a')+1)
    question_dict['value'] = False
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
