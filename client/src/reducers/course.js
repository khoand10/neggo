import {
    COURSE_GET_ALL,
    COURSE_UPDATE_STATUS,
    COURSE_CREATE,
} from '../actions/action_types';

export default function (state = null, action) {
    let newCourses;
    switch (action.type) {
        case COURSE_GET_ALL:
            return action.payload;
        case COURSE_UPDATE_STATUS:
            newCourses = state.map(item => {
                if (item.id === action.payload.id) {
                    return action.payload;
                }
                return item;
            });
            return newCourses;
        case COURSE_CREATE:
            return [...state, action.payload];
        default:
            return state;
    }
}