var request = require('superagent');

var ServerActionCreator = require('../actions/ServerActionCreator');
var AppConstants = require('../constants/AppConstants');

var UserStore = require('../stores/UserStore');

var APIEndpoints = AppConstants.APIEndpoints;

var WebAPIUtils = {
    //FROM VIEWS
    login: function(email, password) {
        //console.log("API: login "+email);
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
    createScore: function(componentId, scoringCriterionId) {
        //console.log("API: login "+email);
        request.post(APIEndpoints.CLEAN_PATH+'/projects/'+componentId+'/scoring_criteria/'+scoringCriterionId+'/create_score')
            .set('Accept', 'application/json')
            .end(function(error, res){
                if (res) {
                    if (res.error) {
                        var errorMsgs = res.error;
                        ServerActionCreator.receivePortfolioError(errorMsgs);
                    } else {
                        var portfolio = JSON.parse(res.text);
                        ServerActionCreator.receivePortfolio(portfolio);
                    }
                }
            });
    },
    createDecision:function(componentId,stateId,nextStateId,decisionState,decisionType,motivation) {
        var dataToPost={ fromStateId: stateId, toStateId: nextStateId, decisionState: decisionState, decisionType: decisionType, motivation: motivation };
        console.log("dataToPost");
        console.log(dataToPost);
        request.post(APIEndpoints.CLEAN_PATH+'/projects/'+componentId+'/decisions')
            .send(dataToPost)
            .set('Accept', 'application/json')
            .end(function(error, res){
                if (res) {
                    if (res.error) {
                        var errorMsgs = res.error;
                        ServerActionCreator.receivePortfolioError(errorMsgs);
                    } else {
                        var portfolio = JSON.parse(res.text);
                        ServerActionCreator.receivePortfolio(portfolio);
                    }
                }
            });
    },
    updateDecision: function(componentId, decision) {
        //console.log("savePortfolio!!! ");
        console.log("API: Decision update");
        console.log(decision);

        request.put(APIEndpoints.CLEAN_PATH+'/projects/'+componentId+'/decisions/'+decision.decisionId)
            .send(decision)
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
    //FROM STORES
    //USER STORE
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
    //PORTFOLIO STORE
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
        //console.log("savePortfolio!!! ");
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