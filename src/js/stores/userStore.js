var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/AppConstants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';


/* MODEL */
var _store = {
    user : {
        "userId": "5246",
        "name": "Wojciech111",
        "employees": [
            {
                "employeeId": "324",
                "firstName": "Wojciech",
                "secondName": "Oksinski",
                "organization": {
                    "organizationId": "322134",
                    "name": "hiStory_Machine",
                    "portfolios": [
                        {
                            "componentId": "11300",
                            "code": "PT        ",
                            "name": "portfolioTop",
                            "customer": "customer jakis",
                            "description": "Opis Opisik"
                        },
                        {
                            "componentId": "222222",
                            "code": "22        ",
                            "name": "portfolio22",
                            "customer": "customer ",
                            "description": "Opis "
                        }
                    ]
                }
            },

        ],
    }
};
/* MODEL */
/* PRIVATE ACTIONS - STORE LOGIC */
/*var createComponent = function(component, parentId){

};

var updateComponent = function(component){

};

var removeComponent = function(componentId){

}
/* PRIVATE ACTIONS - STORE LOGIC */
/* PRIVATE STORE HELPERS */

/* PRIVATE STORE HELPERS */
/* PUBLIC GETTERS & LISTENERS & EMITTER - STORE API */
var UserStore = objectAssign({}, EventEmitter.prototype, {
    addChangeListener: function(cb){
        this.on(CHANGE_EVENT, cb);
    },
    removeChangeListener: function(cb){
        this.removeListener(CHANGE_EVENT, cb);
    },
    getUser: function(){
        return _store.user;
    },
});
/* PUBLIC GETTERS & LISTENERS & EMITTER - STORE API */
/* LISTEN FOR DISPATCHER & AND CHOOSE ACTION TO PERFORM */
/*AppDispatcher.register(function(payload){
    var action = payload.action;
    switch(action.actionType){
        case appConstants.CREATE_COMPONENT:
            createComponent(action.component,action.parentId);
            PortfolioStore.emit(CHANGE_EVENT);
            break;
        case appConstants.UPDATE_COMPONENT:
            updateComponent(action.component);
            PortfolioStore.emit(CHANGE_EVENT);
            break;
        case appConstants.REMOVE_COMPONENT:
            removeComponent(action.componentId);
            PortfolioStore.emit(CHANGE_EVENT);
            break;
        default:
            return true;
    }
});
/* LISTEN FOR DISPATCHER & AND CHOOSE ACTION TO PERFORM */

module.exports = UserStore;