import {
    GET_TERMS_REQUEST, ADD_TERM_REQUEST, REMOVE_TERM_REQUEST,
} from '../actions/types';

export const getTerms = () => ({
    type: GET_TERMS_REQUEST,
});

export const addTerm = (prevTerm) => ({
    type: ADD_TERM_REQUEST, prevTerm,
})

export const removeTerm = (term) => ({
    type: REMOVE_TERM_REQUEST, term
})
