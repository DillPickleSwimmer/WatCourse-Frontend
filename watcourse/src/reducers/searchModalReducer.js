import { 
    SEARCH_MODAL_TOGGLE,
} from '../actions/types';

// todo set this to []
const initialState = false;

export default function (state = initialState, action) {
    switch (action.type) {
        case SEARCH_MODAL_TOGGLE:
            return action.open === null ? !state : action.open;
        default:
            return state;
    }
}