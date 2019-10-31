import axios from 'axios'
import {
    USER_CREATE_NEW,
    API,
} from './action_types';

export const createUser = (newUser) => {
    return async (dispatch, getState) => {
        const rs = await axios.post(`${API}/api/users`, {
            newUser,
        });
        // if (rs.status === 200) {
        //     localStorage.setItem("userID", rs.data.id);
        //     dispatch({
        //         type: USER_LOGGED_IN,
        //         payload: rs.data,
        //     });
        // }
        return rs;
    }
}