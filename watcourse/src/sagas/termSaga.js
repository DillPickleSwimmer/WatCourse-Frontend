import { put, call, takeLatest, takeEvery, all, select } from 'redux-saga/effects';
import { 
    getTermsEndpoint, 
    putTermsEndpoint,
    getTermEndpoint
} from '../api/termsEndpoint';

import {
    GET_TERMS_SUCCESS, GET_TERMS_ERROR, GET_TERMS_REQUEST,
    PUT_TERMS_SUCCESS, PUT_TERMS_ERROR, PUT_TERMS_REQUEST,
} from '../actions/types';

export const getUser = (state) => state.auth.user.user;


function* getTerm(term) {
    try {
        const user = yield select(getUser); 
        const token = user['qa'] || user.stsTokenManager.accessToken;

        const courses = yield call(getTermEndpoint, term.id, token, user.uid);
        const custom_term = {
            id: term.id,
            name: term.name, 
            courses: courses, 
        };
        yield put({ type: GET_TERMS_SUCCESS, term: custom_term });
    } catch (error) {
        yield put({ type: GET_TERMS_ERROR, error });
    }
}

export function* getTermsSaga() {
    try {
        const user = yield select(getUser); 
        const token = user['qa'] || user.stsTokenManager.accessToken;

        const terms_ids = yield call(getTermsEndpoint, token, user.uid);
        
        yield all( terms_ids.map( term => call( getTerm, term) ) ); 

    } catch (error) {

        yield put({ type: GET_TERMS_ERROR, error });
    }
}

export function* putTermsSaga(action) {
    try {
        const user = yield select(getUser); 
        const token = user['qa'] || user.stsTokenManager.accessToken;
        const terms = yield call(putTermsEndpoint, token, user.uid,  action.term, action.course);
        yield put({ type: PUT_TERMS_SUCCESS, terms });
    } catch (error) {
        yield put({ type: PUT_TERMS_ERROR, error });
    }
}

export default function* termSaga() {
    yield takeLatest(GET_TERMS_REQUEST, getTermsSaga);   
    yield takeEvery(PUT_TERMS_REQUEST, putTermsSaga);   
}