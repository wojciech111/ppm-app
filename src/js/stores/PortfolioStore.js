var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

var AppConstants = require('../constants/AppConstants');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var StoreActionCreator = require('../actions/StoreActionCreator');

var UserStore = require('../stores/UserStore');

var ActionTypes = AppConstants.ActionTypes;
var StoreStatuses = AppConstants.StoreStatuses;
var CHANGE_EVENT = 'change';

//

/* MODEL */
var _store = {
    portfolio: null
};
var _state = {
    status: StoreStatuses.EMPTY,
    loading: false,
    nrOfChanges:0, //when modified
    errors: [],
    portfolioId: null,
    messages:[],
    autosave: true
};
/* MODEL */
/* STATE MANAGEMENT*/
var _canServeData = function(){
    //console.log("PortfolioStore: _canServeData "+_state.status);
    if(_state.status === StoreStatuses.EMPTY ){
        console.log("_state.portfolioId="+_state.portfolioId+", UserStore.haveUser()="+UserStore.haveUser())
        if(_state.portfolioId !== null && UserStore.haveUser()) {
            _state.status = StoreStatuses.WAITING_FOR_DATA;
            StoreActionCreator.loadPortfolio(_state.portfolioId);
        }
        return false;
    } else if(_state.status === StoreStatuses.WAITING_FOR_DATA ){
        return false;
    } else if(_state.status === StoreStatuses.UP_TO_DATE ){
        return true;
    } else if(_state.status === StoreStatuses.MODIFIED ){
        return true;
    } else if(_state.status === StoreStatuses.SAVING ){
        return true;
    }
};
var _canModifyData = function(){
    //console.log("PortfolioStore: _canModifyData "+_state.status);
    if(_state.status === StoreStatuses.EMPTY ){
        console.log("PortfolioStore: Store was in incorrect state for modification!!!");
        return false;
    } else if(_state.status === StoreStatuses.WAITING_FOR_DATA ){
        console.log("PortfolioStore: Store was in incorrect state for modification!!!");
        return false;
    } else if(_state.status === StoreStatuses.UP_TO_DATE ){
        _state.status = StoreStatuses.MODIFIED;
        _state.nrOfChanges=_state.nrOfChanges+1;
        return true;
    } else if(_state.status === StoreStatuses.MODIFIED ){
        _state.nrOfChanges=_state.nrOfChanges+1;
        return true;
    } else if(_state.status === StoreStatuses.SAVING ){
        _state.status = StoreStatuses.MODIFIED;
        _state.nrOfChanges=_state.nrOfChanges+1;
        return true;
    }
};
var _updateData = function(){
    //console.log("PortfolioStore: _updateData "+_state.status);

    if(_state.status === StoreStatuses.EMPTY ){
        _state.status = StoreStatuses.UP_TO_DATE;
        _state.nrOfChanges=0;
        _state.errors = [];
        return true;
    } else if(_state.status === StoreStatuses.WAITING_FOR_DATA ){
        _state.status = StoreStatuses.UP_TO_DATE;
        _state.nrOfChanges=0;
        _state.errors = [];
        return true;
    } else if(_state.status === StoreStatuses.UP_TO_DATE ){
        _state.status = StoreStatuses.UP_TO_DATE;
        _state.nrOfChanges=0;
        _state.errors = [];
        return true;
    } else if(_state.status === StoreStatuses.MODIFIED ){
        return false;
    } else if(_state.status === StoreStatuses.SAVING ){
        _state.status = StoreStatuses.UP_TO_DATE;
        _state.nrOfChanges=0;
        _state.errors = [];
        return true;
    }
};
var _autosaveData = function(){
    //console.log("PortfolioStore: _autosaveData "+_state.status);
    if(_state.autosave && _state.status === StoreStatuses.MODIFIED){
        StoreActionCreator.savePortfolio(_store.portfolio);
        _state.status = StoreStatuses.SAVING;
    }
};
/* STATE MANAGEMENT*/
/* PRIVATE ACTIONS - STORE LOGIC */

