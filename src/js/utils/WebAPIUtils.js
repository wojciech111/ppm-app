var request = require('superagent');

var ServerActionCreators = require('../actions/ServerActionCreator');
var AppConstants = require('../constants/AppConstants');


var APIEndpoints = AppConstants.APIEndpoints;

var WebAPIUtils = {

    /*login: function(email, password) {
        request.post('http://localhost:3002/v1/login')
            .send({ username: email, password: password, grant_type: 'password' })
            .set('Accept', 'application/json')
            .end(function(error, res){
                if (res) {
                    if (res.error) {
                        var errorMsgs = _getErrors(res);
                        ServerActionCreators.receiveLogin(null, errorMsgs);
                    } else {
                        json = JSON.parse(res.text);
                        ServerActionCreators.receiveLogin(json, null);
                    }
                }
            });
    },*/
    loadPortfolio: function(portfolioId) {
        //console.log("loadPortfolio");
        request.get(APIEndpoints.PORTFOLIO+'/'+portfolioId)
            .set('Accept', 'application/json')
            .end(function(error, res){
                if (res) {
                    if (res.error) {
                        var errorMsgs = res.error;
                        //console.log(errorMsgs);
                        ServerActionCreators.receiveError(errorMsgs);
                    } else {
                        var portfolio = JSON.parse(res.text);
                        //console.log(portfolio);
                        ServerActionCreators.receivePortfolio(portfolio);
                    }
                }
            });
    },
};

module.exports = WebAPIUtils;