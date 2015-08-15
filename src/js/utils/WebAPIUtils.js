var request = require('superagent');

var ServerActionCreator = require('../actions/ServerActionCreator');
var AppConstants = require('../constants/AppConstants');


var APIEndpoints = AppConstants.APIEndpoints;

var WebAPIUtils = {

    login: function(email, password) {
        console.log("API: login "+email);
        request.post(APIEndpoints.LOGIN)
            .send({ email: email, password: password, grant_type: 'password' })
            .set('Accept', 'application/json')
            .end(function(error, res){
                if (res) {
                    if (res.error) {
                        var errorMsgs = _getErrors(res);
                        ServerActionCreator.receiveLogin(null, errorMsgs);
                    } else {
                        json = JSON.parse(res.text);
                        ServerActionCreator.receiveLogin(json, null);
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
                        ServerActionCreator.receiveError(errorMsgs);
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
                        ServerActionCreator.receiveError(errorMsgs);
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