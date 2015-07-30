var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';


/* MODEL */
var _store = {
    nrOfChanges:0,
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
                        "name": "portfolio Program Project",
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
                            },
                            {
                                "percentageOfSupport": "55",
                                "rankInCategory":"1",
                                "category": {
                                    "categoryId": "4055",
                                    "code": "CA1     ",
                                    "name": "Kategoria druga",
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
};
/* MODEL */
/* PRIVATE ACTIONS - STORE LOGIC */
var createComponent = function(component, parentId){

};

var updateComponent = function(updatedComponent){
    var parentComponent=_getParentComponent(updatedComponent.componentId, _store.portfolio);
    for (var i = 0;parentComponent.children[i];i++) {
        if(parentComponent.children[i].componentId === updatedComponent.componentId){
            parentComponent.children[i]=updatedComponent;
            console.log(parentComponent.children[i].name);
        }
    }
};

var removeComponent = function(componentId){

};
/* PRIVATE ACTIONS - STORE LOGIC */
/* PRIVATE STORE HELPERS */
var _getComponentById = function(id, rootComponent){
    var children = rootComponent.children;
    //console.log("LOOKING FOR COMPONENT BY ID");

    for (var i = 0;children[i];i++) {
        //console.log(children[i].componentId.concat(" ").concat(children[i].componentType));
        if(children[i].componentId === id){
            return children[i];
        }
        if(children[i].componentType === "PROGRAM") {
            var foundedComponent = _getComponentById(id, children[i]);
            //console.log(foundedComponent);
            if (foundedComponent !== null){
                return foundedComponent;
            }
        }
    }
    return null;
};
var _getParentComponent = function(id, rootComponent) {
    var children = rootComponent.children;
    //console.log("LOOKING FOR PARENT");

    for (var i = 0;children[i];i++) {
        //console.log(children[i].name.concat(" ").concat(children[i].componentType));
        if(children[i].componentId === id){
            return rootComponent;
        }
        if(children[i].componentType === "PROGRAM") {
            var foundedComponent = _getParentComponent(id, children[i]);
            //console.log("success");
            //console.log(foundedComponent);

            if (foundedComponent !== null){
                return foundedComponent;
            }
        }
    }
    return null;
};

/* PRIVATE STORE HELPERS */
/* PUBLIC GETTERS & LISTENERS & EMITTER - STORE API */
var PortfolioStore = objectAssign({}, EventEmitter.prototype, {
    addChangeListener: function(cb){
        this.on(CHANGE_EVENT, cb);
    },
    removeChangeListener: function(cb){
        this.removeListener(CHANGE_EVENT, cb);
    },

    emitChange: function() {
        this.emit('change');
    },
    getPortfolio: function(){
        return _store.portfolio;
    },
    getProject: function(projectId){
        var project=_getComponentById(projectId, _store.portfolio);
        if(project !== null && project.componentType === "PROJECT") {
            console.log(project.name);
            return project;
        }
        return null;
    },
    getParent: function(childId){
        var component=_getParentComponent(childId, _store.portfolio);
        if(component !== null ) {
            return component;
        }
        return null;
    },

});
/* PUBLIC GETTERS & LISTENERS & EMITTER - STORE API */
/* LISTEN FOR DISPATCHER & AND CHOOSE ACTION TO PERFORM */
AppDispatcher.register(function(payload){
    var action = payload.action;
    switch(action.actionType){
        case appConstants.CREATE_COMPONENT:
            createComponent(action.component,action.parentId);
            PortfolioStore.emitChange(CHANGE_EVENT);
            break;
        case appConstants.UPDATE_COMPONENT:
            updateComponent(action.component);
            PortfolioStore.emitChange(CHANGE_EVENT);
            break;
        case appConstants.REMOVE_COMPONENT:
            removeComponent(action.componentId);
            PortfolioStore.emitChange(CHANGE_EVENT);
            break;
        default:
            return true;
    }
});
/* LISTEN FOR DISPATCHER & AND CHOOSE ACTION TO PERFORM */

module.exports = PortfolioStore;