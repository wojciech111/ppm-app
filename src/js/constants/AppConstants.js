var keyMirror = require('react/lib/keyMirror');

var APIRoot = "http://192.168.0.14:4567";

var appConstants = {

//API
    APIEndpoints: {
        LOGIN:          APIRoot + "/v1/login",
        REGISTRATION:   APIRoot + "/v1/users",
        STORIES:        APIRoot + "/v1/stories",
        PORTFOLIO:      APIRoot + "/portfolios"
    },
//Source of actions
    PayloadSources: keyMirror({
        SERVER_ACTION: null,
        VIEW_ACTION: null
    }),
//Modes of views
    ViewModes: keyMirror({
        VIEW_MODE : null,
        EDIT_MODE : null,
        CREATION_MODE : null
    }),
//Statuses of stores
    StoreStatuses: keyMirror({
        EMPTY: null,
        WAITING_FOR_DATA: null,
        UP_TO_DATE: null,
        MODIFIED: null
    }),
//Action types
    ActionTypes: keyMirror({
        // Session
        LOGIN_REQUEST: null,
        LOGIN_RESPONSE: null,

        // Routes
        REDIRECT: null,

        //From views
        LOAD_PORTFOLIO: null,
        CREATE_COMPONENT: null,
        UPDATE_COMPONENT: null,
        REMOVE_COMPONENT: null,

        //From server
        RECEIVE_PORTFOLIO: null,
        RECEIVE_ERROR: null,


        //tmp
        LOAD_STORIES: null,
        RECEIVE_STORIES: null,
        LOAD_STORY: null,
        RECEIVE_STORY: null,
        CREATE_STORY: null,
        RECEIVE_CREATED_STORY: null

    }),

};

module.exports = appConstants;