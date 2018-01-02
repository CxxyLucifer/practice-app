/**
 * @flow
 * loading组件
 */
"use strict";
import React, {Component} from "react";
import {View, ActivityIndicator, StyleSheet, Platform} from "react-native";

/**
 * Usage
 * var {Loading} = require('qmkit');
 *
 * <Loading/>
 */
export default class QMLoading extends Component<any, any> {
  static defaultProps = {
    //是否悬浮loading
    overflow: false
  };

  render() {
    const {overflow} = this.props;

    return (
      <View style={[styles.loading, overflow && styles.overflow,  this.props.style]}>
        {
          Platform.OS === 'ios' ?
            <ActivityIndicator size='small'/>
            :
            <ActivityIndicator size='small' color='#3d85cc' style={styles.progress}/>
        }
      </View>
    );
  }
}


/**
 * style
 */
const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  progress: {
    width: 30,
    height: 30
  },
  overflow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)'
  }
});
