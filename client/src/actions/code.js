import axios from 'axios'

export const runCode = (form) => {
    return async (dispatch, getState) => {
        const rs = await axios.post(`http://localhost:3001`, form);
        return rs;
    }
};