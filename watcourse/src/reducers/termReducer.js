import { 
    GET_TERMS_SUCCESS,
    ADD_TERM_SUCCESS,
    REMOVE_TERM_SUCCESS, 
} from '../actions/types';

const initialState = []; 

//need to sort these terms in order to maintain order
export default function (state = initialState, action) {
    switch (action.type) {
    case GET_TERMS_SUCCESS:
        return [
            ...state.filter(term => term && action.term.id !== term.id), 
            ...(action.terms || []),
        ]; 
    case ADD_TERM_SUCCESS:  
    case REMOVE_TERM_SUCCESS: 
        return [
            ...state.filter(term => term && action.term.id !== term.id), 
        ]; 
    default:
        return state;
    }
}