import { GET_QUOTE_SUCCESS } from '../actions/types';

const initialState = "no quote";

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_QUOTE_SUCCESS:
            return action.quote.value || state;    // make use of the spread operator
        default:
            return state;
    }
}