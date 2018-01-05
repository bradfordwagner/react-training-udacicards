// @flow

import type {NavigationState} from './NavigationState';
import {InitialNavigationState} from "./NavigationState";

export const NavigationReducer = (state: NavigationState = InitialNavigationState, action: { type: string }) => {
  switch (action.type) {
    default:
      return state;
  }
};

