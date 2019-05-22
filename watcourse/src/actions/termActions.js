import {
    GET_TERMS_REQUEST,
    PUT_TERMS_REQUEST, 
    REMOVE_FROM_TERM // TODO: delete term request
} from '../actions/types';

export const getTerms = () => ({
    type: GET_TERMS_REQUEST,
});

export const addToTerm = (term, course) => ({
    type: PUT_TERMS_REQUEST, term, course
});

export const removeFromTerm = (term, course) => ({
    type: REMOVE_FROM_TERM, term, course
});