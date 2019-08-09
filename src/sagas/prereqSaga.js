import { put, call, takeLatest } from 'redux-saga/effects';
import {  getCoursePrereqsEndpoint } from '../api/prereqsEndpoint';
import {
    GET_COURSE_PREREQS_ERROR, GET_COURSE_PREREQS_REQUEST, GET_COURSE_PREREQS_SUCCESS,
} from '../actions/types';

export function* getCoursePrereqsSaga(action) {
    try {
        const prereqMap = yield call(getCoursePrereqsEndpoint, action.subject, action.number);
        yield put({ type: GET_COURSE_PREREQS_SUCCESS, rules: prereqMap.rules });
    } catch (error) {
        yield put({ type: GET_COURSE_PREREQS_ERROR, error });
    }
}

export default function* prereqsSaga() {
    yield takeLatest(GET_COURSE_PREREQS_REQUEST, getCoursePrereqsSaga);  
}