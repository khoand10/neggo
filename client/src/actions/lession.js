import axios from 'axios'
import {
    API,
} from './action_types';

export const getLessionByModuleID = (moduleID) => {
    return async (dispatch, getState) => {
        const rs = await axios.get(`${API}/api/lessions/?moduleID=${moduleID}`);
        if (rs.status === 200) {
            return rs;
        }
        return [];
    }
}

export const getLessionByID = (lessionID) => {
    return async (dispatch, getState) => {
        const rs = await axios.get(`${API}/api/lessions/${lessionID}`);
        if (rs.status === 200) {
            return rs;
        }
        return {};
    }
}