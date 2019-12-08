import axios from 'axios'
import {
    API,
} from './action_types';

export const getPartByLessionID = (lessionID) => {
    return async (dispatch, getState) => {
        const rs = await axios.get(`${API}/api/lessions/${lessionID}/parts`);
        return rs;
    }
}

export const createPart = (newPart) => {
    return async (dispatch, getState) => {
        const rs = await axios.post(`${API}/api/parts`, newPart);
        return rs;
    }
}

export const updatePart = (newPart) => {
    return async (dispatch, getState) => {
        const rs = await axios.put(`${API}/api/parts`, newPart);
        return rs;
    }
}

