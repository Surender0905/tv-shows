import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { normalize, schema } from 'normalizr';
import { Show } from '../models/Show';

type State = {
  shows: { [showId: number]: Show };
  query_shows: { [query: string]: number[] };
  query: string;
  show_loading: { [showId: number]: boolean };
  loading: boolean;
};

const initialState: State = {
  shows: {},
  query_shows: {},
  query: '',
  show_loading: {},
  loading: false,
};

export const showsSlice = createSlice({
  name: 'shows',
  initialState,
  reducers: {
    loaded,
    queryChange,
  },
});

function loaded(state: State, action: PayloadAction<Show[]>) {
  const shows = action.payload as Show[];
  console.log(shows);

  if (!shows || shows.length < 0) {
    return;
  }

  const showSchema = new schema.Entity('myShow');

  const normalizedData = normalize(shows, [showSchema]);

  state.query_shows[state.query] = normalizedData.result;

  state.shows = { ...state.shows, ...normalizedData.entities.myShow };
  state.loading = false;
}

function queryChange(state: State, action: PayloadAction<string>) {
  const query = action.payload as string;

  state.query = query;
  state.loading = true;
}

const { actions, reducer } = showsSlice;

// Action creators are generated for each case reducer function
export const { loaded: showsLoadedAction, queryChange: showsQueryChange } =
  actions;

export default reducer;
