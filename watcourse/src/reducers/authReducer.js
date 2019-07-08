import { 
    AUTH_SUCCESS, AUTH_ERROR,
    LOGIN_SUCCESS, LOGIN_ERROR,
    LOGOUT_SUCCESS, LOGOUT_ERROR,
    SIGNUP_SUCCESS, SIGNUP_ERROR,
    SIGNUP_DETAILS_SUCCESS, SIGNUP_DETAILS_ERROR,
} from '../actions/types';

export const SIGNUP_DETAILS = 'SIGNUP_DETAILS';
export const LOGGED_IN = 'LOGGED_IN';

const initialState = {
    authenticated: false, 
    user: {},
    error: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
    case SIGNUP_SUCCESS:
        return {
            ...state,
            authenticated: true,
            page: SIGNUP_DETAILS, 
            user: action.user,
            error: null,
        };
    case SIGNUP_DETAILS_SUCCESS:
        return {
            ...state,
            authenticated: true,
            page: LOGGED_IN,
            error: null,
        };
    case LOGIN_SUCCESS:
    case AUTH_SUCCESS: 
        return {
            ...state,
            authenticated: LOGGED_IN, 
            user: action.user,
            error: null,
        };  
    case SIGNUP_DETAILS_ERROR:
        return {
            ...state,
            authenticated: true,
            page: SIGNUP_DETAILS,
            error: action.error,
        };
    case LOGIN_ERROR:
    case SIGNUP_ERROR:
    case AUTH_ERROR:
        return {
            ...state,
            authenticated: false,
            user: null,
            error: action.error,
        };
    case LOGOUT_SUCCESS:
        return {
            ...state,
            authenticated: false,
            user: null,
            error: null,
            shortlist: [],
        };
    case LOGOUT_ERROR:
    default:
        return state;
    }
}