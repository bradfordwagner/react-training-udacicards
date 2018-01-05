// @flow

import type {Dispatch} from "redux";
import {loadDecks} from "./DeckActions";

export const CombinedActions = (dispatch: Dispatch<any>) => ({
  loadDecks: () => dispatch(loadDecks())
});

export interface CombinedActionsProps {
  loadDecks(): void
}
