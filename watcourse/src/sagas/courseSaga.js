import { put, call, takeLatest } from 'redux-saga/effects';
import { getCoursesEndpoint } from '../api/coursesEndpoint';
import {
    GET_COURSES_SUCCESS, GET_COURSES_ERROR, GET_COURSES_REQUEST,
} from '../actions/types';

export function* getCoursesSaga(action) {
    try {
        console.log(' fetching courses');
        const courses = yield call(getCoursesEndpoint);
        yield put({ type: GET_COURSES_SUCCESS, courses });
        console.log('done fetching courses');
    } catch (error) {
        yield put({ type: GET_COURSES_ERROR, error });
    }
}

export default function* coursesSaga() {
    yield takeLatest(GET_COURSES_REQUEST, getCoursesSaga);  
}