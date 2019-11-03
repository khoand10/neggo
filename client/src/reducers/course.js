import {
    COURSE_GET_ALL
} from '../actions/action_types';

export default function (state = null, action) {
    switch (action.type) {
        case COURSE_GET_ALL:
            return action.payload;
        default:
            return state;
    }
}