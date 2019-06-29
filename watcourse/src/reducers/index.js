import { combineReducers } from 'redux';
import sampleQuoteReducer from './sampleReducer';
import termReducer from './termReducer';
import courseReducer from './courseReducer';
import authReducer from './authReducer';
import searchModalReducer from './searchModalReducer';
import selectTermReducer from './selectTermReducer';
import shortlistReducer from './shortlistReducer';
import prereqReducer from './prereqReducer';
import programsReducer from './programsReducer';
import { LOGOUT_SUCCESS } from '../actions/types';

const baseRootReducer = combineReducers({
    sampleQuote: sampleQuoteReducer,
    terms: termReducer, 	
    courses: courseReducer,
    auth: authReducer, 
    searchModal: searchModalReducer,
    selectedTerm: selectTermReducer,
    shortlist: shortlistReducer,
    programs: programsReducer,
    prereqs: prereqReducer,
});

const rootReducer = (state, action) => {
    if (action.type === LOGOUT_SUCCESS) {
        state = undefined;
    }
  
    return baseRootReducer(state, action);
};

export default rootReducer;