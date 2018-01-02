/**
 * @flow
 * 公共的text
 */
import React, { Component } from "react";
import { Text } from "react-native";

export default class TextComponent extends Component<any, any> {
  render() {
    return <Text allowFontScaling={false} {... this.props} />;
  }
}
