var keyMirror = require('react/lib/keyMirror');

var APIRoot = "http://192.168.146.1:4567";

var appConstants = {

//API
    APIEndpoints: {
        LOGIN:          APIRoot + "/login",
        REGISTRATION:   APIRoot + "/register",
        USER:           APIRoot + "/users",
        PORTFOLIO:      APIRoot + "/portfolios"
    },
//Source of actions
    PayloadSources: keyMirror({
        SERVER_ACTION: null,
        VIEW_ACTION: null,
        STORE_ACTION: null
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
        MODIFIED: null,
        SAVING: null
    }),
//Statuses of App
    AppStatuses: keyMirror({
        LOGGED_OUT: null,
        WAITING_FOR_USER: null,
        HAVE_USER: null,
        WAITING_FOR_PORTFOLIO: null,
        READY_TO_WORK: null
    }),
//Action types
    ActionTypes: keyMirror({

        // Session
        LOGIN_REQUEST: null,
        LOGIN_RESPONSE: null,
        LOGOUT: null,

        // Routes
        REDIRECT: null,

        //From stores
        LOAD_PORTFOLIO: null,
        SAVE_PORTFOLIO: null,
        LOAD_USER: null,
        SAVE_USER: null,

        //From views
        CREATE_COMPONENT: null,
        UPDATE_COMPONENT: null,
        REMOVE_COMPONENT: null,

        //From server
        RECEIVE_PORTFOLIO: null,
        RECEIVE_PORTFOLIO_ERROR: null,
        RECEIVE_USER: null,
        RECEIVE_USER_ERROR: null,


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