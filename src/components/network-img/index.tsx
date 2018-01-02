/**
 * 网络图片组件组件
 * Image.prefetch 缓存图片到disk;
 * Android会转格式为webp
 * ios不支持webp使用jpg格式;
 *    source, width, height必填;
 *
 *    <QMNetworkImage source={} width={} height={}/>
 */
import React, { Component } from "react";
import { Image, Platform, View } from "react-native";
import Kit from "../kit";
import { fromJS, is } from "immutable";

/**
 * @see http://stackoverflow.com/questions/5573096/detecting-webp-support
 */
export default class NetworkImage extends Component<any, any> {
  static defaultProps = {
    source: undefined,
    alt: '图片加载中',
    errorSrc: '',  // 读取不到的话, 显示的地址
    width: 100,           // 剪切高度 必填啊
    height: 100,          // 剪切宽度 必填啊
    onError: () => {
    },
    onLoad: () => {
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      source: props.source,
    };
  }

  /**
   * When the image changes on Android, verify the image.
   *
   * @param  {Object} nextProps The next incoming properties.
   * @return {void}
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.source && nextProps.source &&
      (!this.props.source || this.props.source !== nextProps.source
        || this.props.width != nextProps.width || this.props.height != nextProps.height) &&
      Platform.OS === 'android' && nextProps.onError
    ) {
      this.verifyImage();
    }

    // android 必须使用在这里设置source, 其它地主没有办法把props塞给state
    this.setState({ source: nextProps.source });
  }

  /**
   * 主要判断source, width, height, style
   * @param nextProps
   * @returns {boolean}
   */
  shouldComponentUpdate(nextProps, nextState) {
    return !(is(fromJS(this.props), fromJS(nextProps)) && is(fromJS(this.state), fromJS(nextState)));
  }

  /**
   * When the component will mount, verify the image on Android.
   * @return {void}
   */
  componentWillMount() {
    if (Platform.OS === 'android' && this.props.onError && this.props.source) {
      this.verifyImage();
    }
  }

  /**
   *
   * @returns {XML}
   */
  render() {
    let props = this.props,
      state = this.state;
    return (
      <Image source={{ uri: this._wrapUrl(state.source) }}
        onError={this._onError}
        onLoad={props.onLoad}
        style={props.style}>
        {props.children ? props.children : null}
      </Image>
    )
  }


  /**
   * 加载图片出错回调, 可以设置errorSrc
   * @private
   */
  _onError = () => {
    __DEV__ && console.log('_onError', this.props, this.state);
    if (this.props.onError) {
      this.props.onError();
    }

    // 避免出现错误图片也加载不到, 导致重复加载
    if (this.props.errorSrc == this.state.source) {
      return;
    }

    if (this.props.errorSrc) {
      this.setState({ source: this.props.errorSrc })
    } else {
      this.setState({ source: 'http://pic.qianmi.com/qmui/app/img/default_square.png' });
    }
  };

  /**
   * 包装地址
   * @param source
   * @private
   */
  _wrapUrl = (source) => {
    let props = this.props;
    return Kit.getWebp(source, props.width, props.height);
  };

  /**
   * `Image.prefetch` is used to load the image and `catch` the failure.
   * Android's `Image` `onError` callback does not get invoked if the remote image fails to load with a `404`.
   * Prefetch, however, will reject the promise if it fails to load, allowing us to detect failures to
   * provide better fallback support.
   *
   * Android only.
   * https://github.com/facebook/react-native/issues/7440
   *
   * @return {void}
   */
  verifyImage = () => {
    let { source, width, height } = this.props;
    Image.prefetch(Kit.getWebp(source, width, height)).catch(e => this.props.onError(e));
  }
}
