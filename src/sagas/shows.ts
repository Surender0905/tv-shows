import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { showsLoadedAction, SHOWS_QUERY_CHANGE } from '../actions/shows';
import { searchShow } from '../api';

import { Action } from '../actions';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchShows(action: Action): Generator<any, any, any> {
  const shows = yield call(searchShow, action.payload);
  yield put(showsLoadedAction(shows));
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
  yield takeLatest(SHOWS_QUERY_CHANGE, fetchShows);
}

export default mySaga;
