"use strict";
var InMemoryDataService = (function () {
    function InMemoryDataService() {
    }
    InMemoryDataService.prototype.createDb = function () {
        var questions = [
            {
                "_id": 0,
                "question": "If a patient has the following symptoms: aural fullness, tinnitus, fluctuating sensorineural heaing loss and intermittent vertigo, the MOST likely cause is:",
                "answers": [
                    {
                        "_id": 0,
                        "answer": "fluid behind the typmpanic membrane"
                    },
                    {
                        "_id": 1,
                        "answer": "barotrauma"
                    },
                    {
                        "_id": 2,
                        "answer": "cholesteatoma"
                    },
                    {
                        "_id": 3,
                        "answer": "Meniere's disease"
                    }
                ],
                "correct": 2
            },
            {
                "_id": 1,
                "question": "Upon doing otoscopy, a perforation in the lower left quadrant of the right eardrum is observed. In the referral to the doctor, which of the following is the BEST way to describe the findings?",
                "answers": [
                    {
                        "_id": 0,
                        "answer": "Anterior lower perforation"
                    },
                    {
                        "_id": 1,
                        "answer": "Anterior inferior perforation"
                    },
                    {
                        "_id": 2,
                        "answer": "Posterior inferior perforation"
                    },
                    {
                        "_id": 3,
                        "answer": "Posterior lower perforation"
                    }
                ],
                "correct": 1
            }
        ];
        return { questions: questions };
    };
    return InMemoryDataService;
}());
exports.InMemoryDataService = InMemoryDataService;
//# sourceMappingURL=in-memory-data.service.js.map