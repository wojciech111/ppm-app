var AppConstants = require('../constants/AppConstants');
var AppDispatcher = require('../dispatcher/AppDispatcher');

var WebAPIUtils = require('../utils/WebAPIUtils.js');

var ActionTypes = AppConstants.ActionTypes;

var AppActions = {
    loadPortfolio: function(portfolioId){
        AppDispatcher.handleViewAction({
            actionType: ActionTypes.LOAD_PORTFOLIO,
            portfolioId: portfolioId
        })
        WebAPIUtils.loadPortfolio(portfolioId);
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
};

module.exports = AppActions;