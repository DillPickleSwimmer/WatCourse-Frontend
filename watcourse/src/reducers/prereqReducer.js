import { GET_COURSE_PREREQS_SUCCESS } from '../actions/types';

const initialState = {};

export default function (state = initialState, action) {
    switch(action.type) {
        case GET_COURSE_PREREQS_SUCCESS: 
            return action.rules;
        default:
            return state;
    }
}
