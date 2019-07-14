import { 
    GET_TERM_COURSES_SUCCESS,
    ADD_TERM_COURSE_SUCCESS,
    REMOVE_TERM_COURSE_SUCCESS, 
    REMOVE_TERM_SUCCESS,
    MOVE_TERM_COURSE_SUCCESS,
    MOVE_TERM_COURSE_REQUEST,
    MOVE_TERM_COURSE_ERROR,
    EDIT_TERM_REQUEST,
    EDIT_TERM_SUCCESS,
    EDIT_TERM_ERROR,
} from '../actions/types';

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

    case ADD_TERM_COURSE_SUCCESS:
        addTerm = state.find(term=>term.id === action.term);
        addTerm.courses = [
            ...addTerm.courses.filter(id => id !== action.course.id),
            { id : action.course.id, arePrereqsMet : action.arePrereqsMet } 
        ];
        return [
            ...state.filter(term =>term.id !== addTerm.id), 
            addTerm
        ];

    case REMOVE_TERM_COURSE_SUCCESS: 
        removeTerm = state.find(term => term.id === action.term);
        removeTerm.courses = [
            ...removeTerm.courses.filter(course => course.id !== action.course.id),
        ];
        return [
            ...state.filter(term => term.id !== removeTerm.id), 
            removeTerm
        ];

    case REMOVE_TERM_SUCCESS: 
        return [
            ...state.filter(term => term.id !== action.termId), 
        ]; 

    case MOVE_TERM_COURSE_REQUEST:
        // attempt to move the course (to avoid drag lag), adds a temporary state to prevent future action
        if (action.course.pending) {
            // don't move a course in temp state
            action.course.requestFailed = true;
            return state;
        }
        action.course.requestFailed = false;
        action.course.pending = true;
        removeTerm = state.find(term => term.id === action.fromTermId);
        removeTerm.courses = [
            ...removeTerm.courses.filter(course => course.id !== action.course.id),
        ];
        addTerm = state.find(term=>term.id === action.toTermId);
        addTerm.courses = [
            ...addTerm.courses.filter(course => course.id !== action.course.id),
            action.course
        ];
        return [
            ...state.filter(term => term.id !== action.fromTermId && term.id !== action.toTermId), 
            removeTerm,
            addTerm,
        ];
    case MOVE_TERM_COURSE_SUCCESS:
        // remove temp state of course 
        removeTerm = state.find(term => term.id === action.fromTermId);
        removeTerm.courses = [
            ...removeTerm.courses.filter(course => course.id !== action.course.id),
        ];
        addTerm = state.find(term=>term.id === action.toTermId);
        action.course.requestFailed = false;
        action.course.pending = false;
        addTerm.courses = [
            ...addTerm.courses.filter(course => course.id !== action.course.id),
            action.course
        ];
        return [
            ...state.filter(term => term.id !== action.fromTermId && term.id !== action.toTermId), 
            removeTerm,
            addTerm,
        ];
    case MOVE_TERM_COURSE_ERROR:
        // undo the move
        removeTerm = state.find(term => term.id === action.fromTermId);
        removeTerm.courses = [
            ...removeTerm.courses.filter(course => course.id !== action.course.id),
            action.course
        ];
        addTerm = state.find(term=>term.id === action.toTermId);
        addTerm.courses = [
            ...addTerm.courses.filter(course => course.id !== action.course.id),
        ];
        return [
            ...state.filter(term => term.id !== action.fromTermId && term.id !== action.toTermId), 
            removeTerm,
            addTerm,
        ];

    case EDIT_TERM_REQUEST: 
        // attempt update
        action.term.oldDisplayInfo = {
            name: action.term.name,
            termNum: action.term.termNum, 
            termYear: action.term.termYear,
        }
        action.term.name = action.name;
        action.term.termNum = action.termNum;
        action.term.termYear = action.termYear;
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
        action.term.termNum = action.term.oldDisplayInfo.termNum;
        action.term.termYear = action.term.oldDisplayInfo.termYear;
        action.term.oldDisplayInfo = undefined;
        return [
            ...state.filter(term => term.id !== action.term.id), 
            action.term,
        ];
    default:
        return state;
    }
}