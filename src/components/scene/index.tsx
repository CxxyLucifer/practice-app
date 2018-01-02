('use strict');
// @flow

/**
 * Navigator导航中心
 */
import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { msg } from 'plume2';
import Header from '../header';
import Body from './body';
import Kit from '../kit';
import PullToRefresh from '../pull-to-refresh';
import noop from '../noop';

export default class Scene extends React.Component<any, any> {
  static Body = null;

  static defaultProps = {
    style: null,
    bodyStyle: null,
    backgroundImage: null,

    onMount: null,

    //普通loading
    loading: null,
    //悬浮loading
    overflowLoading: null,

    //开启下拉刷新,默认不开启
    pullToRefresh: false,
    //下拉刷新的回调
    onPullToRefresh: noop,
    //ios下拉刷新,模式切换
    onModeChange: noop,

    //头部
    header: '',
    hasBack: true,
    renderHeader: '',
    onBackHandler: null,
    isChangingView: false,
    backOut: false
  };

  render() {
    if (this.props.pullToRefresh) {
      return (
        <PullToRefresh
          onModeChange={this.props.onModeChange}
          onRefresh={this.props.onPullToRefresh}
        >
          <View style={[this.props.style, styles.container]}>
            {this._renderWrapper()}
          </View>
        </PullToRefresh>
      );
    }

    //返回普通
    return (
      <View style={[this.props.style, styles.container]}>
        {this._renderWrapper()}
      </View>
    );
  }

  _renderWrapper() {
    if (this.props.backgroundImage) {
      return (
        <View style={{ flex: 1 }}>
          <Image
            source={this.props.backgroundImage}
            style={styles.wrapperImage}
          >
            {this._renderHeader()}
            {this._renderBody()}
          </Image>

          {/* 加一个遮罩,当view跳转时禁止其它操作 */}
          {this.props.isChangingView ? <View style={styles.mask} /> : null}
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1 }}>
          <View style={styles.wrapper}>
            {this._renderHeader()}
            {this._renderBody()}
          </View>
          {/* 加一个遮罩,当view跳转时禁止其它操作 */}
          {this.props.isChangingView ? <View style={styles.mask} /> : null}
        </View>
      );
    }
  }

  _renderBody() {
    return (
      <Body
        loading={this.props.loading}
        overflowLoading={this.props.overflowLoading}
        style={this.props.bodyStyle}
        onNetworkBack={this.props.onMount}
      >
      {this.props.children}
      </Body>
    );
  }

  _renderHeader() {
    let props = this.props;
    //
    if (props.renderHeader) {
      return props.renderHeader();
    } else if (props.header) {
      let brandName = props.hasBack || props.backOut ? null : props.header,
        title = props.hasBack || props.backOut ? props.header : null;
      return (
        <Header
          brandName={brandName}
          leftTitle={title}
          onLeftMenuPress={this._onLeftMenuPress}
        />
      );
    } else {
      //
      return null;
    }
  }

  _onLeftMenuPress = () => {
    if (this.props.onBackHandler) {
      this.props.onBackHandler();
    } else if (this.props.backOut) {
      msg.emit('app:backOut');
    } else if (this.props.hasBack) {
      msg.emit('route:backToLast');
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  wrapper: {
    flex: 1
  },
  wrapperImage: {
    width: Kit.Width,
    height: Kit.Height
  },
  mask: {
    flex: 1,
    position: 'absolute',
    top: 0,
    backgroundColor: '#FFcccc04',
    width: Kit.Width,
    height: Kit.Height
  }
});

//bind Body
Scene.Body = Body;
