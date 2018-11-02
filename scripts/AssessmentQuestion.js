gRecordData = {
    Status: "NotStarted",
    AssessmentScore: 4,
    VisitedNumberOfPages: "0",
    LastVisitedPage: "", // UserSelectedOptionId will be used to jump to the unattempted question
    RecordTitle: "How Does Barbara Corcoran Pick Her Investments on Shark Tank?",
    LandingPageURL: "record2_landing.htm",
    QuestionSequence: "Numbers", // this can be used later if different display style is required
    OptionSequence: "LowerAlphabets", // this can be used later if different display style is required
    RandomizeQuestions: true,
    RandomizeOptions: true,
    Questions: [
                    {
                        QuestionId: "1",
                        QuestionText: "What’s the best type of computer for a sales rep who travels extensively, needs a light-weight system to take written notes and show product spec pages to clients in their offices?",
                        Options: [
                                     {
                                         "OptionId": "1",
                                         "OptionText": "All-In-One PC",
                                         "IsCorrect": false,

                                     },
                                     {
                                         "OptionId": "2",
                                         "OptionText": "Tablet ",
                                         "IsCorrect": true,
                                         "score": 2
                                     },
                                     {
                                         "OptionId": "3",
                                         "OptionText": "PC Notebook",
                                         "IsCorrect": false
                                     }

                        ],
                        IsAnswered:false,
                        CorrectFeedback: "That’s right.",
                        IncorrectFeedback: "​That’s not right. A Tablet would be the best type of computer for this type of user.",
                        "UserSelectedOptionId": ""

                    },
                    {
                        QuestionId: "2",
                        QuestionText: "What’s the best type of computer for a graphic-design or multimedia artist who uses Apple software and does not need to travel for business?",
                        Options: [
                                     {
                                         "OptionId": "1",
                                         "OptionText": "All-In-One PC",
                                         "IsCorrect": false,

                                     },
                                     {
                                         "OptionId": "2",
                                         "OptionText": "A tablet",
                                         "IsCorrect": false,
                                        

                                     },
                                     {
                                         "OptionId": "3",
                                         "OptionText": "A Mac desktop",
                                         "IsCorrect": true,
                                         score: 2,

                                     }

                        ],
                        IsAnswered:false,
                        IncorrectFeedback: "That’s not right. A Mac desktop is the best choice for a graphic-design or multimedia artist who uses Apple software and does not need to travel for business.",
                        CorrectFeedback: "That’s right.​",
                        "UserSelectedOptionId": ""

                    },
                    {
                        QuestionId: "3",
                        QuestionText: "What’s the best type of computer for an administrative assistant with limited office space who does not travel, but needs access to Microsoft Office software?",
                        Options: [
                                     {
                                         "OptionId": "1",
                                         "OptionText": "Mac Book Pro",
                                         "IsCorrect": false
                                        
                                     },
                                     {
                                         "OptionId": "2",
                                         "OptionText": "Tablet",
                                         "IsCorrect": false
                                     },
                                     {
                                         "OptionId": "3",
                                         "OptionText": "PC All-In-One",
                                         "IsCorrect": true,
                                         score: 2
                                     }

                        ],
                        IsAnswered:false,
                        IncorrectFeedback: "​That’s not right. A PC all-in-one is the best choice for somebody with limited space and no need for travel.​",
                        CorrectFeedback: "That’s right.​",
                        "UserSelectedOptionId": ""

                    },
                    {
                        QuestionId: "4",
                        QuestionText: "Which of the following is the best reason why somebody might choose a PC desktop?",
                        Options: [
                                     {
                                         "OptionId": "1",
                                         "OptionText": "Needs a portable system with high-performance graphical capabilities.",
                                         "IsCorrect": false
                                     },
                                     {
                                         "OptionId": "2",
                                         "OptionText": "Needs a system with that runs Windows and can be easily upgraded.",
                                         "IsCorrect": true,
                                         score: 2
                                     },
                                     {
                                         "OptionId": "3",
                                         "OptionText": "Needs access to a portable system that can be used to present PowerPoint Presentations.",
                                         "IsCorrect": false,
                                       
                                     }

                        ],
                        IsAnswered:false,
                        IncorrectFeedback: "​That’s not right. A desktop is not a portable computer.​",
                        CorrectFeedback: "That’s right.​",
                        "UserSelectedOptionId": ""

                    }

    ]
}