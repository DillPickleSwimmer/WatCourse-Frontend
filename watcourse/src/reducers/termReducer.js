import { 
    GET_TERM_COURSES_SUCCESS,
    ADD_TERM_COURSE_SUCCESS,
    ADD_TERM_COURSE_REQUEST,
    ADD_TERM_COURSE_ERROR,
    REMOVE_TERM_COURSE_SUCCESS, 
    REMOVE_TERM_COURSE_REQUEST,
    REMOVE_TERM_COURSE_ERROR,
    REMOVE_TERM_SUCCESS,
    MOVE_TERM_COURSE_SUCCESS,
    MOVE_TERM_COURSE_REQUEST,
    MOVE_TERM_COURSE_ERROR,
    EDIT_TERM_REQUEST,
    EDIT_TERM_SUCCESS,
    EDIT_TERM_ERROR,
    TERM_TO_SHORTLIST_REQUEST,
    TERM_TO_SHORTLIST_SUCCESS,
    TERM_TO_SHORTLIST_ERROR,
} from '../actions/types';
import { moveCourseRequest, moveCourseSuccess, moveCourseError } from './moveCourseReducerUtilities';

const initialState = []; 

//need to sort these terms in order to maintain order
export default function (state = initialState, action) {
    var addTerm, removeTerm;

    switch (action.type) {

    case GET_TERM_COURSES_SUCCESS:
        return [
            ...state.filter(term => action.term.id !== term.id), 
            action.term
        ]; 

    // ADD COURSE TO TERM
    case ADD_TERM_COURSE_REQUEST:
        return moveCourseRequest(function(course) {
            addTerm = state.find(term => term.id === action.termId);
            if ( !addTerm ) return state;
            addTerm.courses = [
                ...addTerm.courses.filter(c => c.id !== course.id),
                course,
            ];
            return [
                ...state.filter(term => term.id !== addTerm.id), 
                addTerm
            ];
        }, action.course, state);
    case ADD_TERM_COURSE_SUCCESS: 
        return moveCourseSuccess(function() {return state;}, action.course, state);
    case ADD_TERM_COURSE_ERROR:
        return moveCourseError(function(course) {
            addTerm = state.find(term => term.id === action.termId);
            if ( !addTerm ) return state;
            addTerm.courses = [
                ...addTerm.courses.filter(c => c.id !== course.id),
            ];
            return [
                ...state.filter(term => term.id !== addTerm.id), 
                addTerm
            ];
        }, action.course, state);

    // REMOVE COURSE FROM TERM 
    case REMOVE_TERM_COURSE_REQUEST:
    case TERM_TO_SHORTLIST_REQUEST:
        return moveCourseRequest(function(course) {
            removeTerm = state.find(term => term.id === action.termId);
            if ( !removeTerm ) return state;
            removeTerm.courses = [
                ...removeTerm.courses.filter(c => c.id !== course.id),
            ];
            return [
                ...state.filter(term => term.id !== removeTerm.id), 
                removeTerm
            ];
        }, action.course, state);
    case REMOVE_TERM_COURSE_SUCCESS: 
    case TERM_TO_SHORTLIST_SUCCESS:
        return moveCourseSuccess(function() {return state;}, action.course, state);
    case REMOVE_TERM_COURSE_ERROR:
    case TERM_TO_SHORTLIST_ERROR:
        return moveCourseError(function(course) {
            removeTerm = state.find(term => term.id === action.termId);
            if ( !removeTerm ) return state;
            removeTerm.courses = [
                ...removeTerm.courses.filter(c => c.id !== course.id),
                course,
            ];
            return [
                ...state.filter(term => term.id !== removeTerm.id), 
                removeTerm
            ];
        }, action.course, state);

    // REMOVE TERM    
    case REMOVE_TERM_SUCCESS: 
        return [
            ...state.filter(term => term.id !== action.termId), 
        ]; 

    // MOVE COURSE BETWEEN TERMS
    case MOVE_TERM_COURSE_REQUEST:
        return moveCourseRequest(function(course) {
            removeTerm = state.find(term => term.id === action.fromTermId);
            if ( !removeTerm ) return state;
            removeTerm.courses = [
                ...removeTerm.courses.filter(c => c.id !== course.id),
            ];
            addTerm = state.find(term=>term.id === action.toTermId);
            if ( !addTerm ) return state;
            addTerm.courses = [
                ...addTerm.courses.filter(c => c.id !== course.id),
                course
            ];
            return [
                ...state.filter(term => term.id !== action.fromTermId && term.id !== action.toTermId), 
                removeTerm,
                addTerm,
            ];
        }, action.course, state);
    case MOVE_TERM_COURSE_SUCCESS:
        return moveCourseSuccess(function(course) {
            addTerm = state.find(term=>term.id === action.toTermId);
            if ( !addTerm ) return state;
            addTerm.courses = [
                ...addTerm.courses.filter(c => c.id !== course.id),
                course
            ];
            return [
                ...state.filter(term => term.id !== action.toTermId), 
                addTerm,
            ];
        }, action.course, state);
    case MOVE_TERM_COURSE_ERROR:
        return moveCourseError(function(course) {
            removeTerm = state.find(term => term.id === action.toTermId);
            if ( !removeTerm ) return state;
            removeTerm.courses = [
                ...removeTerm.courses.filter(c => c.id !== course.id),
            ];
            addTerm = state.find(term=>term.id === action.fromTermId);
            if ( !addTerm ) return state;
            addTerm.courses = [
                ...addTerm.courses.filter(c => c.id !== course.id),
                course
            ];
            return [
                ...state.filter(term => term.id !== action.fromTermId && term.id !== action.toTermId), 
                removeTerm,
                addTerm,
            ];
        }, action.course, state);

    // EDIT TERM DETAILS
    case EDIT_TERM_REQUEST: 
        // attempt update
        action.term.oldDisplayInfo = {
            name: action.term.name,
        }
        action.term.name = action.name;
        return [
            ...state.filter(term => term.id !== action.term.id), 
            action.term,
        ];
    case EDIT_TERM_SUCCESS: 
        action.term.oldDisplayInfo = undefined;
        return [
            ...state.filter(term => term.id !== action.term.id), 
            action.term,
        ];
    case EDIT_TERM_ERROR: 
        // undo
        action.term.name = action.term.oldDisplayInfo.name;
        action.term.oldDisplayInfo = undefined;
        return [
            ...state.filter(term => term.id !== action.term.id), 
            action.term,
        ];

    default:
        return state;
    }
}