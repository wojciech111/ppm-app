var AppDispatcher = require('../dispatcher/AppDispatcher');
//Constants
var AppConstants = require('../constants/AppConstants');
var ActionTypes = AppConstants.ActionTypes;
//API utils
var WebAPIUtils = require('../utils/WebAPIUtils.js');

var ViewActionCreator = {
    //Session
    logout: function() {
        AppDispatcher.handleViewAction({
            actionType: ActionTypes.LOGOUT
        });
    },
    login: function(email, password) {
        AppDispatcher.handleViewAction({
            type: ActionTypes.LOGIN_REQUEST,
            email: email,
            password: password
        });
        WebAPIUtils.login(email, password);
    },
    //Session
    //Portfolio
    changePortfolio: function(portfolioId){
        AppDispatcher.handleViewAction({
         actionType: ActionTypes.CHANGE_PORTFOLIO,
         portfolioId: portfolioId
         })
        //WebAPIUtils.loadPortfolio(portfolioId);
    },
    createComponent: function(component, parentId){
        AppDispatcher.handleViewAction({
            actionType: ActionTypes.CREATE_COMPONENT,
            component: component,
            parentId: parentId
        })
    },
    updateComponent: function(component){
        AppDispatcher.handleViewAction({
            actionType: ActionTypes.UPDATE_COMPONENT,
            component: component
        })
    },
    removeComponent: function(componentId){
        AppDispatcher.handleViewAction({
            actionType: ActionTypes.REMOVE_COMPONENT,
            componentId: componentId
        })
    },
    //Portfolio
    //Categorization
    createScore: function(componentId, scoringCriterionId){
        AppDispatcher.handleViewAction({
            actionType: ActionTypes.CREATE_SCORE,
            componentId: componentId,
            scoringCriterionId: scoringCriterionId
        });
        WebAPIUtils.createScore(componentId, scoringCriterionId);

    },


    //Categorization
    //Process
    createDecision:function(componentId,stateId,nextStateId,decisionState,decisionType,motivation){
        AppDispatcher.handleViewAction({
            actionType: ActionTypes.CREATE_DECISION,
            componentId: componentId,
        });
        WebAPIUtils.createDecision(componentId,stateId,nextStateId,decisionState,decisionType,motivation);
    },
    updateDecision:function(decision){
        /*AppDispatcher.handleViewAction({
            actionType: ActionTypes.CREATE_DECISION,
            componentId: componentId,
        });
        WebAPIUtils.createDecision(componentId,stateId,nextStateId,decisionState,decisionType,motivation);
    */
    }
    //Process


};

module.exports = ViewActionCreator;