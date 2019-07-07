import {
    AUTH_REQUEST, 
    SIGNUP_REQUEST,
    SIGNUP_DETAILS_REQUEST,
    LOGIN_REQUEST,
    LOGOUT_REQUEST,
} from '../actions/types';

export const authenticate = () => ({
    type: AUTH_REQUEST,
});

export const signup = (provider, email, password) => ({
    type: SIGNUP_REQUEST, provider, email, password
});

export const signupDetails = (program, startYear, startTrimester) => ({
    type: SIGNUP_DETAILS_REQUEST, program, startYear, startTrimester
});

export const login = (provider, email, password) => ({
    type: LOGIN_REQUEST, provider, email, password
});

export const logout = () => ({
    type: LOGOUT_REQUEST,
});