"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
var Question = (function () {
    function Question() {
    }
    return Question;
}());
exports.Question = Question;
var QuestionsService = (function () {
    function QuestionsService(http) {
        this.http = http;
        this.questionsUrl = 'questions.json'; // URL to web api
    }
    QuestionsService.prototype.getQuestions = function () {
        return this.http.get(this.questionsUrl)
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    QuestionsService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    return QuestionsService;
}());
QuestionsService = __decorate([
    core_2.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], QuestionsService);
exports.QuestionsService = QuestionsService;
var AppComponent = (function () {
    function AppComponent(questionsService) {
        this.questionsService = questionsService;
        this.getHeroes();
        this.submitted = false;
    }
    AppComponent.prototype.getHeroes = function () {
        var _this = this;
        this.questionsService.getQuestions().then(function (questions) { return _this.questions = questions; });
    };
    AppComponent.prototype.shuffle = function () {
        $("input[type='radio']").each(function () {
            $(this).prop("checked", false);
        });
        this.questions.sort(function () {
            return .5 - Math.random();
        });
        this.submitted = false;
    };
    AppComponent.prototype.onSelect = function (answer, question) {
        question.value = (answer == question.correct);
    };
    AppComponent.prototype.submit = function () {
        this.submitted = true;
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        providers: [QuestionsService],
        templateUrl: 'question_list.html'
    }),
    __metadata("design:paramtypes", [QuestionsService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map