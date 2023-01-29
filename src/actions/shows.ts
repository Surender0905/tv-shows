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

export const SHOW_DETAIL_LOADED = 'SHOW_DETAIL_LOADED';

export const showLoadedAction: ActionCreator<Show> = (show: Show) => ({
  type: SHOW_DETAIL_LOADED,
  payload: show,
});

export const LOAD_SHOW = 'LOAD_SHOW';

export const loadShowAction: ActionCreator<number> = (showId: number) => ({
  type: LOAD_SHOW,
  payload: showId,
});
