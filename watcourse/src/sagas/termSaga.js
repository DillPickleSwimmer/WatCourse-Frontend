import { put, call, takeLatest, takeEvery } from 'redux-saga/effects';
import { getTermsEndpoint, putTermsEndpoint } from '../api/termsEndpoint';
import {
    GET_TERMS_SUCCESS, GET_TERMS_ERROR, GET_TERMS_REQUEST,
    PUT_TERMS_SUCCESS, PUT_TERMS_ERROR, PUT_TERMS_REQUEST,
} from '../actions/types';

export function* getTermsSaga(action) {
    try {
        const terms = yield call(getTermsEndpoint);
        yield put({ type: GET_TERMS_SUCCESS, terms });
    } catch (error) {
        yield put({ type: GET_TERMS_ERROR, error });
    }
}

export function* putTermsSaga(action) {
    try {
        const terms = yield call(putTermsEndpoint, action.payload);
        yield put({ type: PUT_TERMS_SUCCESS, terms });
    } catch (error) {
        yield put({ type: PUT_TERMS_ERROR, error });
    }
}

export default function* termSaga() {
    yield takeLatest(GET_TERMS_REQUEST, getTermsSaga);   
    yield takeEvery(PUT_TERMS_REQUEST, putTermsSaga);   
}