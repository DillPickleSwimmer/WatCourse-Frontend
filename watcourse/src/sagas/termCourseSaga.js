import { put, call, takeLatest, takeEvery, select } from 'redux-saga/effects';
import { 
    putTermCourseEndpoint,
    deleteTermCourseEndpoint,
    getTermCoursesEndpoint
} from '../api/termCourseEndpoint';
import { postShortlistEndpoint, deleteShortlistEndpoint } from '../api/shortlistEndpoint';
import { validateMoveCourseRequest } from '../reducers/moveCourseReducerUtilities';

import {
    GET_SHORTLIST_REQUEST, TERM_TO_SHORTLIST_REQUEST, TERM_TO_SHORTLIST_SUCCESS, TERM_TO_SHORTLIST_ERROR,
    GET_TERM_COURSES_REQUEST, GET_TERM_COURSES_SUCCESS, GET_TERM_COURSES_ERROR,
    ADD_TERM_COURSE_REQUEST, ADD_TERM_COURSE_SUCCESS, ADD_TERM_COURSE_ERROR,
    REMOVE_TERM_COURSE_REQUEST, REMOVE_TERM_COURSE_SUCCESS, REMOVE_TERM_COURSE_ERROR, 
    MOVE_TERM_COURSE_REQUEST, MOVE_TERM_COURSE_SUCCESS, MOVE_TERM_COURSE_ERROR, 
} from '../actions/types';
import { authRef } from '../base';  

export function* getTermCoursesSaga(term) {
    try {
        const user = authRef.currentUser;
        const token = yield user.getIdToken();

        // TODO: map the full course, not just the ID
        let courses = yield call(getTermCoursesEndpoint, term.id, token, user.uid);

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
    const {termId, course} = action;
    try {
        validateMoveCourseRequest(course);
        const user = authRef.currentUser;
        const token = yield user.getIdToken();

        const response = yield call(putTermCourseEndpoint, token, user.uid,  action.termId, action.course);
        const arePrereqsMet = response.arePrereqsMet;
        yield put({ type: ADD_TERM_COURSE_SUCCESS, termId, course, arePrereqsMet});
        // TODO: this does not smoothly delete from shortlist
        yield put({ type: GET_SHORTLIST_REQUEST });
    } catch (error) {
        yield put({ type: ADD_TERM_COURSE_ERROR, error, termId, course });
    }
}

export function* removeTermCourseSaga(action) {
    console.log(action);
    const {termId, course} = action;
    try {
        const user = authRef.currentUser;
        const token = yield user.getIdToken();

        validateMoveCourseRequest(course);
        yield call(deleteTermCourseEndpoint, token, user.uid,  termId, course);


        yield put({ type: REMOVE_TERM_COURSE_SUCCESS, termId, course });
    } catch (error) {
        yield put({ type: REMOVE_TERM_COURSE_ERROR, error, termId, course });
    }
}

// TODO: this should be 1 endpoint in the backend 
export function* moveTermCourseSaga(action) {
    try {
        const user = authRef.currentUser;
        const token = yield user.getIdToken();
        
        validateMoveCourseRequest(action.course);
        yield call(putTermCourseEndpoint, token, user.uid,  action.toTermId, action.course);
        try {
            yield call(deleteTermCourseEndpoint, token, user.uid, action.fromTermId, action.course);
        } catch(error) {
            // undo add
            yield call(deleteTermCourseEndpoint, token, user.uid, action.toTermId, action.course);
            throw error;
        }
        yield put({ type: MOVE_TERM_COURSE_SUCCESS, toTermId: action.toTermId, fromTermId: action.fromTermId, course: action.course });
    } catch (error) {
        yield put({ type: MOVE_TERM_COURSE_ERROR, toTermId: action.toTermId, fromTermId: action.fromTermId, course: action.course, error });
    }
}

// TODO: this should be 1 endpoint in the backend 
export function* termToShortlistSaga(action) {
    try {
        validateMoveCourseRequest(action.course);
        const user = authRef.currentUser;
        const token = yield user.getIdToken();

        yield call(postShortlistEndpoint, token, user.uid, action.course.id);
        try {
            yield call(deleteTermCourseEndpoint, token, user.uid, action.termId, action.course);
        } catch(error) {
            // undo shortlist add
            yield call(deleteShortlistEndpoint, token, user.uid, action.course.id);
            throw error;
        }
        yield put({ type: TERM_TO_SHORTLIST_SUCCESS, termId: action.termId, course: action.course });
    } catch (error) {
        yield put({ type: TERM_TO_SHORTLIST_ERROR, termId: action.termId, course: action.course, error });
    }
}

export default function* termCourseSaga() {
    yield takeLatest(GET_TERM_COURSES_REQUEST, getTermCoursesSaga);   
    yield takeEvery(ADD_TERM_COURSE_REQUEST, addTermCourseSaga);   
    yield takeEvery(REMOVE_TERM_COURSE_REQUEST, removeTermCourseSaga);   
    yield takeEvery(MOVE_TERM_COURSE_REQUEST, moveTermCourseSaga);   
    yield takeEvery(TERM_TO_SHORTLIST_REQUEST, termToShortlistSaga);
}