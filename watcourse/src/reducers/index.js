import { combineReducers } from 'redux';
import sampleQuoteReducer from './sampleReducer';
import termReducer from './termReducer';
import courseReducer from './courseReducer';

const rootReducer = combineReducers({
    sampleQuote: sampleQuoteReducer,
    terms: termReducer, 
    courses: courseReducer,
});

export default rootReducer;