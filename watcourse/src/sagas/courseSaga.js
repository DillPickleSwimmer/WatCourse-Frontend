import { put, call, takeLatest } from 'redux-saga/effects';
import { getCoursesEndpoint, getCoursePrereqsEndpoint } from '../api/coursesEndpoint';
import {
    GET_COURSE_PREREQS_ERROR, GET_COURSE_PREREQS_REQUEST, GET_COURSE_PREREQS_SUCCESS,
    GET_COURSES_SUCCESS, GET_COURSES_ERROR, GET_COURSES_REQUEST,
} from '../actions/types';

export function* getCoursesSaga() {
    try {
        const courses = yield call(getCoursesEndpoint);
        yield put({ type: GET_COURSES_SUCCESS, courses });
    } catch (error) {
        yield put({ type: GET_COURSES_ERROR, error });
    }
}

export default function* coursesSaga() {
    yield takeLatest(GET_COURSES_REQUEST, getCoursesSaga); 
}