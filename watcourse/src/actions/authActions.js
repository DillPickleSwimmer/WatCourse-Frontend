import {
    AUTH_REQUEST, 
    SIGNUP_REQUEST,
    SIGNUP_DETAILS_REQUEST,
    LOGIN_REQUEST,
    LOGOUT_REQUEST,
    PASSWORD_RESET_TOGGLE,
    PASSWORD_RESET_REQUEST,
    CLEAR_AUTH_MESSAGES,
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

export const togglePasswordReset = (showPasswordReset) => ({
    type: PASSWORD_RESET_TOGGLE, showPasswordReset
});

export const passwordReset = (email) => ({
    type: PASSWORD_RESET_REQUEST, email
});

export const logout = () => ({
    type: LOGOUT_REQUEST,
});

export const clearAuthMessages = () => ({
    type: CLEAR_AUTH_MESSAGES,
});