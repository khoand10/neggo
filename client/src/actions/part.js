import axios from 'axios'
import {
    API,
} from './action_types';

export const getPartByLessionID = (lessionID) => {
    return async (dispatch, getState) => {
        const rs = await axios.get(`${API}/api/parts/${lessionID}`);
        if (rs.status === 200) {
            return rs.data;
        }
        return [];
    }
}