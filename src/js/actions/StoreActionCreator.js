var AppConstants = require('../constants/AppConstants');
var AppDispatcher = require('../dispatcher/AppDispatcher');

var WebAPIUtils = require('../utils/WebAPIUtils.js');

var ActionTypes = AppConstants.ActionTypes;

var StoreActionCreator = {
    savePortfolio: function(portfolio){
        /*AppDispatcher.handleStoreAction({
            actionType: ActionTypes.SAVE_PORTFOLIO,
            portfolio: portfolio
        })*/
        WebAPIUtils.savePortfolio(portfolio);
    },
    loadPortfolio: function(portfolioId){
        /*AppDispatcher.handleStoreAction({
            actionType: ActionTypes.LOAD_PORTFOLIO,
            portfolioId: portfolioId
        })*/
        WebAPIUtils.loadPortfolio(portfolioId);
    },
    loadUser: function(userId){
        /*AppDispatcher.handleStoreAction({
            actionType: ActionTypes.LOAD_USER,
            userId: userId
        })*/
        WebAPIUtils.loadUser(userId);
    }
};

module.exports = StoreActionCreator;