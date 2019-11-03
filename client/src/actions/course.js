import axios from 'axios'
import {
    COURSE_GET_ALL,
    API,
} from './action_types';

export const getAllCourses = () => {
    return async (dispatch, getState) => {
        const rs = await axios.get(`${API}/api/courses`);
        if (rs.status === 200) {
            dispatch({
                type: COURSE_GET_ALL,
                payload: rs.data,
            });
        }
        return rs;
    }
}