//FROM VIEWS
var logout = function(){
    _clearStore();
    console.log("PortfolioStore: LOGOUT!!!");
}
var updateComponent = function(updatedComponent){
    if(_canModifyData()) {
        //console.log(_store.portfolio);
        //console.log(updatedComponent);
        if (_store.portfolio.componentId === updatedComponent.componentId) {
            _store.portfolio=updatedComponent;
        }else {
            var parentComponent = _getParentComponent(updatedComponent.componentId, _store.portfolio);
            for (var i = 0; parentComponent.children[i]; i++) {
                if (parentComponent.children[i].componentId === updatedComponent.componentId) {
                    parentComponent.children[i] = updatedComponent;
                    //console.log(parentComponent.children[i].name);
                }
            }
        }
        _autosaveData();
    }

};
var changePortfolio = function(portfolioId){
    if( _state.portfolioId !== portfolioId){
        console.log("CHANGE PORTFOLIO IN STORE from "+ _state.portfolioId+" to "+portfolioId);
        _clearStore();
        _state.portfolioId = portfolioId;
        _canServeData();
    }
};
//FROM SERVER
var receivePortfolio = function(newPortfolio){
    if(_updateData()) {
        //localStorage.setItem('portfolioId',newPortfolio.componentId);
        //console.log("localStorage.setItem('portfolioId', "+localStorage.getItem('portfolioId')+")");
        _store.portfolio = newPortfolio;
    }
};
var receiveError = function(error){
    if(error) {
        _state.errors.push(error);
    }
    if(_state.status === StoreStatuses.WAITING_FOR_DATA){
        _state.status = StoreStatuses.EMPTY;
    }
    if(_state.status === StoreStatuses.SAVING){
        _state.status = StoreStatuses.MODIFIED;
    }
};

