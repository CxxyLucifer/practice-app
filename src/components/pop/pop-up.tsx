'use strict';

import React, { Component } from 'react';
import {
  View,
  Platform,
  Animated,
  StyleSheet,
  TouchableOpacity,
  BackAndroid
} from 'react-native';
import { msg } from 'plume2';
import FactoryKit from '../kit';
import { Text } from 'components';

export default class PopUp extends Component<any, any> {
  static defaultProps = {
    component: null,
    closeStyle: null,
    height: 0
  };

  constructor(props: Object) {
    super(props);
    this.state = {
      // 内容占比
      contentFlexValue: new Animated.Value(0.001),
      // 背景层占比
      backFlexValue: new Animated.Value(1),
      opacityValue: new Animated.Value(0)
    };
  }

  componentDidMount() {
    // 0.75为默认值,即弹出屏幕的3/4高度
    let flexValue = this.props.height
      ? this.props.height / FactoryKit.Height
      : 0.75;
    const param = { toValue: 0.5, tension: -100 };
    Animated.parallel([
      Animated.spring(this.state.contentFlexValue, {
        toValue: flexValue,
        tension: 15
      }),

      Animated.spring(this.state.backFlexValue, {
        toValue: 1 - flexValue,
        tension: 15
      }),

      Animated.timing(this.state.opacityValue, param)
    ]).start();

    msg.on('pop-up-close', this._handleOnClose);
    if (FactoryKit.isAndroid()) {
      BackAndroid.addEventListener('hardwareBackPress', this._handleOnClose);
    }
  }

  componentWillUnmount() {
    msg.off('pop-up-close', this._handleOnClose);
    if (FactoryKit.isAndroid()) {
      BackAndroid.removeEventListener('hardwareBackPress', this._handleOnClose);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.header,
            { opacity: this.state.opacityValue, flex: this.state.backFlexValue }
          ]}
        >
          <TouchableOpacity
            style={styles.headerCloseBtn}
            onPress={this._handleOnClose}
          />
        </Animated.View>

        <Animated.View
          style={[styles.content, { flex: this.state.contentFlexValue }]}
        >
          <View
            style={[
              styles.toolbar,
              this.props.onCancel || this.props.onOk
                ? { height: 20 }
                : { height: 0 }
            ]}
          >
            {this.props.onCancel
              ? <View style={styles.btnLeft}>
                <TouchableOpacity
                  accessible={true}
                  accessibilityLabel={`qm-popup:close-btn`}
                  hitSlop={{ top: 0, left: 10, bottom: 15, right: 0 }}
                  style={[styles.closeBtn, {}]}
                  onPress={this._handleOnClose}
                >
                  <Text>取消</Text>
                </TouchableOpacity>
              </View>
              : null}

            {this.props.onOk
              ? <View style={styles.btnRight}>
                <TouchableOpacity
                  accessible={true}
                  accessibilityLabel={`qm-popup:close-btn`}
                  hitSlop={{ top: 0, left: 10, bottom: 15, right: 0 }}
                  style={[styles.closeBtn]}
                  onPress={this._handleOnClose}
                >
                  <Text>确定</Text>
                </TouchableOpacity>
              </View>
              : null}
          </View>

          {this.props.component}
        </Animated.View>
      </View>
    );
  }

  _onOkPress = () => {
    __DEV__ && console.log('_onOkPress');
    this._handleOnClose();
    this.props.onOk();
  };

  _onCancelPress = () => {
    this._handleOnClose();
    this.props.onCancel();
  };

  _handleOnClose = (hasAnimation?: boolean) => {
    const param = { toValue: 0, tension: -100 };
    if (hasAnimation) {
      Animated.parallel([
        Animated.spring(this.state.contentFlexValue, {
          toValue: 0.001,
          tension: 15
        }),

        Animated.timing(this.state.opacityValue, param)
      ]).start(res => {
        if (res.finished) {
          this.props.onClose();
        }
      });
    } else {
      this.props.onClose();
    }
  };
}

const styles = StyleSheet.create({
  container: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    backgroundColor: 'transparent'
  },
  header: {
    backgroundColor: '#000'
  },
  content: {
    height: 0,
    backgroundColor: '#fff'
  },
  toolbar: {
    width: FactoryKit.Width,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  btnLeft: {
    justifyContent: 'flex-start'
  },
  btnRight: {
    justifyContent: 'flex-end'
  },
  closeBtn: {
    height: 20,
    paddingTop: 15,
    paddingLeft: 10,
    paddingRight: 10
  },
  closeBtnAndroid: {
    position: 'absolute',
    top: 0,
    paddingTop: 5,
    right: 0,
    paddingLeft: 10,
    paddingRight: 10
  },
  img: {
    width: 20,
    height: 20
  },
  headerCloseBtn: {
    flex: 1
  }
});
