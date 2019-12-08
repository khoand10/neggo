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

export const createQuestion = (newQuestion) => {
    return async (dispatch, getState) => {
        const rs = await axios.post(`${API}/api/questions`, newQuestion);
        return rs;
    }
}

export const updateLession = (newLession) => {
    return async (dispatch, getState) => {
        const rs = await axios.put(`${API}/api/lessions`, newLession);
        return rs;
    }
}

export const deleteLession = (lessionID) => {
    return async (dispatch, getState) => {
        const rs = await axios.delete(`${API}/api/lessions/${lessionID}`);
        return rs;
    }
}