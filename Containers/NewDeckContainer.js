// @flow

import type {NavigationProps} from "../Lib/Navigation"
import type {Action} from "../Components/ActionBar"
import {ActionBar} from '../Components/ActionBar';

import React, {Component} from 'react';
import {View} from 'react-native';
import {Layout} from '../Util/CommonStyles';
import {Deck} from '../Lib/Deck';
import {TextBox} from '../Components/TextBox';
import {States} from '../Navigation/NavigationStates';
import {Ionicons} from "@expo/vector-icons";
import {connect} from 'react-redux';
import type {CombinedActionsProps} from "../Redux/CombinedActions";
import {CombinedActions} from "../Redux/CombinedActions";
import type {IndividualDeckViewContainerNavigationProps} from "./IndividualDeckViewContainer";

export type NewDeckNavigationProps = {}

type Props = {
  navigation: NavigationProps<NewDeckNavigationProps>
}

type CombinedProps = Props & CombinedActionsProps

type State = {
  deck: Deck
}

export const NewDeckContainer = connect(() => ({}), CombinedActions)(
  class extends Component<CombinedProps, State> {
    state = {
      deck: new Deck()
    };

    updateTitle = (title: string) => {
      const deck = this.state.deck;
      deck.title = title;
      this.setState({deck})
    };

    create = () => {
      this.props.saveDeck(this.state.deck).then(() => {
        console.info("saved now navigating");
        const params: IndividualDeckViewContainerNavigationProps = {deckId: this.state.deck.uuid};
        this.props.navigation.navigate(States.IndividualDeckView, params)
      });
    };

    buildActions = () => {
      const create: Action = {
        title: "Create",
        onPress: () => this.create()
      };
      return [create];
    };

    render = () => (
      <View style={[Layout.Flex]}>
        <View style={[Layout.Column, Layout.Flex]}>
          <TextBox
            placeholder="Title"
            value={this.state.deck.title}
            onChange={(title) => this.updateTitle(title)}
          />
        </View>
        <ActionBar actions={this.buildActions()}/>
      </View>
    )
  }
)
