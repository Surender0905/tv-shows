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

export const showsSelector = createSelector(showsMapSelector, (showsMap) =>
  Object.keys(showsMap).map((showId) => showsMap[+showId])
);
