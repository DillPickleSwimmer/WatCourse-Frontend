import {
    GET_SHORTLIST_SUCCESS,
    POST_SHORTLIST_SUCCESS,
    DELETE_SHORTLIST_SUCCESS,
    POST_SHORTLIST_REQUEST,
    POST_SHORTLIST_ERROR,
    TERM_TO_SHORTLIST_REQUEST,
    TERM_TO_SHORTLIST_SUCCESS,
    TERM_TO_SHORTLIST_ERROR,
    DELETE_SHORTLIST_REQUEST,
    DELETE_SHORTLIST_ERROR,
} from '../actions/types';
import { moveCourseRequest, moveCourseSuccess, moveCourseError } from './moveCourseReducerUtilities';

const initialState = [];

export default function (state = initialState, action) {
    const { courses, shortlistCourses } = action;

    switch (action.type) {
    // RETRIEVE SHORTLIST
    case GET_SHORTLIST_SUCCESS:
        return shortlistCourses.map(cId => courses.find((e) => e.id === cId));

    // ADD TO SHORTLIST
    case POST_SHORTLIST_REQUEST:
    case TERM_TO_SHORTLIST_REQUEST:
        return moveCourseRequest(function(course) {
            return [...state.filter(c=>c !== course), course];
        }, action.course, state);
    case POST_SHORTLIST_SUCCESS:
    case TERM_TO_SHORTLIST_SUCCESS:
        return moveCourseSuccess(function() {return state}, action.course, state);
    case POST_SHORTLIST_ERROR:
    case TERM_TO_SHORTLIST_ERROR:
        return moveCourseError(function(course) {
            return [...state.filter(c=>c !== course)];
        }, action.course, state);

    // REMOVE FROM SHORTLIST
    case DELETE_SHORTLIST_REQUEST:
        return moveCourseRequest(function(course) {
            return [...state.filter(c=>c !== course)];
        }, action.course, state);
    case DELETE_SHORTLIST_SUCCESS:
        return moveCourseSuccess(function() {return state}, action.course, state);
    case DELETE_SHORTLIST_ERROR:
        return moveCourseRequest(function(course) {
            return [...state.filter(c=>c !== course), course];
        }, action.course, state);

    default:
        return state;
    }
}