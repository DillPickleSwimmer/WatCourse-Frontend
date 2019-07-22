import { combineReducers } from 'redux';
import sampleQuoteReducer from './sampleReducer';
import termReducer from './termReducer';
import courseReducer from './courseReducer';
import authReducer from './authReducer';
import searchReducer from './searchReducer';
import shortlistReducer from './shortlistReducer';
import prereqReducer from './prereqReducer';
import programsReducer from './programsReducer';
import sidebarReducer from './sidebarReducer';
import { LOGOUT_SUCCESS, RESET_STORE } from '../actions/types';

const baseRootReducer = combineReducers({
    courses: courseReducer,
    sampleQuote: sampleQuoteReducer,
    terms: termReducer, 	
    auth: authReducer, 
    shortlist: shortlistReducer,
    programs: programsReducer,
    prereqs: prereqReducer,
    sidebar: sidebarReducer,
    search: searchReducer,
});

const rootReducer = (state = {}, action) => {
    if (action.type === LOGOUT_SUCCESS || action.type === RESET_STORE) {
        console.log("!!!!! RESET STORE !!!!!!!");
        state = {};
    }
  
    return baseRootReducer(state, action);
};

export default rootReducer;