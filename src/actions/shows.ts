import { ActionCreator } from '.';
import { Show } from '../models/Show';

export const SHOWS_LOADED = 'SHOWS_LOADED';

export const showsLoadedAction: ActionCreator<Show[]> = (shows: Show[]) => ({
  type: SHOWS_LOADED,
  payload: shows,
});

export const SHOWS_QUERY_CHANGE = 'SHOWS_QUERY_CHANGE';

export const showQueryChangeAction: ActionCreator<string> = (query) => ({
  type: SHOWS_QUERY_CHANGE,
  payload: query,
});
