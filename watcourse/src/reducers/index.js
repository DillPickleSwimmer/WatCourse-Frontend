import { combineReducers } from 'redux';
import sampleQuoteReducer from './sampleReducer';
import termReducer from './termReducer';
import courseReducer from './courseReducer';
import authReducer from './authReducer';
import searchModalReducer from './searchModalReducer';
import { LOGOUT_SUCCESS } from '../actions/types';

const baseRootReducer = combineReducers({
    sampleQuote: sampleQuoteReducer,
    terms: termReducer, 
    courses: courseReducer,
    auth: authReducer, 
    searchModal: searchModalReducer,
});

const rootReducer = (state, action) => {
    if (action.type === LOGOUT_SUCCESS) {
      state = undefined
    }
  
    return baseRootReducer(state, action)
}

export default rootReducer;