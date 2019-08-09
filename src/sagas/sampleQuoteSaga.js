import { put, call, takeLatest } from 'redux-saga/effects';
import { sampleEndpoint } from '../api/sampleAPI';
import {
    GET_QUOTE_SUCCESS, GET_QUOTE_ERROR, GET_QUOTE_REQUEST,
} from '../actions/types';

export function* sampleQuote(action) {
    try {
        const quote = yield call(sampleEndpoint, action.payload);
        yield put({ type: GET_QUOTE_SUCCESS, quote });
    } catch (error) {
        yield put({ type: GET_QUOTE_ERROR, error });
    }
}

export default function* sampleQuoteSaga() {
    yield takeLatest(GET_QUOTE_REQUEST, sampleQuote);   //take every if we want to handle concurrent requests
}