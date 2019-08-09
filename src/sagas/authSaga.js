import { put, all, takeLatest } from 'redux-saga/effects';
import {
    AUTH_REQUEST, AUTH_SUCCESS, AUTH_ERROR, 
    SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_ERROR,
    SIGNUP_DETAILS_REQUEST, SIGNUP_DETAILS_SUCCESS, SIGNUP_DETAILS_ERROR,
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR,
    LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_ERROR,
    PASSWORD_RESET_REQUEST, PASSWORD_RESET_SUCCESS, PASSWORD_RESET_ERROR,
} from '../actions/types';
import { authRef, fbProvider, googleProvider } from '../base';  
import { getTerms } from '../actions/termActions';
import { takeEvery } from 'redux-saga/effects';
import { putUser, getUserExists } from '../api/userEndpoint';

function* authenticateSaga() {
    if (authRef.currentUser) {
        yield authRef.currentUser.getIdToken()
            .then(function() {
                put({ type: AUTH_SUCCESS, user: authRef.currentUser });
            }).catch(function(error) {
                put({type: AUTH_ERROR, user: null, error: error });
            });
    } else {
        // Do nothing, no user is signed in
    }
}

function* signupSaga(action) {
    try {
        const {email, password, provider} = action;
        if (provider === 'EMAIL') {
            yield authRef.createUserWithEmailAndPassword(email, password);
        } else if (provider === 'FACEBOOK') {
            yield authRef.signInWithPopup(fbProvider);
        } else if (provider === 'GOOGLE') {
            yield authRef.signInWithPopup(googleProvider);
        } else {
            throw Error('Invalid Provider');  
        }
        const user = authRef.currentUser;
        const token = yield user.getIdToken();
        const userExists = yield getUserExists(token);
        if(userExists) {
            // User is in our database, send them to the home screen.
            yield put({ type: LOGIN_SUCCESS, user });
            return;
        }

        yield put({ type: SIGNUP_SUCCESS, user });
    } catch (error) {
        yield put({ type: SIGNUP_ERROR, error });
    }
}

function* signupDetailsSaga(action) {
    try {
        const {program, startYear, startTrimester} = action;
        const token = yield authRef.currentUser.getIdToken();
        // Add user to our backend
        yield putUser(token, program, startYear, startTrimester);
        yield put({ type: SIGNUP_DETAILS_SUCCESS });
    } catch (error) {
        yield put({ type: SIGNUP_DETAILS_ERROR, error });
    }
}

function* loginSaga(action) {
    try {
        if (action.provider === 'EMAIL'){
            yield authRef.signInWithEmailAndPassword(action.email, action.password);
        } else if (action.provider === 'FACEBOOK') {
            yield authRef.signInWithPopup(fbProvider);
        } else if (action.provider === 'GOOGLE') {
            yield authRef.signInWithPopup(googleProvider);
        } else {
            throw Error('Invalid Provider');
        }

        const user = authRef.currentUser;
        const tokenId = yield user.getIdToken();
        const isUserSignedUp = yield getUserExists(tokenId);
        if(!isUserSignedUp) {
            // The user is not in our database thus the user did not finish the 
            // signup details step.
            yield put({ type: SIGNUP_SUCCESS, user });
            return;
        }

        yield put({ type: LOGIN_SUCCESS, user });
    } catch (error) {
        yield put({ type: LOGIN_ERROR, error });
    }
}

function* logoutSaga() {
    try {
        const user = yield authRef.signOut();
        yield put({ type: LOGOUT_SUCCESS, user });
    } catch (error) {
        yield put({ type: LOGOUT_ERROR, error });
    }
}

function* resetPasswordSaga(action) {
    try {
        const email = action.email;
        yield authRef.sendPasswordResetEmail(email);
        yield put({ type: PASSWORD_RESET_SUCCESS });
    } catch (error) {
        yield put({ type: PASSWORD_RESET_ERROR, error });
    }
}

function* onLoginSaga() {
    yield put(getTerms());
}

export default function* authSaga() {    
    yield all([
        takeLatest(AUTH_REQUEST, authenticateSaga),
        takeLatest(SIGNUP_REQUEST, signupSaga),
        takeLatest(SIGNUP_DETAILS_REQUEST, signupDetailsSaga),
        takeLatest(LOGIN_REQUEST, loginSaga),
        takeLatest(LOGOUT_REQUEST, logoutSaga),
        takeEvery(LOGIN_SUCCESS, onLoginSaga),
        takeLatest(PASSWORD_RESET_REQUEST, resetPasswordSaga),
    ]);
}
