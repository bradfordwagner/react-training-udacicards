// @flow

import type {NavigationState} from "./NavigationState";
import type {DeckState} from "./DeckState";

export type CombinedState = {
  nav: NavigationState,
  deck: DeckState
}
