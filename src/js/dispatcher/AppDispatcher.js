var Dispatcher = require('flux').Dispatcher;
var assign = require('react/lib/Object.assign');

var AppConstants = require('../constants/AppConstants');

var PayloadSources = AppConstants.PayloadSources;


var AppDispatcher = assign(new Dispatcher(),{
    //Actions initiated by server
    handleServerAction: function(action) {
        console.log('server action', action);
        var payload = {
            source: PayloadSources.SERVER_ACTION,
            action: action
        };
        this.dispatch(payload);
    },
    //Actions initiated by store
    /*handleStoreAction: function(action) {
        console.log('store action', action);
        var payload = {
            source: PayloadSources.STORE_ACTION,
            action: action
        };
        this.dispatch(payload);
    },*/
    //Actions initiated by view
    handleViewAction: function(action) {
        console.log('view action', action);
        var payload = {
            source: PayloadSources.VIEW_ACTION,
            action: action
        };
        this.dispatch(payload);
    }
});

module.exports = AppDispatcher;