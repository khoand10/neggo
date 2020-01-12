import axios from 'axios'
import {
    USER_CREATE_NEW,
    USER_GET_ALL,
    API,
} from './action_types';

export const createUser = (newUser) => {
    return async (dispatch, getState) => {
        const rs = await axios.post(`${API}/api/users`, newUser);
        return rs;
    }
}

export const updateUser = (newUser) => {
    return async (dispatch, getState) => {
        const rs = await axios.put(`${API}/api/users`, newUser);
        return rs;
    }
}

export const getAllUser = () => {
    return async (dispatch, getState) => {
        const rs = await axios.get(`${API}/api/users`);
        if (rs.status === 200) {
            dispatch({
                type: USER_GET_ALL,
                payload: rs.data,
            });
        }
        return rs;
    }
}

export const deleteUser = (userID) => {
    return async (dispatch, getState) => {
        const rs = await axios.delete(`${API}/api/users/${userID}`);
        return rs;
    }
}