import { put, call, takeLatest } from 'redux-saga/effects';
import { getProgramsEndpoint } from '../api/programsEndpoint';
import {
    GET_PROGRAMS_SUCCESS, GET_PROGRAMS_ERROR, GET_PROGRAMS_REQUEST,
} from '../actions/types';

export function* getProgramsSaga() {
    try {
        const programs = yield call(getProgramsEndpoint);
        yield put({ type: GET_PROGRAMS_SUCCESS, programs });
    } catch (error) {
        yield put({ type: GET_PROGRAMS_ERROR, error });
    }
}

export default function* programsSaga() {
    yield takeLatest(GET_PROGRAMS_REQUEST, getProgramsSaga);  
}