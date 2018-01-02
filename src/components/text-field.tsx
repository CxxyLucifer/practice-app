/**
 * @flow
 */
import React, { Component } from "react";
import { View, TouchableWithoutFeedback, StyleSheet } from "react-native";
import Text from './text';
import Theme from './style/theme';


export default class TextField extends Component {
  props: {
    style?: any;
    textStyle?: any;
    label?: any;
    accessible?: any;
    accessibilityLabel?: any;
    value?: string;
    placeholder?: string;
    onPress?: Function;
  };

  render() {
    return (
      <View style={[styles.view, this.props.style]}>
        <Text style={[styles.text, this.props.textStyle]}>
          {this.props.label}
        </Text>
        <TouchableWithoutFeedback onPress={this._handlePress}
          accessible={this.props.accessible}
          accessibilityLabel={this.props.accessibilityLabel}>
          <View style={styles.inputBox}>
            <Text numberOfLines={2} style={styles.input}>{this.props.value}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View >
    );
  }

  _handlePress = () => {
    this.props.onPress();
  };
}

const styles = StyleSheet.create({
  view: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: Theme.border.widthSm,
    borderBottomColor: '#e1e1e1'
  },
  text: {
    fontSize: 14,
    color: '#333'
  },
  inputBox: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: 38,
    width: 250,
    marginRight: 5
  },
  input: {
    textAlign: 'right',
    fontSize: 14,
    color: '#5a5a5a',
  }
});
