import { 
    TOGGLE_SIDEBAR,
    TOGGLE_SIDEBAR_SEARCH,
} from '../actions/types';

const initialState = {open: false, openSearch: false};

export default function (state = initialState, action) {
    switch (action.type) {
    case TOGGLE_SIDEBAR:
        return {
            open: action.open === undefined ? !state.open : action.open,
            search: state.openSearch,
        };
    case TOGGLE_SIDEBAR_SEARCH:
        return {
            open: state.open || action.open || !state.openSearch || false,
            search: action.open === undefined ? !state.openSearch : action.open,
        };
    default:
        return state;
    }
}