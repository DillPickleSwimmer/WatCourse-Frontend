import { put, call, takeLatest, all, takeEvery } from 'redux-saga/effects';
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
    EDIT_TERM_REQUEST, EDIT_TERM_SUCCESS, EDIT_TERM_ERROR,
} from '../actions/types';
import { authRef } from '../base';  

export function* getTermsSaga() {
    try {
        const user = authRef.currentUser;
        const token = yield user.getIdToken();
        
        const terms = yield call(getTermsEndpoint, token, user.uid);

        yield all( terms.map( term => call( getTermCoursesSaga, term))); 
        yield put({ type: GET_TERMS_SUCCESS });
    } catch (error) {
        yield put({ type: GET_TERMS_ERROR, error });
    }
}

export function* addTermSaga(action) {
    try {
        const user = authRef.currentUser;
        const token = yield user.getIdToken();

        // calculate next term
        var nextTermType;
        var nextTermYear;
        if ( action.lastTerm ) {
            nextTermType = action.prevTerm.termNum + 1;
            nextTermYear = action.prevTerm.termYear;
            if ( nextTermType - 1 >= TERMNAMES.length ) {
                nextTermType = 0;
                nextTermYear++;
            }
        } else {
            // use the current term
            var today = new Date();
            nextTermYear = today.getFullYear();
            nextTermType = Math.floor(today.getMonth()/4);
        }

        yield call(addTermEndpoint, token, user.uid, nextTermType, nextTermYear, action.name);
        
        yield put({ type: ADD_TERM_SUCCESS });
        // TODO: only get the one term, not all terms
        yield put({ type: GET_TERMS_REQUEST });
    } catch (error) {
        yield put({ type: ADD_TERM_ERROR, error });
    }
}

export function* removeTermSaga(action) {
    try {
        const user = authRef.currentUser;
        const token = yield user.getIdToken();

        yield call(removeTermEndpoint, token, user.uid, action.term.id);
        
        yield put({ type: REMOVE_TERM_SUCCESS, termId: action.term.id });
        // TODO: only get the one term, not all terms
        yield put({ type: GET_TERMS_REQUEST });
    } catch (error) {
        yield put({ type: REMOVE_TERM_ERROR, error });
    }
}

export function* editTermSaga(action) {
    try {
        /* TODO: Make a way to update term details in backend */
        // const user = authRef.currentUser;
        // const token = yield user.getIdToken();

        //yield call(editTermEndpoint, token, user.uid, action.term.id);
        
        yield put({ type: EDIT_TERM_SUCCESS, term: action.term});
    } catch (error) {
        yield put({ type: EDIT_TERM_ERROR, term: action.term, error });
    }
}


export default function* termSaga() {
    yield takeLatest(GET_TERMS_REQUEST, getTermsSaga);   
    yield takeEvery(ADD_TERM_REQUEST, addTermSaga);
    yield takeEvery(REMOVE_TERM_REQUEST, removeTermSaga);
    yield takeEvery(EDIT_TERM_REQUEST, editTermSaga);
}