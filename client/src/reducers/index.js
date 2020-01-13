import { combineReducers } from "redux";
import { reducer as form } from 'redux-form';
import { reducer as toastr } from 'react-redux-toastr';

import user from "./login";
import somedata from "./somedata";
import course from "./course";
import users from "./user";
import questions from './question';

import {SET_HISTORY, COURSE_ACTIVE_GET_ALL} from '../actions/action_types';

const histories = (state = null, action) => {
    switch (action.type) {
        case SET_HISTORY:
            return action.payload;
        default:
            return state;
    }
}

const courseActives = (state = null, action) => {
    switch (action.type) {
        case COURSE_ACTIVE_GET_ALL:
            return action.payload;
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    user,
    course,
    somedata,
    form,
    toastr,
    histories,
    users,
    courseActives,
    questions,
});

export default rootReducer;
