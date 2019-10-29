import { toastr } from 'react-redux-toastr';

import axios from 'axios'
import {
    USER_LOGGED_IN,
    USER_LOGGED_OUT,
    API,
} from './action_types';


export const login = (value) => {
    return async (dispatch, getState) => {
        const rs = await axios.post(`${API}/api/login`, {
            email: value.email,
            password: value.password,
        });
        console.log('rs', rs);
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
        toastr.success('Success', 'Logout success!');
    }
}