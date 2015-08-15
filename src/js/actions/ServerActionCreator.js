var AppConstants = require('../constants/AppConstants');
var AppDispatcher = require('../dispatcher/AppDispatcher');

var ActionTypes = AppConstants.ActionTypes;

module.exports = {

    receivePortfolio: function(portfolio) {
        AppDispatcher.handleServerAction({
            actionType: ActionTypes.RECEIVE_PORTFOLIO,
            portfolio: portfolio
        });
    },
    receiveError: function(error) {
        AppDispatcher.handleServerAction({
            actionType: ActionTypes.RECEIVE_ERROR,
            error: error
        });
    },
    receiveLogin: function(user, errors) {
        SmallAppDispatcher.handleServerAction({
          type: ActionTypes.LOGIN_RESPONSE,
          user: user,
          errors: errors
        });
    },            
};