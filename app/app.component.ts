import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

export class Question {
  _id: number;
  question: string;
  answers: any[];
  correct: number;
  value: boolean;
}

@Injectable()
export class QuestionsService {
  private questionsUrl = 'questions.json';  // URL to web api
  constructor(private http: Http) {}

  getQuestions(): Promise<Question[]> {
    return this.http.get(this.questionsUrl)
        .toPromise()
        .then(response => response.json().data as Question[])
        .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}


@Component({
  selector: 'my-app',
  providers: [QuestionsService],
  templateUrl: 'question_list.html'
})
export class AppComponent  {

  questions: Question[];
  submitted: boolean;

  constructor(private questionsService: QuestionsService) {
    this.getHeroes();
    this.submitted = false;
  }

  getHeroes(): void {
    this.questionsService.getQuestions().then(questions => this.questions = questions);
  }

  shuffle(): void {
    $("input[type='radio']").each(function() {
      $(this).prop("checked", false);
    });
    this.questions.sort(function() {
      return .5 - Math.random();
    });
    this.submitted = false;
  }

  onSelect(answer: number, question: Question): void {
      question.value = (answer == question.correct);
  }

  submit() {
    this.submitted = true;
  }
}
