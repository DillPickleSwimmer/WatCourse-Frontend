import { fork, all } from 'redux-saga/effects';
import sampleQuoteSaga from './sampleQuoteSaga';
import termSaga from './termSaga';
import courseSaga from './courseSaga';
import authSaga from './authSaga';
import shortlistSaga from './shortlistSaga';

export default function* startForman() {
    yield all([
        fork(sampleQuoteSaga),    // fork = nonblocking call
        fork(termSaga),
        fork(courseSaga),
        fork(authSaga),
        fork(shortlistSaga),
    ]);
}