import { GET_PROGRAMS_SUCCESS } from '../actions/types';

const placeHolderState = [
    {
        'id': -3,
        'name': 'Computer Engineering'
    },
    {
        'id': -2,
        'name': 'Computer Science'
    },
    {
        'id': -1,
        'name': 'Other'
    }
];

const initialState = [];

export default function (state = initialState, action) {
    switch (action.type) {
    case GET_PROGRAMS_SUCCESS:
        return [...action.programs, ...placeHolderState];
    default:
        return state;
    }
}