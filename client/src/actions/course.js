import axios from 'axios'
import {
    COURSE_GET_ALL,
    COURSE_UPDATE_STATUS,
    COURSE_CREATE,
    API,
    MODULE_CREATE,
    MODULE_DELETE,
    MODULE_UPDATE,
    COURSE_ACTIVE_GET_ALL,
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

export const getAllCoursesActive = () => {
    return async (dispatch, getState) => {
        const rs = await axios.get(`${API}/api/courses/active`);
        if (rs.status === 200) {
            dispatch({
                type: COURSE_ACTIVE_GET_ALL,
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

export const createModule = (newModule) => {
    return async (dispatch, getState) => {
        const rs = await axios.post(`${API}/api/modules`, newModule);
        if (rs.status === 200) {
            dispatch({
                type: MODULE_CREATE,
                payload: rs.data,
            });
        }
        return rs;
    }
}

export const deleteModule = (moduleID, courseID) => {
    return async (dispatch, getState) => {
        const rs = await axios.delete(`${API}/api/modules/${moduleID}`);
        if (rs.status === 200) {
            dispatch({
                type: MODULE_DELETE,
                payload: {moduleID, courseID},
            });
        }
        return rs;
    }
}

export const updateModule = (newModule) => {
    return async (dispatch, getState) => {
        const rs = await axios.put(`${API}/api/modules`, newModule);
        if (rs.status === 200) {
            dispatch({
                type: MODULE_UPDATE,
                payload: rs.data,
            });
        }
        return rs;
    }
}