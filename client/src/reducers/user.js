import {
    USER_GET_ALL
} from '../actions/action_types';

export default function (state = null, action) {
    let newUser;
    switch (action.type) {
        case USER_GET_ALL:
            return action.payload;
        default:
            return state;
    }
}