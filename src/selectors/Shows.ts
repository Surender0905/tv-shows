import { createSelector } from 'reselect';
import { State } from '../store';

export const showStateSelector = (state: State) => state.shows;

export const showsQuerySelector = createSelector(
  showStateSelector,
  (showState) => showState.query
);

export const showsMapSelector = createSelector(
  showStateSelector,
  (showState) => showState.shows
);

export const queryShowsMapSelector = createSelector(
  showStateSelector,
  (showState) => showState.query_shows
);

export const showsLoadingSelector = createSelector(
  showStateSelector,
  (showState) => showState.loading
);
export const showsSelector = createSelector(
  showsMapSelector,
  showsQuerySelector,
  queryShowsMapSelector,
  (showsMap, query, queryShowsMap) =>
    queryShowsMap[query]?.map((showId) => showsMap[showId])
);
