import { fork } from 'redux-saga/effects';
import sampleQuoteSaga from './sampleQuoteSaga';
import termSaga from './termSaga';
import courseSaga from './courseSaga';

export default function* startForman() {
    yield fork(sampleQuoteSaga);    // fork = nonblocking call
    yield fork(termSaga);
    yield fork(courseSaga);
}