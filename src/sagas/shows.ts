import {
  all,
  call,
  debounce,
  fork,
  put,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';
import { showLoadedAction, LOAD_SHOW } from '../actions/shows';

import { showsLoadedAction } from '../slices/shows';
import { loadShowDetail, searchShow, searchShow2 } from '../api';

import { Action } from '../actions';
import { showsQueryChange } from '../slices/shows';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
export function* fetchShows(action: Action): Generator<any, any, any> {
  searchShow('games').then((res) => console.log(res, 'res'));
  const showsAndCast = yield call(searchShow, action.payload);

  const shows = showsAndCast.map((item: any) => item.show);
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
// export function* queryChangeSaga() {
//   yield debounce(500, showsQueryChange, fetchShows);
// }

// const showsSagas = [fork(queryChangeSaga)];
function* mySaga() {
  // yield all([...showsSagas]);

  yield debounce(500, showsQueryChange, fetchShows);
  yield takeEvery(LOAD_SHOW, fetchShowDetail);
}

export default mySaga;
