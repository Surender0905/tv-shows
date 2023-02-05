import produce from 'immer';
import { normalize, schema } from 'normalizr';

import { AnyAction } from 'redux';
import {} from '../actions';
import { SHOW_DETAIL_LOADED } from '../actions/shows';
import { Show } from '../models/Show';

export type State = {
  shows: { [showId: number]: Show };
  query_shows: { [query: string]: number[] };
  query: string;
  show_loading: { [showId: number]: boolean };
  loading: boolean;
};

export const initialState: State = {
  shows: {},
  query_shows: {},
  query: '',
  show_loading: {},
  loading: false,
};

function showReducer(state = initialState, action: AnyAction): State {
  switch (action.type) {
    case SHOW_DETAIL_LOADED:
      return produce(state, (draft) => {
        const show = action.payload as Show;

        draft.shows[show.id] = show;
      });
    default:
      return state;
  }
}

export default showReducer;
