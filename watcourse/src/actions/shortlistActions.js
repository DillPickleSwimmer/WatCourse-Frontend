import {
    GET_SHORTLIST_REQUEST,
    POST_SHORTLIST_REQUEST,
    DELETE_SHORTLIST_REQUEST,
} from '../actions/types';

export const getShortlist = () => ({
    type: GET_SHORTLIST_REQUEST
});

export const addToShortlist = (course) => ({
    type: POST_SHORTLIST_REQUEST, course
});

export const removeFromShortlist = (course) => ({
    type: DELETE_SHORTLIST_REQUEST, course
});
