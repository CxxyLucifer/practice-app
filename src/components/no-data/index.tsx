/**
 * @flow
 */
'use strict';

import React, { Component } from 'react';
import {
  View,
  Image,
  StyleSheet
} from 'react-native';

import QMText from '../text';

/**
 * 没有数据时候显示的哭脸公共组件
 */
export default class NoData extends Component<any, any> {
  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <QMText style={styles.txt}>暂无数据</QMText>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  face: {
    width: 131,
    height: 111,
    marginBottom: 15
  },
  txt: {
    fontSize: 14,
    color: '#cfd5dd'
  },
});
