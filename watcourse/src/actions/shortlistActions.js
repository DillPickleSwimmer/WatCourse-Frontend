import {
    GET_SHORTLIST_REQUEST,
    POST_SHORTLIST_REQUEST,
    DELETE_SHORTLIST_REQUEST,
} from '../actions/types';

export const getShortList = () => ({
    type: GET_SHORTLIST_REQUEST
})

export const postShortList = (course) => ({
    type: POST_SHORTLIST_REQUEST, course
})

export const deleteShortList = (course) => ({
    type: DELETE_SHORTLIST_REQUEST, course
})
