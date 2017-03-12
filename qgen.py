#!/bin/python

import json

DONE = 'done'

question_id = int(input('question_id? '))
questions_list = []

def create_question(question, answers, correct):
    global question_id
    question_dict = {}
    question_dict['_id'] = question_id
    question_id += 1
    question_dict['question'] = question
    question_dict['answers'] = []
    question_dict['correct'] = ord(correct.lower()) - (ord('a')+1)
    answer_id = 0
    for answer in answers:
        question_dict['answers'].append({
            '_id' : answer_id,
            'answer' : answer
        })
        answer_id += 1
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
