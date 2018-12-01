import { GET_COURSES_SUCCESS } from '../actions/types';

const initialState = [];

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_COURSES_SUCCESS:
            return action.courses || state;    // make use of the spread operator
        default:
            return state;
    }
}