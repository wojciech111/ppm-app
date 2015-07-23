var React = require('react');
var ProjectMainPage = require('./Project/ProjectMainPage');
var Router = require('react-router-component');
var AppTemplate = require('./AppTemplate.js');
var Locations = Router.Locations;
var Location = Router.Location;
var NotFound = Router.NotFound;

var App = React.createClass({
    getInitialState: function() {
        return {
            portfolio: {
                "componentType": "PORTFOLIO",
                "areasOfFocus": [
                    {
                        "percentageOfFocus": 35,
                        "category": {
                            "categoryId": "4051",
                            "code": "CA2     ",
                            "name": "Kategoria mniej wyborna",
                            "description": "opis kategorii ktory jest zwykle wyczerpujï¿½cy",
                            "categoryEvaluations": [
                                {
                                    "scoringCriterion": {
                                        "scoringCriterionId": "3951",
                                        "code": "Eff     ",
                                        "name": "Efficiency improvement",
                                        "description": "Pi?kny opis tego czym ten wska?nik jest",
                                        "question": null,
                                        "bestIs": "MAX",
                                        "minScore": null,
                                        "maxScore": null
                                    }
                                }
                            ]
                        }
                    },
                    {
                        "percentageOfFocus": 65,
                        "category": {
                            "categoryId": "4050",
                            "code": "CA1     ",
                            "name": "Kategoria wyborna",
                            "description": "opis kategorii ktory jest niezwykle wyczerpujï¿½cy",
                            "categoryEvaluations": [
                                {
                                    "scoringCriterion": {
                                        "scoringCriterionId": "3950",
                                        "code": "ROI     ",
                                        "name": "Return on investment",
                                        "description": "Pi?kny opis tego czym ten wska?nik jest",
                                        "question": null,
                                        "bestIs": "MAX",
                                        "minScore": null,
                                        "maxScore": null
                                    }
                                }
                            ]
                        }
                    }
                ],
                "componentId": "11300",
                "code": "PT        ",
                "name": "portfolioTop",
                "customer": "customer jakis",
                "description": "Opis Opisik",
                "overallPriority": null,
                "categoryMemberships": [],
                "children": [
                    {
                        "health": null,
                        "scope": null,
                        "schedule": null,
                        "budget": null,
                        "componentType": "PROGRAM",
                        "componentId": "11306",
                        "code": "PF1       ",
                        "name": "portfolioProgram",
                        "customer": "customer jakis",
                        "description": "Opis Opisik",
                        "overallPriority": 3,
                        "categoryMemberships": [],
                        "children": [
                            {
                                "recursionType": "M",
                                "componentType": "OPERATION",
                                "componentId": "11307",
                                "code": "PF2       ",
                                "name": "portfolioProgramOperation",
                                "customer": "customer jakis",
                                "description": "Opis Opisik",
                                "overallPriority": null,
                                "categoryMemberships": [
                                    {
                                        "percentageOfSupport": null,
                                        "category": {
                                            "categoryId": "4050",
                                            "code": "CA1     ",
                                            "name": "Kategoria wyborna",
                                            "description": "opis kategorii ktory jest niezwykle wyczerpujï¿½cy",
                                            "categoryEvaluations": [
                                                {
                                                    "scoringCriterion": {
                                                        "scoringCriterionId": "3950",
                                                        "code": "ROI     ",
                                                        "name": "Return on investment",
                                                        "description": "Pi?kny opis tego czym ten wska?nik jest",
                                                        "question": null,
                                                        "bestIs": "MAX",
                                                        "minScore": null,
                                                        "maxScore": null
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                ],
                                "children": [],
                                "scores": []
                            },
                            {
                                "health": null,
                                "scope": null,
                                "schedule": null,
                                "budget": null,
                                "componentType": "PROJECT",
                                "componentId": "11308",
                                "code": "PF1       ",
                                "name": "portfolioProgramProject",
                                "customer": "customer jakis",
                                "description": "Opis Opisik",
                                "overallPriority": null,
                                "categoryMemberships": [
                                    {
                                        "percentageOfSupport": null,
                                        "category": {
                                            "categoryId": "4050",
                                            "code": "CA1     ",
                                            "name": "Kategoria wyborna",
                                            "description": "opis kategorii ktory jest niezwykle wyczerpujï¿½cy",
                                            "categoryEvaluations": [
                                                {
                                                    "scoringCriterion": {
                                                        "scoringCriterionId": "3950",
                                                        "code": "ROI     ",
                                                        "name": "Return on investment",
                                                        "description": "Pi?kny opis tego czym ten wska?nik jest",
                                                        "question": null,
                                                        "bestIs": "MAX",
                                                        "minScore": null,
                                                        "maxScore": null
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                ],
                                "children": [],
                                "scores": [
                                    {
                                        "motivation": "To jes dla tego, ze jest",
                                        "score": 346.23,
                                        "scoringCriterion": {
                                            "scoringCriterionId": "3950",
                                            "code": "ROI     ",
                                            "name": "Return on investment",
                                            "description": "Pi?kny opis tego czym ten wska?nik jest",
                                            "question": null,
                                            "bestIs": "MAX",
                                            "minScore": null,
                                            "maxScore": null
                                        }
                                    }
                                ]
                            },
                            {
                                "health": null,
                                "scope": null,
                                "schedule": null,
                                "budget": null,
                                "componentType": "PROGRAM",
                                "componentId": "11309",
                                "code": "PF1       ",
                                "name": "portfolioProgramSubprogram",
                                "customer": "customer jakis",
                                "description": "Opis Opisik",
                                "overallPriority": null,
                                "categoryMemberships": [
                                    {
                                        "percentageOfSupport": null,
                                        "category": {
                                            "categoryId": "4050",
                                            "code": "CA1     ",
                                            "name": "Kategoria wyborna",
                                            "description": "opis kategorii ktory jest niezwykle wyczerpujï¿½cy",
                                            "categoryEvaluations": [
                                                {
                                                    "scoringCriterion": {
                                                        "scoringCriterionId": "3950",
                                                        "code": "ROI     ",
                                                        "name": "Return on investment",
                                                        "description": "Pi?kny opis tego czym ten wska?nik jest",
                                                        "question": null,
                                                        "bestIs": "MAX",
                                                        "minScore": null,
                                                        "maxScore": null
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                ],
                                "children": [
                                    {
                                        "health": null,
                                        "scope": null,
                                        "schedule": null,
                                        "budget": null,
                                        "componentType": "PROJECT",
                                        "componentId": "11310",
                                        "code": "PF1       ",
                                        "name": "portfolioProgramSubprogramProject",
                                        "customer": "customer jakis",
                                        "description": "Opis Opisik",
                                        "overallPriority": null,
                                        "categoryMemberships": [
                                            {
                                                "percentageOfSupport": null,
                                                "category": {
                                                    "categoryId": "4050",
                                                    "code": "CA1     ",
                                                    "name": "Kategoria wyborna",
                                                    "description": "opis kategorii ktory jest niezwykle wyczerpujï¿½cy",
                                                    "categoryEvaluations": [
                                                        {
                                                            "scoringCriterion": {
                                                                "scoringCriterionId": "3950",
                                                                "code": "ROI     ",
                                                                "name": "Return on investment",
                                                                "description": "Pi?kny opis tego czym ten wska?nik jest",
                                                                "question": null,
                                                                "bestIs": "MAX",
                                                                "minScore": null,
                                                                "maxScore": null
                                                            }
                                                        }
                                                    ]
                                                }
                                            }
                                        ],
                                        "children": [],
                                        "scores": [
                                            {
                                                "motivation": "To jes dla tego, ze jest",
                                                "score": 654.00,
                                                "scoringCriterion": {
                                                    "scoringCriterionId": "3950",
                                                    "code": "ROI     ",
                                                    "name": "Return on investment",
                                                    "description": "Pi?kny opis tego czym ten wska?nik jest",
                                                    "question": null,
                                                    "bestIs": "MAX",
                                                    "minScore": null,
                                                    "maxScore": null
                                                }
                                            }
                                        ]
                                    }
                                ],
                                "scores": [
                                    {
                                        "motivation": "To jes dla tego, ze jest",
                                        "score": 77.23,
                                        "scoringCriterion": {
                                            "scoringCriterionId": "3950",
                                            "code": "ROI     ",
                                            "name": "Return on investment",
                                            "description": "Pi?kny opis tego czym ten wska?nik jest",
                                            "question": null,
                                            "bestIs": "MAX",
                                            "minScore": null,
                                            "maxScore": null
                                        }
                                    }
                                ]
                            }
                        ],
                        "scores": []
                    },

                    {
                        "health": null,
                        "scope": null,
                        "schedule": null,
                        "budget": null,
                        "componentType": "PROJECT",
                        "componentId": "11301",
                        "code": "PF1       ",
                        "name": "portfolioProject",
                        "customer": "customer jakis",
                        "description": "Opis Opisik",
                        "overallPriority": 2,
                        "categoryMemberships": [
                            {
                                "percentageOfSupport": null,
                                "category": {
                                    "categoryId": "4050",
                                    "code": "CA1     ",
                                    "name": "Kategoria wyborna",
                                    "description": "opis kategorii ktory jest niezwykle wyczerpujï¿½cy",
                                    "categoryEvaluations": [
                                        {
                                            "scoringCriterion": {
                                                "scoringCriterionId": "3950",
                                                "code": "ROI     ",
                                                "name": "Return on investment",
                                                "description": "Pi?kny opis tego czym ten wska?nik jest",
                                                "question": null,
                                                "bestIs": "MAX",
                                                "minScore": null,
                                                "maxScore": null
                                            }
                                        }
                                    ]
                                }
                            }
                        ],
                        "children": [],
                        "scores": [
                            {
                                "motivation": "To jes dla tego, ze jest",
                                "score": 456.23,
                                "scoringCriterion": {
                                    "scoringCriterionId": "3950",
                                    "code": "ROI     ",
                                    "name": "Return on investment",
                                    "description": "Pi?kny opis tego czym ten wska?nik jest",
                                    "question": null,
                                    "bestIs": "MAX",
                                    "minScore": null,
                                    "maxScore": null
                                }
                            }
                        ]
                    }
                ],
                "scores": []
            }
        }
    },
    render:function(){

        return (
            <AppTemplate>
                <Locations>
                    <Location path="/" handler={ProjectMainPage} />
                    <Location path="/project-rank" handler={ProjectMainPage} />
                </Locations>
            </AppTemplate>
        );
    }
});
module.exports = App;