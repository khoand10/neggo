import {
    COURSE_GET_ALL,
    COURSE_UPDATE_STATUS,
    COURSE_CREATE,
    MODULE_CREATE,
    MODULE_DELETE,
    MODULE_UPDATE,
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
        case MODULE_CREATE:
            newCourses = state.map(item => {
                if (item.id === action.payload.courseID) {
                    const newCourse = {...item};
                    newCourse.modules.push(action.payload);
                    return newCourse;
                }
                return item;
            });
            return newCourses;
        case MODULE_DELETE:
            newCourses = state.map(item => {
                if (item.id === action.payload.courseID) {
                    const newCourse = {...item};
                    newCourse.modules.forEach((element, index) => {
                        if (element.id === action.payload.moduleID) {
                            newCourse.modules.splice(index, 1);
                        }
                    });
                    return newCourse;
                }
                return item;
            });
            return newCourses;
        case MODULE_UPDATE:
            newCourses = state.map(item => {
                if (item.id === action.payload.courseID) {
                    const newCourse = {...item};
                    newCourse.modules.forEach((element, index) => {
                        if (element.id === action.payload.id) {
                            newCourse.modules[index] = action.payload;
                        }
                    });
                    return newCourse;
                }
                return item;
            });
        default:
            return state;
    }
}