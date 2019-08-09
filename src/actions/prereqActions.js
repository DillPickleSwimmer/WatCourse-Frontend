import {
    GET_COURSE_PREREQS_REQUEST,
} from '../actions/types';

export const getPrerequsites = (subject, number) => ({
    type: GET_COURSE_PREREQS_REQUEST, subject, number
});