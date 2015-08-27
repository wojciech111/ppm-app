var AppDispatcher = require('../dispatcher/AppDispatcher');
//Constants
var AppConstants = require('../constants/AppConstants');
var ActionTypes = AppConstants.ActionTypes;
//API utils
var WebAPIUtils = require('../utils/WebAPIUtils.js');



var StoreActionCreator = {
    savePortfolio: function(portfolio){
            WebAPIUtils.savePortfolio(portfolio);
    },
    loadPortfolio: function(portfolioId) {
             WebAPIUtils.loadPortfolio(portfolioId);
    },
    loadUser: function(userId){
            WebAPIUtils.loadUser(userId);
    }
};

module.exports = StoreActionCreator;