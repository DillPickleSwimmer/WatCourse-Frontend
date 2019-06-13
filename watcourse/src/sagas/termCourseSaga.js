import { put, call, takeLatest, takeEvery, select } from 'redux-saga/effects';
import { 
    putTermCourseEndpoint,
    deleteTermCourseEndpoint,
    getTermCoursesEndpoint
} from '../api/termCourseEndpoint';

import {
    DELETE_SHORTLIST_SUCCESS,
    GET_TERM_COURSES_REQUEST, GET_TERM_COURSES_SUCCESS, GET_TERM_COURSES_ERROR,
    ADD_TERM_COURSE_REQUEST, ADD_TERM_COURSE_SUCCESS, ADD_TERM_COURSE_ERROR,
    REMOVE_TERM_COURSE_REQUEST, REMOVE_TERM_COURSE_SUCCESS, REMOVE_TERM_COURSE_ERROR, 
} from '../actions/types';

export const getUser = (state) => state.auth.user.user;

export function* getTermCoursesSaga(term) {
    try {
        const user = yield select(getUser); 
        const token = user['qa'] || user.stsTokenManager.accessToken;

        const courses = yield call(getTermCoursesEndpoint, term.id, token, user.uid);
        
        const custom_term = {
            id: term.id,
            name: term.name,
            termNum: term.term_number, 
            termYear: term.year,  
            courses: courses, 
        };
        yield put({ type: GET_TERM_COURSES_SUCCESS, term: custom_term });
    } catch (error) {
        yield put({ type: GET_TERM_COURSES_ERROR, error });
    }
}

export function* addTermCourseSaga(action) {
    try {
        const user = yield select(getUser); 
        const token = user['qa'] || user.stsTokenManager.accessToken;
        const {term, course} = action;
        yield call(putTermCourseEndpoint, token, user.uid,  action.term, action.course);
        yield put({ type: ADD_TERM_COURSE_SUCCESS, term, course});
        yield put({ type: DELETE_SHORTLIST_SUCCESS, course });
    } catch (error) {
        yield put({ type: ADD_TERM_COURSE_ERROR, error });
    }
}

export function* removeTermCourseSaga(action) {
    try {
        const user = yield select(getUser); 
        const token = user['qa'] || user.stsTokenManager.accessToken;
        const {term, course} = action;
        console.log('delete action is:' + JSON.stringify(action));
        yield call(deleteTermCourseEndpoint, token, user.uid,  term, course);
        console.log('delete done');
        yield put({ type: REMOVE_TERM_COURSE_SUCCESS, term, course });
    } catch (error) {
        yield put({ type: REMOVE_TERM_COURSE_ERROR, error });
    }
}

export default function* termCourseSaga() {
    yield takeLatest(GET_TERM_COURSES_REQUEST, getTermCoursesSaga);   
    yield takeEvery(ADD_TERM_COURSE_REQUEST, addTermCourseSaga);   
    yield takeEvery(REMOVE_TERM_COURSE_REQUEST, removeTermCourseSaga);   
}