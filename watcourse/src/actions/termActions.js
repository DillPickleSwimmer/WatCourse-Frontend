import {
    GET_TERMS_REQUEST,
    PUT_TERMS_REQUEST, 
} from '../actions/types';

export const getTerms = () => ({
    type: GET_TERMS_REQUEST,
});

export const addToTerm = (term, course) => ({
    type: PUT_TERMS_REQUEST, term, course
});
