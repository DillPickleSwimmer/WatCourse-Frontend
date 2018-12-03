import { 
    ADD_SHORTLIST, REMOVE_SHORTLIST,
} from '../actions/types';

const initialState = [];

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_SHORTLIST:
            return [...state.filter(course=>course!==action.course), action.course];
        case REMOVE_SHORTLIST:
            return [...state.filter(course=>course!==action.course)];
        default:
            return state;
    }
}