// @flow
import type {NavigationProps} from '../Lib/Navigation';
import type {NewDeckNavigationProps} from './NewDeckContainer';
import type {Action} from '../Components/ActionBar'
import {ActionBar} from '../Components/ActionBar';
import type {IndividualDeckViewContainerNavigationProps} from './IndividualDeckViewContainer'

import React from 'react';
import {Animated, ScrollView, View} from 'react-native';
import {Deck} from '../Lib/Deck';
import {Layout} from '../Util/CommonStyles';
import {DeckSummary} from '../Components/DeckSummary';
import {States} from '../Navigation/NavigationStates';
import {connect} from "react-redux";
import type {CombinedState} from "../Redux/CombinedState";
import type {CombinedActionsProps} from "../Redux/CombinedActions";
import {CombinedActions} from "../Redux/CombinedActions";

type ReduxProps = {
  decks: Deck[],
  loadedDecks: boolean,
}

type Props = {
  navigation: NavigationProps<any>,
}

type CombinedProps = Props & CombinedActionsProps & ReduxProps

type State = {
  springAnim: { [uuid: string]: Animated.Value }
}

class DeckListView extends React.Component<CombinedProps, State> {
  animationDuration = 200;

  state = {
    springAnim: {}
  };

  componentDidMount = () => {
    this.props.loadDecks();
  };

  componentWillReceiveProps = (props: CombinedProps) => {
    const springAnim: { [uuid: string]: Animated.Value } = {};
    const decks = this.props.decks;
    decks.forEach(deck => springAnim[deck.uuid] = new Animated.Value(1));
    console.info("setting animations", springAnim);
    this.setState({springAnim})
  };

  newDeck = () => {
    const params: NewDeckNavigationProps = {};
    this.props.navigation.navigate(States.AddDeck, params)
  };

  buildActions = () => {
    const createDeck: Action = {
      title: "Create Deck",
      onPress: () => this.newDeck()
    };
    return [createDeck]
  };

  openDeckView = (deck: Deck) => {
    this.springAnimation(deck);
    setTimeout(() => {
      this.unspringAnimation(deck);
      setTimeout(() => {
        const params: IndividualDeckViewContainerNavigationProps = {afterEdit: () => this.forceUpdate(), deck};
        this.props.navigation.navigate(States.IndividualDeckView, params)
      }, this.animationDuration + 100)
    }, this.animationDuration)
  };

  springAnimation = (deck: Deck) => {
    Animated.spring(this.getAnimatedValue(deck.uuid), {duration: this.animationDuration, toValue: 1.3}).start()
  };

  unspringAnimation = (deck: Deck) => {
    Animated.spring(this.getAnimatedValue(deck.uuid), {duration: this.animationDuration, toValue: 1}).start()
  };

  getAnimatedValue = (uuid: string) => this.state.springAnim && this.state.springAnim[uuid] ? this.state.springAnim[uuid] : new Animated.Value(1);

  render = () => (
    <View style={[Layout.Flex]}>
      <ScrollView style={[Layout.Flex]}>
        {this.props.decks.map((deck, index) => (
          <Animated.View key={deck.uuid} style={{opacity: 1, transform: [{scale: this.getAnimatedValue(deck.uuid)}]}}>
            <DeckSummary deck={deck} onPress={() => this.openDeckView(deck)}/>
          </Animated.View>
        ))}
      </ScrollView>
      <ActionBar actions={this.buildActions()}/>
    </View>
  )

}

const mapStateToProps = (state: CombinedState) => {
  const decks: Deck[] = state.deck.sortedAlphabetically.map(uuid => state.deck.byId[uuid]);
  const props: ReduxProps = {decks, loadedDecks: decks.length > 0};
  console.info("mapStateToProps", props);
  return props;
};

export const DeckListViewContainer = connect(mapStateToProps, CombinedActions)(DeckListView);
