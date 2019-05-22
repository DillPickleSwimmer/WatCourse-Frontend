import { 
    GET_TERMS_SUCCESS,
    ADD_TO_TERM, REMOVE_FROM_TERM, 
} from '../actions/types';

// todo set this to []
const initialState = []; 

//need to sort these terms in order to maintain order
export default function (state = initialState, action) {
    switch (action.type) {
    case GET_TERMS_SUCCESS:
        return [
            ...state.filter(term => action.term.id !== term.id), 
            action.term
        ]; 
    case ADD_TO_TERM:
        var addTerm = state.find(term=>term.id === action.term);
        addTerm.courses = [
            ...addTerm.courses.filter(id => id !== action.course.id),
            action.course.id 
        ];
        return [
            ...state.filter(term =>term.id !== addTerm.id), 
            addTerm
        ];
    case REMOVE_FROM_TERM: 
        var removeTerm = state.find(term =>term.id === action.term);
        removeTerm.courses = [
            ...removeTerm.courses.filter(id => id !== action.course.id),
        ];
        return [
            ...state.filter(term => term.id !== removeTerm.id), 
            removeTerm
        ];
    default:
        return state;
    }
}