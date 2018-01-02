/**
 * Created by syf on 2017/5/9
 * 组件和样式参考ant mobile的代码
 */

import React from 'react';
import Swipeout from 'rc-swipeout/lib/Swipeout';
import SwipeActionProps from './propstype';

export default class QMSwipeAction extends React.Component<SwipeActionProps, any> {
  static defaultProps = {
    autoClose: false,
    disabled: false,
    left: [],
    right: [],
    onOpen() {},
    onClose() {},
  };

  render() {
    return (
      <Swipeout {...this.props} />
    );
  }
}