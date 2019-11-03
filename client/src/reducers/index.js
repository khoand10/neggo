import { combineReducers } from "redux";
import { reducer as form } from 'redux-form';
import { reducer as toastr } from 'react-redux-toastr';

import user from "./user";
import somedata from "./somedata";
import course from "./course";

const rootReducer = combineReducers({
    user,
    course,
    somedata,
    form,
    toastr,
});

export default rootReducer;
