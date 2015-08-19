var request = require('superagent');

var ServerActionCreator = require('../actions/ServerActionCreator');
var AppConstants = require('../constants/AppConstants');


var APIEndpoints = AppConstants.APIEndpoints;

var WebAPIUtils = {

    login: function(email, password) {
        console.log("API: login "+email);
        request.post(APIEndpoints.LOGIN)
            .send({ email: email, password: password, grantType: 'password' })
            .set('Accept', 'application/json')
            .end(function(error, res){
                if (res) {
                    if (res.error) {
                        var errorMsgs = res.error;
                        ServerActionCreator.receiveUserError(errorMsgs);
                    } else {
                        user = JSON.parse(res.text);
                        ServerActionCreator.receiveUser(user);
                    }
                }
            });
    },
    loadUser: function(userId) {
        //console.log("loadUser");
        request.get(APIEndpoints.USER+'/'+userId)
            .set('Accept', 'application/json')
            .end(function(error, res){
                if (res) {
                    if (res.error) {
                        var errorMsgs = res.error;
                        //console.log(errorMsgs);
                        ServerActionCreator.receiveUserError(errorMsgs);
                    } else {
                        var user = JSON.parse(res.text);
                        //console.log(portfolio);
                        ServerActionCreator.receiveUser(user);
                    }
                }
            });
    },
    loadPortfolio: function(portfolioId) {
        //console.log("loadPortfolio");
        request.get(APIEndpoints.PORTFOLIO+'/'+portfolioId)
            .set('Accept', 'application/json')
            .end(function(error, res){
                if (res) {
                    if (res.error) {
                        var errorMsgs = res.error;
                        //console.log(errorMsgs);
                        ServerActionCreator.receivePortfolioError(errorMsgs);
                    } else {
                        var portfolio = JSON.parse(res.text);
                        //console.log(portfolio);
                        ServerActionCreator.receivePortfolio(portfolio);
                    }
                }
            });
    },
    savePortfolio: function(modifiedPortfolio) {
        console.log("savePortfolio!!! ");
        console.log(modifiedPortfolio);
        request.put(APIEndpoints.PORTFOLIO+'/'+modifiedPortfolio.componentId)
            .send(modifiedPortfolio)
            .end(function(error, res){
                if (res) {
                    if (res.error) {
                        var errorMsgs = res.error;
                        //console.log(errorMsgs);
                        ServerActionCreator.receivePortfolioError(errorMsgs);
                    } else {
                        var portfolio = JSON.parse(res.text);
                        //console.log(portfolio);
                        ServerActionCreator.receivePortfolio(portfolio);
                    }
                }
            });

    },
};

module.exports = WebAPIUtils;