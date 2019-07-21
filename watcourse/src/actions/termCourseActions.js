import {
    GET_TERM_COURSES_REQUEST,
    ADD_TERM_COURSE_REQUEST, 
    REMOVE_TERM_COURSE_REQUEST,
    MOVE_TERM_COURSE_REQUEST,
} from '../actions/types';
import {
    removeFromShortlist, addToShortlist
} from './shortlistActions';

export const getTermCourses = (term) => ({
    type: GET_TERM_COURSES_REQUEST, term
});

export const addToTerm = (termId, course) => ({
    type: ADD_TERM_COURSE_REQUEST, termId, course
});

export const removeFromTerm = (termId, course) => ({
    type: REMOVE_TERM_COURSE_REQUEST, termId, course
});

export const removeFromTermToShortlist = (termId, course) => (dispatch) => {
    dispatch(removeFromTerm(termId, course));
    dispatch(addToShortlist(course));
};

export const moveBetweenTerms = (course, fromTermId, toTermId) => ({
    type: MOVE_TERM_COURSE_REQUEST, course, fromTermId, toTermId
});