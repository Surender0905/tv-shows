import produce from 'immer';
import { normalize, schema } from 'normalizr';

import { AnyAction } from 'redux';
import {} from '../actions';
import {
  SHOWS_LOADED,
  SHOWS_QUERY_CHANGE,
  SHOW_DETAIL_LOADED,
} from '../actions/shows';
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
    case SHOWS_LOADED:
      return produce(state, (draft) => {
        const shows = action.payload as Show[];

        if (!shows || shows.length < 0) {
          return;
        }

        const showSchema = new schema.Entity('shows');

        const normalizedData = normalize(shows, [showSchema]);

        draft.query_shows[draft.query] = normalizedData.result;

        draft.shows = { ...draft.shows, ...normalizedData.entities.shows };
        draft.loading = false;
      });
    case SHOWS_QUERY_CHANGE:
      return produce(state, (draft) => {
        const query = action.payload as string;

        draft.query = query;
        draft.loading = true;
      });
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
