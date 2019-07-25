import { put, all, call, takeLatest, select} from 'redux-saga/effects';
import { getShortlistEndpoint, postShortlistEndpoint, deleteShortlistEndpoint } from '../api/shortlistEndpoint';
import {
    GET_SHORTLIST_SUCCESS, GET_SHORTLIST_ERROR, GET_SHORTLIST_REQUEST,
    POST_SHORTLIST_SUCCESS, POST_SHORTLIST_ERROR, POST_SHORTLIST_REQUEST,
    DELETE_SHORTLIST_SUCCESS, DELETE_SHORTLIST_ERROR, DELETE_SHORTLIST_REQUEST,
import { authRef } from '../base';  
import { validateMoveCourseRequest } from '../reducers/moveCourseReducerUtilities';

const getCourses = (state) => state.courses;


export function* getShortlistSaga() {
    try {
        const user = authRef.currentUser;
        const token = yield user.getIdToken();
        
        const courses = yield select(getCourses);
        const shortlistCourses = yield call(getShortlistEndpoint, token, user.uid);
        yield put({ type: GET_SHORTLIST_SUCCESS, courses, shortlistCourses });
    } catch (error) {
        yield put({ type: GET_SHORTLIST_ERROR, error });
    }
}

export function* postShortlistSaga(action) {
    try {
        validateMoveCourseRequest(action.course);
        const user = authRef.currentUser;
        const token = yield user.getIdToken();

        const course  = action.course;
        yield call(postShortlistEndpoint, token, user.uid, course.id);
        yield put({ type: POST_SHORTLIST_SUCCESS, course });
    } catch (error) {
        yield put({ type: POST_SHORTLIST_ERROR, course: action.course, error });
    }
}

export function* deleteShortlistSaga(action) {
    try {
        const user = authRef.currentUser;
        const token = yield user.getIdToken();

        const course  = action.course;
        yield call(deleteShortlistEndpoint, token, user.uid, course.id);
        yield put({ type: DELETE_SHORTLIST_SUCCESS, course });
    } catch (error) {
        yield put({ type: DELETE_SHORTLIST_ERROR, course: action.course, error });
    }
}

export default function* coursesSaga() {
    yield all([
        takeLatest(GET_SHORTLIST_REQUEST, getShortlistSaga),
        takeLatest(POST_SHORTLIST_REQUEST, postShortlistSaga),
        takeLatest(DELETE_SHORTLIST_REQUEST, deleteShortlistSaga),
    ]);
}