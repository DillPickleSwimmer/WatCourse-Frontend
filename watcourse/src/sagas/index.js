import { fork } from 'redux-saga/effects';
import watchQuoteRequest from './watcher';

export default function* startForman() {
  yield fork(watchQuoteRequest);    // fork = nonblocking call
}