/**
 * @flow
 */
'use strict';

import React, { Component } from 'react';
import {
  View,
  addons,
  Image,
  Dimensions,
  ActivityIndicator,
  Animated,
  PixelRatio,
  StyleSheet
} from 'react-native';
import Icon from '../icon';
import Text from '../text';
import Theme from '../style/theme';

const LOADING_HEIGHT = 40;
const SCREEN_WIDTH = Dimensions.get('window').width;

class Indicator extends Component<any, any> {
  static defaultProps = {
    mode: 'refresh',
    height: 0
  };

  constructor(props: Object) {
    super(props);
    this.state = {
      height: new Animated.Value(0)
    };
  }

  componentWillReceiveProps(nextProps: any) {
    if (nextProps.height != this.props.height) {
      Animated.timing(this.state.height, {
        toValue: nextProps.height,
        duration: nextProps.height == 0 ? this.props.duration : 20
      }).start();
    }
  }

  render() {
    // 当前的刷新状态
    // pull 正在下拉，
    // push 正在上提
    const mode = this.props.mode;

    return (
      <Animated.View
        style={{
          overflow: 'hidden',
          alignItems: 'center',
          justifyContent: 'center',
          height: this.state.height
        }}
      >
        {!mode || mode == 'refresh'
          ? this._renderRefresh()
          : this._renderPullOrPushTip()}
      </Animated.View>
    );
  }

  _renderRefresh() {
    return (
      <View style={styles.refresh}>
        <ActivityIndicator size="small" />
        <Text style={styles.text}>正在加载...</Text>
      </View>
    );
  }

  _renderPullOrPushTip() {
    const mode = this.props.mode;

    return (
      <View style={styles.refresh}>
        {mode === 'push'
          ? <Icon name="songshougengxin" size="md" color="#999" />
          : <Icon name="xiala" size="md" color="#999" />}
        <Text style={styles.text}>{mode === 'push' ? '松手更新' : '下拉刷新'}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  refresh: {
    flex: 1,
    overflow: 'hidden',
    width: SCREEN_WIDTH,
    borderBottomWidth: Theme.border.widthSm,
    borderColor: Theme.border.split,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: Theme.font.sizeBase,
    color: '#999'
  }
});

export { Indicator, LOADING_HEIGHT };
