import { put, call, takeLatest } from 'redux-saga/effects';
import { authRef } from '../base'; 
import { submitFeedbackEndpoint } from '../api/feedbackEndpoint';
import { reportBugEndpoint } from '../api/bugEndpoint';
import {
    REPORT_BUG_REQUEST, REPORT_BUG_ERROR, REPORT_BUG_SUCCESS,
    SUBMIT_FEEDBACK_REQUEST, SUBMIT_FEEDBACK_ERROR, SUBMIT_FEEDBACK_SUCCESS, 
} from '../actions/types';

export function* reportBugSaga(action) {
    try {        
        const user = authRef.currentUser;
        const token = yield user.getIdToken();

        yield call(reportBugEndpoint, token, user.uid, action.msg, action.screenshots);

        yield put({ type: REPORT_BUG_SUCCESS });
    } catch (error) {
        yield put({ type: REPORT_BUG_ERROR, error });
    }
}

export function* submitFeedbackSaga(action) {
    try {        
        const user = authRef.currentUser;
        const token = yield user.getIdToken();

        yield call(submitFeedbackEndpoint, token, user.uid, action.satisfaction, 
            action.helpful, action.challenges, action.features);

        yield put({ type: REPORT_BUG_SUCCESS });
    } catch (error) {
        yield put({ type: REPORT_BUG_ERROR, error });
    }
}

export default function* feedbackSaga() {
    yield takeLatest(REPORT_BUG_REQUEST, reportBugSaga); 
    yield takeLatest(SUBMIT_FEEDBACK_REQUEST, submitFeedbackSaga); 
}
