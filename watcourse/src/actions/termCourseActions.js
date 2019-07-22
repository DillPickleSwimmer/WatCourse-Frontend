import {
    GET_TERM_COURSES_REQUEST,
    ADD_TERM_COURSE_REQUEST, 
    REMOVE_TERM_COURSE_REQUEST,
    MOVE_TERM_COURSE_REQUEST,
    TERM_TO_SHORTLIST_REQUEST,
} from '../actions/types';

export const getTermCourses = (term) => ({
    type: GET_TERM_COURSES_REQUEST, term
});

export const addToTerm = (termId, course) => ({
    type: ADD_TERM_COURSE_REQUEST, termId, course
});

export const removeFromTerm = (termId, course) => ({
    type: REMOVE_TERM_COURSE_REQUEST, termId, course
});

// TODO: this should be done w/ 1 endpoint to handle failure
export const removeFromTermToShortlist = (termId, course) => ({
    type: TERM_TO_SHORTLIST_REQUEST, termId, course
});

export const moveBetweenTerms = (course, fromTermId, toTermId) => ({
    type: MOVE_TERM_COURSE_REQUEST, course, fromTermId, toTermId
});