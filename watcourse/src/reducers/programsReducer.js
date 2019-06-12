import { GET_PROGRAMS_SUCCESS, GET_PROGRAMS_ERROR } from '../actions/types';

// TODO: remove placeHolderStates when we have more programs, keep 'Other' see issue #31
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
    case GET_PROGRAMS_ERROR:
        return state;
    default:
        return state;
    }
}