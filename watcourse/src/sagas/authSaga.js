import { put, all, takeLatest } from 'redux-saga/effects';
import {
    AUTH_REQUEST, AUTH_SUCCESS, AUTH_ERROR, 
    SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_ERROR,
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR,
    LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_ERROR,
} from '../actions/types';
import { authRef } from '../base';  
import { getTerms } from '../actions/termActions';
import { takeEvery } from 'redux-saga/effects';
import { putUser } from '../api/userEndpoint';

function* authenticateSaga(action) {
    yield authRef.onAuthStateChanged(user => {
        if (user) {
            put({ type: AUTH_SUCCESS, user });
        } else {
            put({ type: AUTH_ERROR, user: null, error: 'unknown' });
        }
    });
    // onIdTokenChanged
}

function* signupSaga(action) {
    try {
        const {email, password, program, startYear, startTrimester} = action;
        // Get user from Firebase
        const user = yield authRef.createUserWithEmailAndPassword(email, password);
        // Add user to our backend
        yield putUser(user.user.qa, program, startYear, startTrimester);
        yield put({ type: SIGNUP_SUCCESS, user });
    } catch (error) {
        yield put({ type: SIGNUP_ERROR, error });
    }
}

function* loginSaga(action) {
    try {
        const user = yield authRef.signInWithEmailAndPassword(action.email, action.password);
        yield put({ type: LOGIN_SUCCESS, user });
    } catch (error) {
        yield put({ type: LOGIN_ERROR, error });
    }
}

function* logoutSaga(action) {
    try {
        const user = yield authRef.signOut();
        yield put({ type: LOGOUT_SUCCESS, user });
    } catch (error) {
        yield put({ type: LOGOUT_ERROR, error });
    }
}

function* onLoginSaga(action) {
    yield put(getTerms());
}



export default function* authSaga() {    
    yield all([
        takeLatest(AUTH_REQUEST, authenticateSaga),
        takeLatest(SIGNUP_REQUEST, signupSaga),
        takeLatest(LOGIN_REQUEST, loginSaga),
        takeLatest(LOGOUT_REQUEST, logoutSaga),
        takeEvery(LOGIN_SUCCESS, onLoginSaga),
    ]);
}
