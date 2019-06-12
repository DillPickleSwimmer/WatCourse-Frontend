import {
    AUTH_REQUEST, 
    SIGNUP_REQUEST,
    LOGIN_REQUEST,
    LOGOUT_REQUEST,
} from '../actions/types';

export const authenticate = () => ({
    type: AUTH_REQUEST,
});

export const signup = (email, password, program, startYear, startTrimester) => ({
    type: SIGNUP_REQUEST, email, password, program, startYear, startTrimester
});

export const login = (email, password) => ({
    type: LOGIN_REQUEST, email, password
});

export const logout = () => ({
    type: LOGOUT_REQUEST,
});