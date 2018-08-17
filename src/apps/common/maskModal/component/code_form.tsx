/**
 * @flow
 */
'use strict';

import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Keyboard,
  TextInput,
  NativeModules
} from 'react-native';
import { List, Toast, Button } from 'antd-mobile';
import objectAssign from 'object-assign';

export default class CodeForm extends Component<any, any> {

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.listView, { flexDirection: 'row' }]}>
          <TextInput
            placeholder="请输入手机验证码"
            keyboardType={'numeric'}
            style={styles.codeinput}
            underlineColorAndroid="transparent"
          />
            <Text style={styles.getCode}>
              {'重新获取'}
            </Text>
        </View>
        <View style={{ flex: 1, paddingLeft: 20, paddingTop: 15 }}>
          <Text style={{ flex: 1, color: '#CCCCCC', fontSize: 14 }}>
            验证码发送到17361858115手机上
          </Text>
        </View>
        <View style={{ flex: 1, alignItems: 'center', paddingBottom: 20 }}>
          <Button
            className="btn"
            type="primary"
            style={{ width: '90%' }}
          >
            确定
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  listView: {
    flex: 1,
    paddingTop:5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  codeinput: {
    flex: 1,
    height: 30,
    fontSize: 14,
    marginLeft: 17,
    paddingLeft: 5,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#5491de'
  },
  unselectColor: {
    borderColor: '#D9D9D9'
  },
  selectColor: {
    borderColor: '#5491de'
  },
  getCode: {
    width: 80,
    color: '#5491DE',
    fontSize: 14,
    marginLeft: 10
  }
});
