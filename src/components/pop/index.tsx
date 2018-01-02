/**
 * 弹出操作组件
 */

'use strict';

import React, { Component } from 'react';
import { msg } from 'plume2';
import PopUp from './pop-up';
import Kit from '../kit';

/**
 * Pop
 */
export default class FactoryPop extends Component<any, any> {
  constructor(props: Object) {
    super(props);

    this.state = {
      //pop的显示状态
      isPopUpVisible: false
    };
  }

  componentDidMount() {
    // 全局的pop-up
    msg.on('app:pop-up', this._handlePopUp);
  }

  componentWillUnmount() {
    // 全局的pop-up
    msg.off('app:pop-up', Kit.noop);
  }

  render() {
    if (!this.state.isPopUpVisible) {
      return null;
    }
    return (
      <PopUp
        {...this.state.popUpConfig}
        onClose={this._handlePopUpClose}
      />
    );
  }

  /**
   * 弹出组件关闭
   */
  _handlePopUpClose = () => {
    this.setState({
      isPopUpVisible: false
    });
  };

  /**
   * 弹出组件
   */
  _handlePopUp = (popUpConfig: Object) => {
    this.setState({
      isPopUpVisible: true,
      popUpConfig: popUpConfig
    });
  };

  /**
   * 获取pop状态
   */
  _getPopUpStatus = () => {
    return this.state.isPopUpVisible;
  };
}
