/**
 * Created by syf on 2017/5/8
 */

import React from 'react';
import { View } from 'react-native';
import IconFont from 'react-native-vector-icons-qmicon/IconFont';

export interface IconPropType {
  name: string;
  size?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | number;
  color?: string;
  style?: Object | Array<Object>;
}

export default class QMIcon extends React.Component<any, any> {
  static defaultProps = {
    size: 'md',
    color: '#999',
  };

  render() {
    const { size, name, color, style } = this.props;
    const sizeMap = { 'xxs': 14, 'xs': 16, 'sm': 18, 'md': 22, 'lg': 36 };
    const fontSize = typeof size === 'string' ? sizeMap[size] : size;
    const textIconStyle = [
      { flexDirection: 'row' },
      { height: fontSize },
      style,
    ];

    return (
      <IconFont
        style={textIconStyle}
        name={name}
        size={fontSize}
        color={color}
      />
    )
  }
}