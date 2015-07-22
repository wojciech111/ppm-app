var AppConstants = require('../constants/AppConstants');
var AppDispatcher = require('../dispatchers/AppDispatcher');

var AppActions = {
    addItem: function(index){
        AppDispatcher.handleViewAction({
            actionType: AppConstants.LOAD_PORTFOLIO,
            item: index
        })
    },
    removeItem: function(item){
        AppDispatcher.handleViewAction({
            actionType: AppConstants.SAVE_PORTFOLIO,
            index: item
        })
    }
};

module.exports = AppActions;