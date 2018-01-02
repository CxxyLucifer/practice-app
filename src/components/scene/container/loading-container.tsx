'use strict';

import React, { Component } from 'react';
import { View, Dimensions, StyleSheet, ViewStyle } from 'react-native';
import Loading from '../../loading';
import { START, END } from './loading-status';

export default class LoadingContainer extends Component<any, any> {
  static defaultProps = {
    loading: END,
    style: null
  };

  render() {
    const { loading, children } = this.props;
    return (
      <View style={[styles.container, this.props.style]}>
        {loading === START ? <Loading /> : children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  } as ViewStyle
});
