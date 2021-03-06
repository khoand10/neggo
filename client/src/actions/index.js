import axios from 'axios'
import {
    COURSE_GET_ALL,
    API,
} from './action_types';
import { toastr } from 'react-redux-toastr';

export const USER_LOGGED_IN = "USER_LOGGED_IN";
export const USER_LOGGED_OUT = "USER_LOGGED_OUT";

export const someAction = (props) => {
    return (dispatch, getState) => {
        toastr.success('Success', 'You clicked this button');
    }
}

export const submit = (questionID, answers) => {
    return async (dispatch, getState) => {
        const rs = await axios.post(`${API}/api/questions/${questionID}`, 
        {
            answers
        });
        if (rs.data.correct === true) {
            toastr.success('Success', 'Correct!');
        } else {
            toastr.error('Answer incorrect!');
        }
        return rs;
    }
}

export const updateHistory = (userID, history) => {
    return async (dispatch, getState) => {
        const rs = await axios.post(`${API}/api/users/update-history`)
    }
}