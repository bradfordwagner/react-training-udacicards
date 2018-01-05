// @flow


import type {NavigationState} from "./NavigationState";
import type {DeckState} from "./DeckState";

export class CombinedState {
  nav: NavigationState
  deck: DeckState
}
