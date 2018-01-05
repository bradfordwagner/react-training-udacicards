// @flow

import type {CombinedActions} from "./NavigationActions";
import {NavigationActionConstants} from "./NavigationActions";
import type {NavigationState} from './NavigationState';
import {InitialNavigationState} from "./NavigationState";
import {Navigator} from "../Navigation/Stack";


export const NavigationReducer = (state: NavigationState = InitialNavigationState, action: CombinedActions) => {
  let nextState: any;
  switch (action.type) {
    case (NavigationActionConstants.Navigate):
      console.info("received action", NavigationActionConstants.Navigate);
    default:
      nextState = Navigator.router.getStateForAction(action, state);
      console.info("defaulted state", nextState);
  }
  return nextState || state;
};

