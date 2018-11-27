import { takeLatest } from 'redux-saga/effects';
import { sampleQuoteSaga } from './sampleQuoteSaga';
import { GET_QUOTE_REQUEST } from '../actions/types';

export default function* watchQuoteRequest() {
  yield takeLatest(GET_QUOTE_REQUEST, sampleQuoteSaga);
}