import { 
    AUTH_SUCCESS, AUTH_ERROR,
    LOGIN_SUCCESS, LOGIN_ERROR,
    LOGOUT_SUCCESS, LOGOUT_ERROR,
    SIGNUP_SUCCESS, SIGNUP_ERROR,
    SIGNUP_DETAILS_SUCCESS, SIGNUP_DETAILS_ERROR,
    PASSWORD_RESET_SUCCESS, PASSWORD_RESET_ERROR,
    PASSWORD_RESET_TOGGLE,
} from '../actions/types';

export const SIGNUP_DETAILS = 'SIGNUP_DETAILS';
export const LOGGED_IN = 'LOGGED_IN';

const initialState = {
    authenticated: false, 
    showPasswordReset: false,
    msg: null,
    user: {},
    error: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
    case PASSWORD_RESET_TOGGLE:
        return {
            ...state,
            msg: null,
            error: null,
            showPasswordReset: action.showPasswordReset === undefined ? !state.showPasswordReset : action.showPasswordReset,
        };
    case PASSWORD_RESET_SUCCESS:
        return {
            ...state,
            error: null,
            msg: 'Instructions for resetting your password have been sent!',
        }
    case SIGNUP_SUCCESS:
        return {
            ...state,
            authenticated: true,
            page: SIGNUP_DETAILS, 
            user: action.user,
            error: null,
            msg: null,
        };
    case SIGNUP_DETAILS_SUCCESS:
        return {
            ...state,
            authenticated: true,
            page: LOGGED_IN,
            error: null,
            msg: null,
        };
    case LOGIN_SUCCESS:
    case AUTH_SUCCESS: 
        return {
            ...state,
            authenticated: LOGGED_IN, 
            user: action.user,
            error: null,
            msg: null,
        };  
    case SIGNUP_DETAILS_ERROR:
        return {
            ...state,
            authenticated: true,
            page: SIGNUP_DETAILS,
            error: action.error,
            msg: null,
        };
    case LOGIN_ERROR:
    case SIGNUP_ERROR:
    case AUTH_ERROR:
    case PASSWORD_RESET_ERROR:
        return {
            ...state,
            authenticated: false,
            user: null,
            error: action.error,
            msg: null,
        };
    case LOGOUT_SUCCESS:
        return {
            ...state,
            authenticated: false,
            user: null,
            error: null,
            shortlist: [],
            msg: null,
        };
    case LOGOUT_ERROR:
    default:
        return state;
    }
}