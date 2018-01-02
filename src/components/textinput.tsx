/**
 * Created by wv on 16/10/15.
 */
/**
 * @flow
 * 公共的textinput
 */
import React, {Component} from "react";
import {TextInput} from "react-native";

export default class QMTextInput extends Component<any,any> {
  input:any;

  render() {
    return <TextInput ref={(input) => {this.input = input}}
      {...this.props}
      underlineColorAndroid='transparent'/>;
  }

  focus = () => {
    this.input.focus()
  };

  blur = () => {
    this.input.blur()
  };

}
