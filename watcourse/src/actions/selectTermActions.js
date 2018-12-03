import {
    SELECT_TERM
} from '../actions/types';

export const selectTerm = (term = null) => ({
    type: SELECT_TERM, term
})

export const deselectTerm = () => ({
    type: SELECT_TERM, term: null
})


