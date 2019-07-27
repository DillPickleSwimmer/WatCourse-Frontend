import { put, all, call, takeLatest } from 'redux-saga/effects';
import { postTranscriptEndpoint } from '../api/transcriptEndpoint';
import {
    POST_TRANSCRIPT_REQUEST, GET_TERMS_REQUEST
} from '../actions/types';
import { browserHistory } from 'react-router';
import { authRef } from '../base';  

export function* postTranscriptSaga(action) {
    try {
        const user = authRef.currentUser;
        const token = yield user.getIdToken();
        const { transcript }  = action;
        yield call(postTranscriptEndpoint, token, transcript);
        // Success
        yield put({ type: GET_TERMS_REQUEST });
        browserHistory.push('');
    } catch (error) {
        // TODO: Post an error to the global error state
    }
}


export default function* coursesSaga() {
    yield all([
        takeLatest(POST_TRANSCRIPT_REQUEST, postTranscriptSaga),
    ]);
}