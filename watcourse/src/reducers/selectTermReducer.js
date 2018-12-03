import { 
    SELECT_TERM,
} from '../actions/types';
import { select } from 'redux-saga/effects';

// todo set this to []
const initialState = null;

export default function (state = initialState, action) {
    switch (action.type) {
        case SELECT_TERM:
            return action.term;
        default:
            return state;
    }
}