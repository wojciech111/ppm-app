var AppDispatcher = require('../dispatcher/AppDispatcher');
//Constants
var AppConstants = require('../constants/AppConstants');
var ActionTypes = AppConstants.ActionTypes;

module.exports = {

    receivePortfolio: function(portfolio) {
        AppDispatcher.handleServerAction({
            actionType: ActionTypes.RECEIVE_PORTFOLIO,
            portfolio: portfolio
        });
    },
    receivePortfolioError: function(error) {
        AppDispatcher.handleServerAction({
            actionType: ActionTypes.RECEIVE_PORTFOLIO_ERROR,
            error: error
        });
    },
    receiveUser: function(user) {
        AppDispatcher.handleServerAction({
            actionType: ActionTypes.RECEIVE_USER,
            user: user
        });
    },
    receiveUserError: function(error) {
        AppDispatcher.handleServerAction({
            actionType: ActionTypes.RECEIVE_USER_ERROR,
            error: error
        });
    },
    /*receiveLogin: function(user,token, errors) {
        AppDispatcher.handleServerAction({
          type: ActionTypes.LOGIN_RESPONSE,
          user: user,
          errors: errors
        });
    },   */
};