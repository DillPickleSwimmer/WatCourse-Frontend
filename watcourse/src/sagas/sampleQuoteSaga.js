import { put, call } from 'redux-saga/effects';
import { sampleEndpoint } from '../api/sampleAPI';
import {
    GET_QUOTE_SUCCESS
} from '../actions/types';

export function* sampleQuoteSaga(action) {
  try {
    const quote = yield call(sampleEndpoint, action.payload);
    yield put({ type: GET_QUOTE_SUCCESS, quote });
  } catch (error) {
    yield put({ type: 'GET_QUOTE_ERROR', error });
  }
}