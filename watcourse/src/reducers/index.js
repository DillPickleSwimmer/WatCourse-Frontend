import { combineReducers } from 'redux';
import sampleQuoteReducer from './sampleReducer';
import termReducer from './termReducer';
import courseReducer from './courseReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
    sampleQuote: sampleQuoteReducer,
    terms: termReducer, 
    courses: courseReducer,
    auth: authReducer, 
});

export default rootReducer;