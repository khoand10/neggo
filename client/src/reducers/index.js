import { combineReducers } from "redux";
import { reducer as form } from 'redux-form';
import { reducer as toastr } from 'react-redux-toastr';

import user from "./login";
import somedata from "./somedata";
import course from "./course";
import users from "./user";

import {SET_HISTORY} from '../actions/action_types';

const historys = (state = null, action) => {
    switch (action.type) {
        case SET_HISTORY:
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
    historys,
    users,
});

export default rootReducer;
