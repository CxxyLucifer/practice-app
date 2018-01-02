import React, { Component } from "react";
import { View, ViewStyle, TouchableOpacity } from "react-native";
import ListStyles from "./style";

interface IRowProps {
  style?: any,
  styles?: any,
  onPress?: () => void
}

export default class Row extends Component<IRowProps, any> {
  static defaultProps = {
    styles: ListStyles
  };
  render() {
    const { styles, style, onPress } = this.props;
    return (
      <TouchableOpacity
        activeOpacity={onPress ? 0.7 : 1}
        style={styles.Item}
        onPress={onPress && onPress}
      >
        <View style={[styles.row, style]}>
          <View style={styles.rowContent}>
            {this.props.children}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
