import {
    GET_COURSES_REQUEST, 
    GET_FLOW_COURSE_REQUEST,
} from '../actions/types';

export const getCourses = () => ({
    type: GET_COURSES_REQUEST,
});

export const getFlowCourse = ( courseName, watCID ) => ({
    type: GET_FLOW_COURSE_REQUEST, courseName: courseName, watCID: watCID
});