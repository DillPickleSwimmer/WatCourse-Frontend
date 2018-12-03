import {
    GET_TERMS_REQUEST,
    ADD_TO_TERM, 
    REMOVE_FROM_TERM
} from '../actions/types';

export const getTerms = () => ({
    type: GET_TERMS_REQUEST,
});

export const addToTerm = (term, course) => ({
    type: ADD_TO_TERM, term, course
});

export const removeFromTerm = (term, course) => ({
    type: REMOVE_FROM_TERM, term, course
});