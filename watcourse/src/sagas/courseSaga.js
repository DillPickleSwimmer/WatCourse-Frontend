import { put, call, takeLatest, takeEvery } from 'redux-saga/effects';
import { getCoursesEndpoint, getFlowCourseEndpoint } from '../api/coursesEndpoint';
import {
    GET_COURSES_SUCCESS, GET_COURSES_ERROR, GET_COURSES_REQUEST, GET_SHORTLIST_REQUEST,
    GET_FLOW_COURSE_SUCCESS, GET_FLOW_COURSE_ERROR, GET_FLOW_COURSE_REQUEST,
} from '../actions/types';

export function* getCoursesSaga() {
    try {
        const courses = yield call(getCoursesEndpoint);
        yield put({ type: GET_COURSES_SUCCESS, courses });
        yield put({ type: GET_SHORTLIST_REQUEST });
    } catch (error) {
        yield put({ type: GET_COURSES_ERROR, error });
    }
}

export function* getFlowCourseSaga(action) {
    const { courseName, watCID } = action;
    try {
        const flowCourse = yield call(getFlowCourseEndpoint, courseName);
        yield put({ type: GET_FLOW_COURSE_SUCCESS, watCID, flowCourse });
    } catch (error) {
        console.log('ended - err')
        yield put({ type: GET_FLOW_COURSE_ERROR, error });
    }
}

export default function* coursesSaga() {
    yield takeLatest(GET_COURSES_REQUEST, getCoursesSaga); 
    yield takeEvery(GET_FLOW_COURSE_REQUEST, getFlowCourseSaga); 
}
