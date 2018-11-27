import initialState from './initialState';
import { GET_QUOTE_SUCCESS } from '../actions/types';

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_QUOTE_SUCCESS:
            return {...state, sampleQuote: action.quote.value};    // make use of the spread operator
        default:
            return state;
        }
  }