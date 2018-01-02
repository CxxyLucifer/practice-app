/**
 * Created by hufeng on 3/22/16.
 * 悬浮loading的效果
 */
'use strict';

import React, { Component } from 'react';
import { View, Dimensions, StyleSheet, ViewStyle } from 'react-native';
import Loading from '../../loading';
import { START, END } from './loading-status';
const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default class OverflowLoadingContainer extends Component<any, any> {
  static defaultProps = {
    loading: END,
    style: null
  };

  render() {
    const { loading, style, children } = this.props;

    //overflow-loading距离顶部的距离
    let top = loading === START ? 0 : SCREEN_HEIGHT;

    return (
      <View style={[styles.container, style]}>
        {children}
        <Loading overflow={true} style={{ top }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  } as ViewStyle
});
