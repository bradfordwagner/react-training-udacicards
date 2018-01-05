// @flow

import type {Dispatch} from 'redux-thunk';

const NavigateTo = "Navigate";
const GoBack = "GoBack";

export const NavigationActionConstants = {
  [NavigateTo]: NavigateTo,
  [GoBack]: GoBack,
};

export type NavigateToAction = {
  type: string,
  stateName: string,
  params?: any
}

export type GoBackAction = {
  type: string,
}

export type CombinedActions = NavigateToAction & GoBackAction

export const navigateTo = (stateName: string, params?: any) => (dispatch: Dispatch<NavigateToAction>) => {
  dispatch({type: NavigateTo, stateName, params})
};

export const goBack = () => (dispatch: Dispatch<GoBackAction>) => dispatch({type: GoBack})
