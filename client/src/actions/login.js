import { toastr } from 'react-redux-toastr';

import axios from 'axios'
import {
    USER_LOGGED_IN,
    USER_LOGGED_OUT,
    API,
} from './action_types';


export const login = (email, password) => {
    return async (dispatch, getState) => {
        const rs = await axios.post(`${API}/api/login`, {
            email,
            password,
        });
        if (rs.status === 200) {
            localStorage.setItem("userID", rs.data.id);
            dispatch({
                type: USER_LOGGED_IN,
                payload: rs.data,
            });
        }
        return rs;
    }
}

export const getLoginStatus = (userID) => {
    return async (dispatch, getState) => {
        const rs = await axios.get(`${API}/api/users/${userID}`);
        if (rs.status === 200) {
            dispatch({
                type: USER_LOGGED_IN,
                payload: rs.data,
            });
        }
    }
}

export const logout = (props) => {
    return (dispatch, getState) => {
        dispatch({
            type: USER_LOGGED_OUT,
            payload: null
        });
        localStorage.removeItem('userID');
        toastr.success('Success', 'Logout success!');
    }
}