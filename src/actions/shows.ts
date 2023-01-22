import { ActionCreator } from '.';
import { Show } from '../models/Show';

export const SHOWS_LOADED = 'SHOWS_LOADED';

export const showsLoadedAction: ActionCreator<Show[]> = (shows: Show[]) => ({
  type: SHOWS_LOADED,
  payload: shows,
});
