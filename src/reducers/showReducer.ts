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
  query: string;
};

export const initialState: State = {
  shows: {},
  query: '',
};

function showReducer(state = initialState, action: AnyAction): State {
  switch (action.type) {
    case SHOWS_LOADED:
      return produce(state, (draft) => {
        const shows = action.payload as Show[];

        const showSchema = new schema.Entity('shows');

        const normalizedData = normalize(shows, [showSchema]);

        draft.shows = { ...draft.shows, ...normalizedData.entities.shows };
      });
    case SHOWS_QUERY_CHANGE:
      return produce(state, (draft) => {
        const query = action.payload as string;

        draft.query = query;
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