/* PRIVATE ACTIONS - STORE LOGIC */
/* PRIVATE STORE HELPERS */
var _getComponentById = function(id, rootComponent){
    var children = rootComponent.children;
    //console.log("PortfolioStore: LOOKING FOR COMPONENT BY ID");

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
    //console.log("PortfolioStore: LOOKING FOR PARENT");

    for (var i = 0;children[i];i++) {
        //console.log(children[i].name.concat(" ").concat(children[i].componentType));
        if(children[i].componentId === id){
            return rootComponent;
        }
        if(children[i].componentType === "PROGRAM") {
            var foundedComponent = _getParentComponent(id, children[i]);
            //console.log("PortfolioStore: success");
            //console.log(foundedComponent);

            if (foundedComponent !== null){
                return foundedComponent;
            }
        }
    }
    return null;
};
var _clearStore = function(){
    _store.portfolio=null;
    _state.status=StoreStatuses.EMPTY;
    //_state.portfolioId=null;
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
        console.log("PortfolioStore: CHANGE_EVENT");
        this.emit(CHANGE_EVENT);
    },
    /* EMITTER SUBSCRIPTION */
    /* STORE STATUS INFO */
    isPortfolioChoosen: function(){
      return !(_state.portfolioId === null);
    },
    havePortfolio: function(){
        //console.log("PORTFOLIO: _state.status:"+_state.status +", _canServeData():"+ _canServeData());
        return _canServeData();
    },
    getErrors: function() {
        return _state.errors;
    },
    isLoading: function() {
          if(_state.status === StoreStatuses.WAITING_FOR_DATA || _state.status === StoreStatuses.SAVING){
              return true;
          } else {
              return false;
          }
    },
    /*
    getStatus: function(){
        return _state.status;
    },
     */
    getCurrentPortfolioId: function() {
        return _state.portfolioId;
    },

    /* STORE STATUS INFO */
    /* PUBLIC GETTERS */
    getAllProjects: function() {
        var projects = [];
        //var portfolio = this.state.portfolio;
        if(_canServeData()) {
            //console.log(_store.portfolio);
            //console.log(_store.portfolio.children.length);
            for (var i = 0; i<_store.portfolio.children.length; i++) {
                var portfolioChild = _store.portfolio.children[i];
                ////console.log(_store.portfolio.children[i].componentId+" "+_store.portfolio.children[i].componentType);
                //console.log("portfolioChild.componentType="+portfolioChild.componentType);

                if (portfolioChild.componentType === "PROJECT") {
                    //console.log("projects.push(portfolioChild)"+portfolioChild.componentId );

                    projects.push(portfolioChild);
                } else if (portfolioChild.componentType === "PROGRAM") {
                    for (var j = 0; j<portfolioChild.children.length; j++) {
                        var programChild = portfolioChild.children[j];
                        //console.log("programChild.componentType="+programChild.componentType);

                        if (programChild.componentType === "PROJECT") {
                            //console.log("projects.push(programChild)"+programChild.componentId );

                            projects.push(programChild);
                        } else if (programChild.componentType === "PROGRAM") {
                            //console.log(programChild);
                            //console.log(programChild.children);

                            for (var k = 0; k<programChild.children.length; k++) {
                                //console.log("k:"+k);
                                //console.log(programChild.children[k]);

                                var subbprogramChild = programChild.children[k];
                                //console.log("subbprogramChild:"+subbprogramChild);
                                //console.log("subbprogramChild.componentType="+subbprogramChild.componentType);
                                if (subbprogramChild.componentType === "PROJECT") {
                                    //console.log("projects.push(subbprogramChild)"+subbprogramChild.componentId );
                                    projects.push(subbprogramChild);
                                }
                            }
                        }
                    }
                }
            }
        }
        //console.log(projects);
        return projects;
    },
    getAllProcesses:function(){
        return _store.portfolio.processes;
    },
    getPortfolio: function(){
        if(_canServeData()) {
            return _store.portfolio;
        } else {
            return null;
        }
    },
    getProgram: function(programId){
        if(_canServeData()) {
            var program = _getComponentById(programId, _store.portfolio);
            if (program !== null && program.componentType === "PROGRAM") {
                //console.log(project.name);
                return program;
            }
        }
        return null;
    },
    getProject: function(projectId){
        if(_canServeData()) {
            //console.log("PortfolioStore: search project "+_store.portfolio);
            var project = _getComponentById(projectId, _store.portfolio);
            if (project !== null && project.componentType === "PROJECT") {
                //console.log("PortfolioStore: project "+project.name);
                return project;
            }
        }
        return null;
    },
    getParent: function(childId){
        if(_canServeData()) {
            var component = _getParentComponent(childId, _store.portfolio);
            if (component !== null) {
                return component;
            }
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
        case ActionTypes.LOGOUT:
            logout();
            PortfolioStore.emitChange(CHANGE_EVENT);
            break;
        case ActionTypes.UPDATE_COMPONENT:
            updateComponent(action.component);
            PortfolioStore.emitChange(CHANGE_EVENT);
            break;
        case ActionTypes.CHANGE_PORTFOLIO:
            changePortfolio(action.portfolioId);
            PortfolioStore.emitChange(CHANGE_EVENT);
            break;
        /*ACTIONS FROM VIEWS */
        /*ACTIONS FROM SERVER */
        case ActionTypes.RECEIVE_PORTFOLIO:
            receivePortfolio(action.portfolio);
            PortfolioStore.emitChange(CHANGE_EVENT);
            break;
        case ActionTypes.RECEIVE_PORTFOLIO_ERROR:
            receiveError(action.error);
            PortfolioStore.emitChange(CHANGE_EVENT);
            break;
        /*ACTIONS FROM SERVER */

    }
    return true;
});
/* LISTEN FOR DISPATCHER & AND CHOOSE ACTION TO PERFORM */

module.exports = PortfolioStore;