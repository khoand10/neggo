import axios from 'axios'
import {
    COURSE_GET_ALL,
    COURSE_UPDATE_STATUS,
    COURSE_CREATE,
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

export const updateStatusActive = (coursesId, status) => {
    return async (dispatch, getState) => {
        const rs = await axios.post(`${API}/api/courses/change-status`,
            {
                courseID: coursesId,
                active: status,
            }
        );
        if (rs.status === 200) {
            dispatch({
                type: COURSE_UPDATE_STATUS,
                payload: rs.data,
            });
        }
        return rs;
    }
}

export const createCourse = (newCourse) => {
    return async (dispatch, getState) => {
        const rs = await axios.post(`${API}/api/courses`, newCourse);
        if (rs.status === 200) {
            dispatch({
                type: COURSE_CREATE,
                payload: rs.data,
            });
        }
        return rs;
    }
}