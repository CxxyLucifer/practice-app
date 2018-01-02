/**
 * Created by syf on 2017/5/8
 * 组件和样式参考ant mobile的代码
 */

import React from 'react';
import { View, Text, TouchableWithoutFeedback, Platform } from 'react-native';
import TagStyle from './style/index';
import TagProps from './propstype';

export default class QMTag extends React.Component<TagProps, any> {
  static defaultProps = {
    disabled: false,
    selected: false,
    closable: false,
    onClose() {},
    afterClose() {},
    onChange() {},
    styles: TagStyle,
  };

  closeDom: any;

  constructor(props) {
    super(props);

    this.state = {
      selected: props.selected,
      closed: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.selected !== nextProps.selected) {
      this.setState({
        selected: nextProps.selected,
      });
    }
  }

  onClick = () => {
    const { disabled, onChange } = this.props;
    if (disabled) {
      return;
    }
    const isSelect: boolean = this.state.selected;
    this.setState({
      selected: !isSelect,
    }, () => {
      if (onChange) {
        onChange(!isSelect);
      }
    });
  }

  onTagClose = () => {
    if (this.props.onClose) {
      this.props.onClose();
    }
    this.setState({
      closed: true,
    }, this.props.afterClose);
  }

  onPressIn = () => {
    const styles = this.props.styles;
    this.closeDom.setNativeProps({
      style: [styles.close, Platform.OS === 'ios' ? styles.closeIOS : styles.closeAndroid, {
        backgroundColor: '#888',
      }],
    });
  }

  onPressOut = () => {
    const styles = this.props.styles;
    this.closeDom.setNativeProps({
      style: [styles.close, Platform.OS === 'ios' ? styles.closeIOS : styles.closeAndroid],
    });
  }

  render() {
    const { type, size, children, disabled, closable, styles, style, tagWrapStyle, tagTextStyle } = this.props;
    const selected = this.state.selected;

    let wrapStyle;
    let textStyle;
    if (!selected && !disabled) {
      wrapStyle = [
        styles[`${size}Wrap`],
        styles.normalWrap,
        styles[`${type}Highlight`],
        tagWrapStyle
      ]
      textStyle = [
        styles[`${size}Text`],
        styles.normalText,
        styles[`${type}HighlightText`],
        tagTextStyle
      ]
    }
    if (selected && !disabled) {
      wrapStyle = [
        styles[`${size}Wrap`],
        styles.activeWrap,
        styles[`${type}ActiveHighlight`],
        tagWrapStyle
      ]
      textStyle = [
        styles[`${size}Text`],
        styles.activeText,
        styles[`${type}ActiveHighlightText`],
        tagTextStyle
      ]
    }
    if (disabled) {
      wrapStyle = styles.disabledWrap;
      textStyle = styles.disabledText;
    }

    // const sizeWrapStyle = styles[`wrap${size}`];
    // const sizeTextStyle = styles[`text${size}`];

    const closableDom = closable && !disabled ? (
      <TouchableWithoutFeedback
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}
        onPress={this.onTagClose}
      >
        <View
          ref={component => this.closeDom = component}
          style={[styles.close, Platform.OS === 'ios' ? styles.closeIOS : styles.closeAndroid]}
        >
          <Text allowFontScaling={false} style={[styles.closeText, Platform.OS === 'android' ? styles.closeTransform : {}]}>×</Text>
        </View>
      </TouchableWithoutFeedback>
    ) : null;

    return !this.state.closed ? (
      <View style={[ styles.tag, style ]}>
        <TouchableWithoutFeedback onPress={this.onClick}>
          <View style={[styles.wrap, wrapStyle, tagWrapStyle,]}>
            <Text allowFontScaling={false} style={[styles.text, textStyle, tagTextStyle]} numberOfLines={1}>{children} </Text>
          </View>
        </TouchableWithoutFeedback>
        {closableDom}
      </View>
    ) : null;
  }
}