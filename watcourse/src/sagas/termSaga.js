import { put, call, takeLatest, all, select } from 'redux-saga/effects';
import { 
    getTermsEndpoint, 
} from '../api/termsEndpoint';
// TODO: implement add + delete term
import { getTermCoursesSaga } from './termCourseSaga';

import {
    GET_TERMS_REQUEST, GET_TERMS_SUCCESS, GET_TERMS_ERROR,
} from '../actions/types';

export const getUser = (state) => state.auth.user.user;

export function* getTermsSaga() {
    try {
        const user = yield select(getUser); 
        const token = user['qa'] || user.stsTokenManager.accessToken;

        const terms_ids = yield call(getTermsEndpoint, token, user.uid);
        
        yield all( terms_ids.map( term => call( getTermCoursesSaga, term))); 
        put({ type: GET_TERMS_SUCCESS });
    } catch (error) {
        yield put({ type: GET_TERMS_ERROR, error });
    }
}

export default function* termSaga() {
    yield takeLatest(GET_TERMS_REQUEST, getTermsSaga);   
}