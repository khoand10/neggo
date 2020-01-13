import {
    QUESTION_GET_ALL
} from '../actions/action_types';

export default function (state = null, action) {
    let newQuestion;
    switch (action.type) {
        case QUESTION_GET_ALL:
            return action.payload;
        default:
            return state;
    }
}