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
    loadPortfolio: function(portfolioId){
        AppDispatcher.handleViewAction({
         actionType: ActionTypes.LOAD_PORTFOLIO,
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
    }
    //Portfolio
};

module.exports = ViewActionCreator;