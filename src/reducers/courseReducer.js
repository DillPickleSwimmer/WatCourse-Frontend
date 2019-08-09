import { GET_COURSES_SUCCESS, 
    GET_FLOW_COURSE_SUCCESS, GET_FLOW_COURSE_ERROR } from '../actions/types';

const initialState = [];

export default function (state = initialState, action) {
    const { watCID, flowCourse } = action;
    let updatedCourse;

    switch (action.type) {
    case GET_COURSES_SUCCESS:
        return action.courses || state;
    case GET_FLOW_COURSE_SUCCESS:
        updatedCourse = state.find(course => course.id === watCID);
        if ( !updatedCourse ) return state;

        updatedCourse.flow = {
            ratings : flowCourse.ratings,
        }; 
        return [
            ...state.filter(course => course.id !== watCID), 
            updatedCourse
        ];
    case GET_FLOW_COURSE_ERROR:
        // Clear the flow info from the state.
        updatedCourse = state.find(course => course.id === watCID);
        if ( !updatedCourse ) return state;
        updatedCourse.flow = null;
        return [
            ...state.filter(course => course.id !== watCID), 
            updatedCourse
        ];
    default:
        return state;
    }
}