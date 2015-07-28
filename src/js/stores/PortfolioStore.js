var AppDispatcher = require('../dispatchers/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var assign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _user={
    "userId": "5246",
    "name": "Wojciech111",
    "employees": [
        {
            "employeeId": "324",
            "firstName": "Wojciech",
            "secondName": "Oksinski",
            "organization": {
                "organizationId": "322134",
                "name": "hiStory_Machine",
                "portfolios": [
                    {
                        "componentId": "11300",
                        "code": "PT        ",
                        "name": "portfolioTop",
                        "customer": "customer jakis",
                        "description": "Opis Opisik"
                    },
                    {
                        "componentId": "222222",
                        "code": "22        ",
                        "name": "portfolio22",
                        "customer": "customer ",
                        "description": "Opis "
                    }
                ]
            }
        },

    ],
};

var _portfolio = {
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
};
/*
function _increaseItem(index){
    _cartItems[index].qty++;
}

function _decreaseItem(index){
    if(_cartItems[index].qty>1){
        _cartItems[index].qty--;
    }
    else {
        _removeItem(index);
    }
}

function _addItem(item){
    if(!item.inCart){
        item['qty'] = 1;
        item['inCart'] = true;
        _cartItems.push(item);
    }
    else {
        _cartItems.forEach(function(cartItem, i){
            if(cartItem.id===item.id){
                _increaseItem(i);
            }
        });
    }
}

function _cartTotals(){
    var qty =0, total = 0;
    _cartItems.forEach(function(cartItem){
        qty+=cartItem.qty;
        total+=cartItem.qty*cartItem.cost;
    });
    return {'qty': qty, 'total': total};
}
*/
var AppStore = assign(EventEmitter.prototype, {
    emitChange: function(){
        this.emit(CHANGE_EVENT)
    },

    addChangeListener: function(callback){
        this.on(CHANGE_EVENT, callback)
    },

    removeChangeListener: function(callback){
        this.removeListener(CHANGE_EVENT, callback)
    },

    getPortfolio: function(){
        return _portfolio
    },

    getUser: function(){
        return _user
    },
    _getComponentById:function(id, rootComponent){
        var children = rootComponent.children;
        //console.log("LOOKING FOR COMPONENT BY ID");

        for (var i = 0;children[i];i++) {
            //console.log(children[i].componentId.concat(" ").concat(children[i].componentType));
            if(children[i].componentId === id){
                return children[i];
            }
            if(children[i].componentType === "PROGRAM") {
                var foundedComponent = this._getComponentById(id, children[i]);
                //console.log(foundedComponent);
                if (foundedComponent !== null){
                    return foundedComponent;
                }
            }
        }
        return null;
    },
    getProject: function(projectId){
        var project=this._getComponentById(projectId, _portfolio);
        if(project !== null && project.componentType === "PROJECT") {
            return project;
        }
        return null;
    },
    _getParentComponent: function(id, rootComponent) {
        var children = rootComponent.children;
        //console.log("LOOKING FOR PARENT");

        for (var i = 0;children[i];i++) {
            //console.log(children[i].name.concat(" ").concat(children[i].componentType));
            if(children[i].componentId === id){
                return rootComponent;
            }
            if(children[i].componentType === "PROGRAM") {
                var foundedComponent = this._getParentComponent(id, children[i]);
                //console.log("success");
                //console.log(foundedComponent);

                if (foundedComponent !== null){
                    return foundedComponent;
                }
            }
        }
        return null;
    },
    getParent: function(id){
        var component=this._getParentComponent(id, _portfolio);
        if(component !== null ) {
            return component;
        }
        return null;
    },
    getPortfolioCategories: function(){
        var categories = [];

    }

/*
    dispatcherIndex: AppDispatcher.register(function(payload){
        var action = payload.action; // this is our action from handleViewAction
        switch(action.actionType){
            case AppConstants.LOAD_PORTFOLIO:
                _loadPortfolio(payload.action.index);
                break;

            case AppConstants.SAVE_PORTFOLIO:
                _savePortfolio(payload.action.item);
                break;
        }

        AppStore.emitChange();

        return true;
    })
*/
});

module.exports = AppStore;