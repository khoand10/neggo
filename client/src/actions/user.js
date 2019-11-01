import axios from 'axios'
import {
    USER_CREATE_NEW,
    API,
} from './action_types';

export const createUser = (newUser) => {
    return async (dispatch, getState) => {
        const rs = await axios.post(`${API}/api/users`, newUser);
        return rs;
    }
}