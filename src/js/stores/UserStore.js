var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

var AppConstants = require('../constants/AppConstants');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var StoreActionCreator = require('../actions/StoreActionCreator');

var ActionTypes = AppConstants.ActionTypes;
var StoreStatuses = AppConstants.StoreStatuses;
var CHANGE_EVENT = 'change';

// TODO zapisywanie userId zamienic na zapisywanie otrzymanego tokena do localstorage


/* MODEL */
var _store = {
    user: null
};
var _state = {
    status: StoreStatuses.EMPTY,
    nrOfChanges:0, //when modified
    errors: [],
    userId: null,
    messages:[],
    autosave: true
};
/* MODEL */
/* STATE MANAGEMENT*/
var _canServeData= function(){
    //console.log("UserStore: _canServeData "+_state.status);
    if(_state.status === StoreStatuses.EMPTY ){
        if(_state.userId !== null) {
            _state.status = StoreStatuses.WAITING_FOR_DATA;
            StoreActionCreator.loadUser(_state.userId);
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
    //console.log("UserStore: _canModifyData "+_state.status);
    if(_state.status === StoreStatuses.EMPTY ){
        console.log("UserStore: Store was in incorrect state for modification!!!");
        return false;
    } else if(_state.status === StoreStatuses.WAITING_FOR_DATA ){
        console.log("UserStore: Store was in incorrect state for modification!!!");
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
    //console.log("UserStore: _updateData "+_state.status);

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
    //console.log("UserStore: _autosaveData "+_state.status);
    if(_state.autosave && _state.status === StoreStatuses.MODIFIED){
        //StoreActionCreator.saveUser(_store.user);
        console.log("UserStore: _autosaveData blocked ");
        _state.status = StoreStatuses.SAVING;
    }
};
/* STATE MANAGEMENT*/
/* PRIVATE ACTIONS - STORE LOGIC */

//FROM VIEWS
var logout = function(){
    localStorage.clear();
    _store.user=null;
    _state.status=StoreStatuses.EMPTY;
    _state.userId=null;
    console.log("UserStore: LOGOUT!!!");
}
//loadUser prawdopodobnie nigdy jeszcze nie uywane
var loadUser = function(userId){
    _state.userId = userId;
    localStorage.setItem('userId',userId);
    console.log("localStorage.setItem('userId', "+localStorage.getItem('userId')+")");
    _canServeData();
};
//FROM SERVER
var receiveUser = function(newUser){
    if(_updateData()) {
        _state.userId=newUser.userId;
        localStorage.setItem('userId',_state.userId);
        console.log("SAVE USER ID TO LOCAL STORAGE! localStorage.setItem('userId', "+localStorage.getItem('userId')+")");
        _store.user = newUser;
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


/* PRIVATE STORE HELPERS */

var UserStore = objectAssign({}, EventEmitter.prototype, {
    /* EMITTER SUBSCRIPTION */
    addChangeListener: function(cb){
        this.on(CHANGE_EVENT, cb);
    },
    removeChangeListener: function(cb){
        this.removeListener(CHANGE_EVENT, cb);
    },
    emitChange: function() {
        console.log("UserStore: CHANGE_EVENT");
        this.emit(CHANGE_EVENT);
    },
    /* EMITTER SUBSCRIPTION */
    /* STORE STATUS INFO */
    isLoggedIn: function(){
        if(_state.userId === null){
            console.log("LOGGING IN FROM LOCAL STORAGE! localStorage.getItem('userId')= "+localStorage.getItem('userId'));
            _state.userId=localStorage.getItem('userId');
        }
        if(_state.userId === null){
            return false;
        } else {
            return true;
        }
    },
    haveUser: function(){
        //console.log("USER: _state.status:"+_state.status +", _canServeData():"+ _canServeData());
        return _canServeData();
    },
    getErrors: function() {
        return _state.errors;
    },
    /*
     getStatus: function(){
        return _state.status;
     },
     getCurrentUserId: function() {
        if(_state.userId === null && localStorage.getItem('userId')){
            console.log("localStorage.getItem('userId'): "+localStorage.getItem('userId'));
            _state.userId = localStorage.getItem('userId');
            StoreActionCreator.loadUser(_state.userId);
        }
        return _state.userId;
    },
    */
    /* STORE STATUS INFO */
    /* PUBLIC GETTERS */
    getUser: function(){
        if(_canServeData()) {
            return _store.user;
        } else {
            return null;
        }
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
            UserStore.emitChange(CHANGE_EVENT);
            break;
        case ActionTypes.LOAD_USER:
            console.log("TO SIE CHYBA NIGDY NIE DZIEJE!!!!!!!!!!")
            loadUser(action.userId);
            UserStore.emitChange(CHANGE_EVENT);
            break;
        /*ACTIONS FROM VIEWS */
        /*ACTIONS FROM SERVER */
        case ActionTypes.RECEIVE_USER:
            receiveUser(action.user);
            UserStore.emitChange(CHANGE_EVENT);
            break;
        case ActionTypes.RECEIVE_USER_ERROR:
            receiveError(action.error);
            UserStore.emitChange(CHANGE_EVENT);
            break;
        /*ACTIONS FROM SERVER */

    }
    return true;
});
/* LISTEN FOR DISPATCHER & AND CHOOSE ACTION TO PERFORM */

module.exports = UserStore;