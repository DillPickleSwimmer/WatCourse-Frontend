import {
    GET_SHORTLIST_SUCCESS,
    POST_SHORTLIST_SUCCESS,
    DELETE_SHORTLIST_SUCCESS,
} from '../actions/types';


const initialState = [];

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_SHORTLIST_SUCCESS:
            const {courses, shortlistCourses } = action
            return shortlistCourses.map(cId => courses.find((e) => e.id === cId))
        case POST_SHORTLIST_SUCCESS:
            return [...state.filter(course=>course!==action.course), action.course];
        case DELETE_SHORTLIST_SUCCESS:
            return [...state.filter(course=>course!==action.course)];
        default:
            return state;
    }
}