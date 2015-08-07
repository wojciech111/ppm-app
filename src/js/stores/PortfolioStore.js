var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

var AppConstants = require('../constants/AppConstants');
var WebAPIUtils = require('../utils/WebAPIUtils');
var AppDispatcher = require('../dispatcher/AppDispatcher');

var ActionTypes = AppConstants.ActionTypes;
var StoreStatuses = AppConstants.StoreStatuses;
var CHANGE_EVENT = 'change';


/* MODEL */
var _store = {
    portfolio: null
};
var _state = {
    status: StoreStatuses.EMPTY,
    nrOfChanges:0, //when modified
    errors: [],
    currentPortfolioId: null
};
/* MODEL */
/* PRIVATE ACTIONS - STORE LOGIC */

//FROM VIEWS
var createComponent = function(component, parentId){

};

var updateComponent = function(updatedComponent){
    var parentComponent=_getParentComponent(updatedComponent.componentId, _store.portfolio);
    for (var i = 0;parentComponent.children[i];i++) {
        if(parentComponent.children[i].componentId === updatedComponent.componentId){
            parentComponent.children[i]=updatedComponent;
            //console.log(parentComponent.children[i].name);
        }
    }
    _markModification();
};

var loadPortfolio = function(portfolioId){
    if(_state.status === StoreStatuses.EMPTY){
        _state.status = StoreStatuses.WAITING_FOR_DATA;
        _state.currentPortfolioId = portfolioId;
    }
};
//FROM SERVER
var receivePortfolio = function(newPortfolio){
    if(newPortfolio) {
        _store.portfolio = newPortfolio;
        _state.status = StoreStatuses.UP_TO_DATE;
        _state.nrOfChanges = 0;
        _state.errors = [];
        _state.currentPortfolioId = newPortfolio.componentId;
    }
};
var receiveError = function(error){
    if(error) {
        _state.errors.push(error);
    }
    if(_state.status === StoreStatuses.WAITING_FOR_DATA){
        _state.status = StoreStatuses.EMPTY;
        _state.currentPortfolioId = null;
    }
};

/* PRIVATE ACTIONS - STORE LOGIC */
/* PRIVATE STORE HELPERS */
var _getComponentById = function(id, rootComponent){
    var children = rootComponent.children;
    //console.log("LOOKING FOR COMPONENT BY ID");

    for (var i = 0;children[i];i++) {
        //console.log(children[i].componentId.concat(" ").concat(children[i].componentType));
        if(children[i].componentId === id){
            return children[i];
        }
        if(children[i].componentType === "PROGRAM") {
            var foundedComponent = _getComponentById(id, children[i]);
            //console.log(foundedComponent);
            if (foundedComponent !== null){
                return foundedComponent;
            }
        }
    }
    return null;
};
var _getParentComponent = function(id, rootComponent) {
    var children = rootComponent.children;
    //console.log("LOOKING FOR PARENT");

    for (var i = 0;children[i];i++) {
        //console.log(children[i].name.concat(" ").concat(children[i].componentType));
        if(children[i].componentId === id){
            return rootComponent;
        }
        if(children[i].componentType === "PROGRAM") {
            var foundedComponent = _getParentComponent(id, children[i]);
            //console.log("success");
            //console.log(foundedComponent);

            if (foundedComponent !== null){
                return foundedComponent;
            }
        }
    }
    return null;
};
var _markModification = function(){
    if(_state.status === StoreStatuses.UP_TO_DATE || _state.status === StoreStatuses.MODIFIED){
        _state.status =StoreStatuses.MODIFIED;
        _state.nrOfChanges=_state.nrOfChanges+1;
        return true;
    } else {
        _state.errors.push("Store was in incorrect state for modification");
        return false;
    }
};
/* PRIVATE STORE HELPERS */

var PortfolioStore = objectAssign({}, EventEmitter.prototype, {
    /* EMITTER SUBSCRIPTION */
    addChangeListener: function(cb){
        this.on(CHANGE_EVENT, cb);
    },
    removeChangeListener: function(cb){
        this.removeListener(CHANGE_EVENT, cb);
    },
    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },
    /* EMITTER SUBSCRIPTION */
    /* STORE STATUS INFO */
    getStatus: function(){
        return _state.status;
    },
    getErrors: function() {
        return _state.errors;
    },
    getCurrentPortfolioId: function() {
        return _state.currentPortfolioId;
    },
    /* STORE STATUS INFO */
    /* PUBLIC GETTERS */
    getPortfolio: function(){
        return _store.portfolio;
    },
    getProject: function(projectId){
        var project=_getComponentById(projectId, _store.portfolio);
        if(project !== null && project.componentType === "PROJECT") {
            //console.log(project.name);
            return project;
        }
        return null;
    },
    getProgram: function(programId){
        var program=_getComponentById(programId, _store.portfolio);
        if(program !== null && program.componentType === "PROGRAM") {
            //console.log(project.name);
            return program;
        }
        return null;
    },
    getParent: function(childId){
        var component=_getParentComponent(childId, _store.portfolio);
        if(component !== null ) {
            return component;
        }
        return null;
    },
    /* PUBLIC GETTERS */

});

/* LISTEN FOR DISPATCHER & AND CHOOSE ACTION TO PERFORM */
AppDispatcher.register(function(payload){
    var action = payload.action;
    switch(action.actionType){
        /*ACTIONS FROM VIEWS */
        case ActionTypes.CREATE_COMPONENT:
            createComponent(action.component,action.parentId);
            PortfolioStore.emitChange(CHANGE_EVENT);
            break;
        case ActionTypes.UPDATE_COMPONENT:
            updateComponent(action.component);
            PortfolioStore.emitChange(CHANGE_EVENT);
            break;
        case ActionTypes.LOAD_PORTFOLIO:
            loadPortfolio(action.portfolioId);
            PortfolioStore.emitChange(CHANGE_EVENT);
            break;
        /*ACTIONS FROM VIEWS */
        /*ACTIONS FROM SERVER */
        case ActionTypes.RECEIVE_PORTFOLIO:
            receivePortfolio(action.portfolio);
            PortfolioStore.emitChange(CHANGE_EVENT);
            break;
        case ActionTypes.RECEIVE_ERROR:
            receiveError(action.error);
            PortfolioStore.emitChange(CHANGE_EVENT);
            break;
        /*ACTIONS FROM SERVER */

    }
    return true;
});
/* LISTEN FOR DISPATCHER & AND CHOOSE ACTION TO PERFORM */

module.exports = PortfolioStore;