#!/bin/python

import json
from enum import Enum

class State(Enum):
    QUESTION = 0
    ANSWERS = 1
    CORRECT = 2

def new_question():
    return {'answers' : []}

questions_list = []
state = State.CORRECT
question_id = 0
answer_id = 0

with open('questions.txt', 'r') as q:
    question_dict = new_question()
    question = False
    for l in q:
        line = l.rstrip()
        if state == State.CORRECT:
            question_dict['correct'] = ord(line.lower()) - (ord('a')+1)
            question_dict = new_question()
            state = State.QUESTION
        elif state == State.QUESTION:
            question_dict['question'] = line
            question_dict['value'] = False
            question_dict['_id'] = question_id
            question_id += 1
            state = State.ANSWERS;
        elif state == State.ANSWERS:
            if 'ANSWER' in line:
                state = State.CORRECT
                answer_id = 0
                questions_list.append(question_dict)
            else:
                question_dict['answers'].append({
                    'answer' : line,
                    '_id' : answer_id
                })
                answer_id+=1
    questions_list.append(question_dict)

with open('dumpquestions.json', 'w') as f:
    json.dump({ 'data' : questions_list[1:] }, f)
