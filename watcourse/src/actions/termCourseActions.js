import {
    GET_TERM_COURSES_REQUEST,
    ADD_TERM_COURSE_REQUEST, 
    REMOVE_TERM_COURSE_REQUEST 
} from '../actions/types';

export const getTermCourses = (term) => ({
    type: GET_TERM_COURSES_REQUEST, term
});

export const addToTerm = (term, course) => ({
    type: ADD_TERM_COURSE_REQUEST, term, course
});

export const removeFromTerm = (term, course) => ({
    type: REMOVE_TERM_COURSE_REQUEST, term, course
});