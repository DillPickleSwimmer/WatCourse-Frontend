import { put, all, call, takeLatest, select} from 'redux-saga/effects';
import { getShortlist, postShortlist, deleteShortlist } from '../api/shortlistEndpoint';
import {
    GET_SHORTLIST_SUCCESS, GET_SHORTLIST_ERROR, GET_SHORTLIST_REQUEST,
    POST_SHORTLIST_SUCCESS, POST_SHORTLIST_ERROR, POST_SHORTLIST_REQUEST,
    DELETE_SHORTLIST_SUCCESS, DELETE_SHORTLIST_ERROR, DELETE_SHORTLIST_REQUEST,
} from '../actions/types';

export const getUser = (state) => state.auth.user.user 
const getCourses = (state) => state.courses


export function* getShortlistSaga(action) {
    try {
        console.log('fetching shortlist');
        const user = yield select(getUser); 
        const courses = yield select(getCourses);
        const token = user['qa'] || user.stsTokenManager.accessToken;        
        const shortlistCourses = yield call(getShortlist, token, user.uid);
        console.log('getShortlistSaga, shortlistCourses' + JSON.stringify(shortlistCourses))
        yield put({ type: GET_SHORTLIST_SUCCESS, courses, shortlistCourses });
        console.log('done fetching courses');
    } catch (error) {
        yield put({ type: GET_SHORTLIST_ERROR, error });
    }
}

export function* postShortlistSaga(action) {
    try {
        const user = yield select(getUser); 
        const token = user['qa'] || user.stsTokenManager.accessToken;        
        const course  = action.course
        yield call(postShortlist, token, user.uid, course.id);
        yield put({ type: POST_SHORTLIST_SUCCESS, course });
    } catch (error) {
        yield put({ type: POST_SHORTLIST_ERROR, error });
    }
}

export function* deleteShortlistSaga(action) {
    try {
        const user = yield select(getUser); 
        const token = user['qa'] || user.stsTokenManager.accessToken;        
        const course  = action.course
        yield call(deleteShortlist, token, user.uid, course.id);
        yield put({ type: DELETE_SHORTLIST_SUCCESS, course });
    } catch (error) {
        yield put({ type: POST_SHORTLIST_ERROR, error });
    }
}

export default function* coursesSaga() {
    yield all([
        takeLatest(GET_SHORTLIST_REQUEST, getShortlistSaga),
        takeLatest(POST_SHORTLIST_REQUEST, postShortlistSaga),
        takeLatest(DELETE_SHORTLIST_REQUEST, deleteShortlistSaga),
    ]);
}