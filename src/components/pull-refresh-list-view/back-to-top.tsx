/**
 * 返回顶部
 * @flow
 */
import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  PixelRatio,
  Image
} from 'react-native';
import { msg } from 'plume2';
import Icon from '../icon';
import Theme from '../style/theme';

export default class BackToTop extends React.Component<any, any> {

  componentDidMount() {
    // 为不影响ListView滚动在子组件监听滚动事件, 处理显示FlowBtn显示不显示;
    msg.on('list-view:backToTop', this._showBackToTop);
  }

  componentWillUnmount() {
    msg.off('list-view:backToTop', this._showBackToTop);
  }

  constructor(props) {
    super(props);
    this.state = {
      isHide: !props.show
    };
  }

  render() {
    const { onPress } = this.props;
    if (this.state.isHide) {
      return null;
    } else {
      return (
        <TouchableOpacity
          accessible={true}
          accessibilityLabel={"goods-list:back-to-top"}
          activeOpacity={0.8}
          hitSlop={{ top: 10, bottom: 10, left: 0, right: 18 }}
          onPress={onPress}
          style={styles.operate}>
          <Icon name="shangzhang" size="md" color="#999" />
        </TouchableOpacity>
      );
    }
  }

  // 滚动后收到滚动高度, 判断是否显示返回顶部按钮;
  _showBackToTop = (val) => {
    this.setState({
      isHide: val
    });
  }
}

const styles = StyleSheet.create({
  operate: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: Theme.border.widthSm,
    borderColor: Theme.border.split,
    backgroundColor: 'rgba(255,255,255,0.9)'
  },
  img: {
    width: 20,
    height: 20
  }
});
