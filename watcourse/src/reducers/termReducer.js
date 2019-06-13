import { 
    GET_TERM_COURSES_SUCCESS,
    ADD_TERM_COURSE_SUCCESS,
    REMOVE_TERM_COURSE_SUCCESS, 
    MOVE_TERM_COURSE_SUCCESS,
} from '../actions/types';

// todo set this to []
const initialState = []; 

//need to sort these terms in order to maintain order
export default function (state = initialState, action) {
    switch (action.type) {
    case GET_TERM_COURSES_SUCCESS:
        return [
            ...state.filter(term => action.term.id !== term.id), 
            action.term
        ]; 
    case ADD_TERM_COURSE_SUCCESS:
        var addTerm = state.find(term=>term.id === action.term);
        addTerm.courses = [
            ...addTerm.courses.filter(id => id !== action.course.id),
            { id : action.course.id, arePrereqsMet : action.arePrereqsMet } 
        ];
        return [
            ...state.filter(term =>term.id !== addTerm.id), 
            addTerm
        ];
    case REMOVE_TERM_COURSE_SUCCESS: 
        var removeTerm = state.find(term => term.id === action.term);
        removeTerm.courses = [
            ...removeTerm.courses.filter(course => course.id !== action.course.id),
        ];
        return [
            ...state.filter(term => term.id !== removeTerm.id), 
            removeTerm
        ];
    case MOVE_TERM_COURSE_SUCCESS:
        var removeTerm = state.find(term => term.id === action.fromTerm);
        removeTerm.courses = [
            ...removeTerm.courses.filter(course => course.id !== action.course.id),
        ];
        var addTerm = state.find(term=>term.id === action.toTerm);
        addTerm.courses = [
            ...addTerm.courses.filter(course => course.id !== action.course.id),
            action.course
        ];
        return [
            ...state.filter(term => term.id !== action.fromTerm && term.id !== action.toTerm), 
            removeTerm,
            addTerm,
        ];
    default:
        return state;
    }
}