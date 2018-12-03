import {
    ADD_SHORTLIST, REMOVE_SHORTLIST
} from '../actions/types';

export const addToShortlist = (course) => ({
    type: ADD_SHORTLIST, course
})

export const removeFromShortlist = (course) => ({
    type: REMOVE_SHORTLIST, course
})


