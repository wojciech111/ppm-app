var appConstants = require('../constants/appConstants');
var AppDispatcher = require('../dispatcher/AppDispatcher');

var AppActions = {
    /*addItem: function(index){
        AppDispatcher.handleViewAction({
            actionType: appConstants.LOAD_PORTFOLIO,
            item: index
        })
    },
    removeItem: function(item){
        AppDispatcher.handleViewAction({
            actionType: appConstants.SAVE_PORTFOLIO,
            index: item
        })
    }*/
    createComponent: function(component, parentId){
        AppDispatcher.handleViewAction({
            actionType: appConstants.CREATE_COMPONENT,
            component: component,
            parentId: parentId
        })
    },
    updateComponent: function(component){
        AppDispatcher.handleViewAction({
            actionType: appConstants.UPDATE_COMPONENT,
            component: component
        })
    },
    removeComponent: function(componentId){
        AppDispatcher.handleViewAction({
            actionType: appConstants.REMOVE_COMPONENT,
            componentId: componentId
        })
    }
};

module.exports = AppActions;