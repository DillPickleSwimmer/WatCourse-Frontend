import { put, call, takeLatest, all, select, takeEvery } from 'redux-saga/effects';
import { 
    getTermsEndpoint, 
    addTermEndpoint,
    removeTermEndpoint
} from '../api/termsEndpoint';
import { getTermCoursesSaga } from './termCourseSaga';
import { TERMNAMES } from '../constants/names';
import {
    GET_TERMS_REQUEST, GET_TERMS_SUCCESS, GET_TERMS_ERROR, 
    ADD_TERM_REQUEST, ADD_TERM_SUCCESS, ADD_TERM_ERROR,
    REMOVE_TERM_REQUEST, REMOVE_TERM_SUCCESS, REMOVE_TERM_ERROR, 
} from '../actions/types';

export const getUser = (state) => state.auth.user.user;

export function* getTermsSaga() {
    try {
        const user = yield select(getUser); 
        const token = user['qa'] || user.stsTokenManager.accessToken;

        const terms_ids = yield call(getTermsEndpoint, token, user.uid);
        
        yield all( terms_ids.map( term => call( getTermCoursesSaga, term))); 
        yield put({ type: GET_TERMS_SUCCESS });
    } catch (error) {
        yield put({ type: GET_TERMS_ERROR, error });
    }
}

export function* addTermSaga(action) {
    try {
        const user = yield select(getUser); 
        const token = user['qa'] || user.stsTokenManager.accessToken;

        // calculate next term
        var nextTermType;
        var nextTermYear;
        if ( action.term ) {
            nextTermType = action.term.term_number + 1;
            nextTermYear = action.term.year;
            if ( nextTermType >= TERMNAMES.length ) {
                nextTermType = 0;
                nextTermYear++;
            }
        } else {
            // use the current term
            var today = new Date();
            nextTermYear = today.getFullYear();
            nextTermType = Math.floor(today.getMonth()/4);
        }

        yield call(addTermEndpoint, token, user.uid, nextTermType, nextTermYear);
        
        yield put({ type: ADD_TERM_SUCCESS });
    } catch (error) {
        yield put({ type: ADD_TERM_ERROR, error });
    }
}

export function* removeTermSaga(action) {
    try {
        const user = yield select(getUser); 
        const token = user['qa'] || user.stsTokenManager.accessToken;

        yield call(removeTermEndpoint, token, user.uid, action.term.id);
        
        yield put({ type: REMOVE_TERM_SUCCESS });
    } catch (error) {
        yield put({ type: REMOVE_TERM_ERROR, error });
    }
}

export default function* termSaga() {
    yield takeLatest(GET_TERMS_REQUEST, getTermsSaga);   
    yield takeEvery(ADD_TERM_REQUEST, addTermSaga);
    yield takeEvery(REMOVE_TERM_REQUEST, removeTermSaga)
}