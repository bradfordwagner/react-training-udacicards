// @flow

import {Navigator} from "../Navigation/Stack";
import {States} from "../Navigation/NavigationStates";

export type NavigationState = any

const dlvAction = Navigator.router.getActionForPathAndParams(States.DeckListView)
const dlvState = Navigator.router.getStateForAction(dlvAction);

export const InitialNavigationState = dlvState;

