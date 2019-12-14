import axios from 'axios'
import {
    API,
    UPDATE_HISTORY,
    SET_HISTORY,
} from './action_types';

export const updateHistory = (history) => {
    return async (dispatch, getState) => {
        const rs = await axios.post(`${API}/api/users/update-history`, history);
        if (rs.status === 200) {
            let history;
            try {
                history = JSON.parse(rs.data.history)
            } catch (error) {
                history = {};
            }
            dispatch({
                type: SET_HISTORY,
                payload: history,
            });
        }
        return rs;
    }
}