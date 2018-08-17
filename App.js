/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import App from './build/apps';

export default class practiceApp extends Component {
  render() {
    return (
      <App initialRoute='Home' />
    );
  }
}
