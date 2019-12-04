import axios from 'axios'
import {
    API,
} from './action_types';

export const updateHistory = (userID, history) => {
    return async (dispatch, getState) => {
        const rs = await axios.post(`${API}/api/users/update-history`)
    }
}