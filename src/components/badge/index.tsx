/**
 * Created by syf on 2017/5/8
 * 组件和样式参考ant mobile的代码
 */

import React from 'react';
import { View, Text } from 'react-native';
import BadgeStyle from './style/index';
import BadgeProps from './propstype';

export default class QMBadge extends React.Component<BadgeProps, any> {
  static defaultProps = {
    size: 'small',
    overflowCount: 99,
    dot: false,
    corner: false,
    styles: BadgeStyle,
  };

  render() {
    let {
      styles, style,
      children, text, size, overflowCount, dot, corner, ...restProps, // todo: hot
    } = this.props;

    text = typeof text === 'number' && text > (overflowCount as number) ? `${overflowCount}+` : text;

    // dot mode don't need text
    if (dot) {
      text = '';
    }

    const badgeCls = corner ? 'textCorner' : 'textDom';
    const contentDom = !dot ? (
      <View {...restProps} style={[styles[badgeCls], styles[`${badgeCls}${size}`]]}>
        <Text style={[styles.text]} allowFontScaling={false}>{text}</Text>
      </View>
    ) : <View {...restProps} style={[styles.dot, styles[`dotSize${size}`]]} />;

    return (
      <View style={[ styles.wrap, style ]}>
        <View style={[styles[`${badgeCls}Wrap`]]}>
          {children}
          {(text || dot) ? contentDom : null}
        </View>
      </View>
    );
  }
}