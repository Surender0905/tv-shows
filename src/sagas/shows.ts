import { call, debounce, put, takeEvery, takeLatest } from 'redux-saga/effects';
import {
  showsLoadedAction,
  SHOWS_QUERY_CHANGE,
  showLoadedAction,
  LOAD_SHOW,
} from '../actions/shows';
import { loadShowDetail, searchShow } from '../api';

import { Action } from '../actions';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
export function* fetchShows(action: Action): Generator<any, any, any> {
  const shows = yield call(searchShow, action.payload);
  yield put(showsLoadedAction(shows));
}

export function* fetchShowDetail(action: Action): Generator<any, any, any> {
  const show = yield call(loadShowDetail, action.payload);

  yield put(showLoadedAction(show));
}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/

/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
function* mySaga() {
  yield debounce(500, SHOWS_QUERY_CHANGE, fetchShows);
  yield takeEvery(LOAD_SHOW, fetchShowDetail);
}

export default mySaga;
