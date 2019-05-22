import { 
    SELECT_TERM,
} from '../actions/types';

const initialState = null;

export default function (state = initialState, action) {
    switch (action.type) {
    case SELECT_TERM:
        return action.term;
    default:
        return state;
    }
}