import { 
    AUTH_SUCCESS, AUTH_ERROR,
    LOGIN_SUCCESS, LOGIN_ERROR,
    LOGOUT_SUCCESS, LOGOUT_ERROR,
    SIGNUP_SUCCESS, SIGNUP_ERROR,
} from '../actions/types';

// todo set this to []
const initialState = {
    authenticated: false, 
    user: {},
    error: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
        case SIGNUP_SUCCESS:
        case AUTH_SUCCESS: 
            return {
                ...state,
                authenticated: true, 
                user: action.user,
                error: null,
            };  
        case LOGIN_ERROR:
        case SIGNUP_ERROR:
        case AUTH_ERROR:
            return {
                ...state,
                authenticated: false,
                user: null,
                error: action.error,
            }
        case LOGOUT_ERROR:
            return {
                ...state,
                authenticated: false,
                user: null,
                error: null,
            }
        default:
            return state;
    }
}