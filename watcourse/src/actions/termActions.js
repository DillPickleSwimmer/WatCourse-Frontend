import {
    GET_TERMS_REQUEST, ADD_TERM_REQUEST, REMOVE_TERM_REQUEST, EDIT_TERM_REQUEST,
} from '../actions/types';

export const getTerms = () => ({
    type: GET_TERMS_REQUEST,
});

export const addTerm = (prevTerm, name) => ({
    type: ADD_TERM_REQUEST, prevTerm, name
})

export const removeTerm = (term) => ({
    type: REMOVE_TERM_REQUEST, term
})

export const editTerm = (term, name) => ({
    type: EDIT_TERM_REQUEST, term: term, name: name
})
