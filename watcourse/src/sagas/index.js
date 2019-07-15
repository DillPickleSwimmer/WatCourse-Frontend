import { fork, all } from 'redux-saga/effects';
import sampleQuoteSaga from './sampleQuoteSaga';
import termSaga from './termSaga';
import termCourseSaga from './termCourseSaga';
import courseSaga from './courseSaga';
import authSaga from './authSaga';
import shortlistSaga from './shortlistSaga';
import programsSaga from './programsSaga';
import prereqsSaga from './prereqSaga';

export default function* startForman() {
    yield all([
        fork(sampleQuoteSaga),    // fork = nonblocking call
        fork(termSaga),
        fork(termCourseSaga),
        fork(courseSaga),
        fork(authSaga),
        fork(shortlistSaga),
        fork(programsSaga),
        fork(prereqsSaga),
    ]);
}