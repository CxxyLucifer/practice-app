'use strict';

/**
 * PullRefreshListView组件
 * @flow
 * 下拉刷新，无限分页
 */
import React from 'react';
import {
  View,
  Image,
  ListView,
  PixelRatio,
  AsyncStorage,
  StyleSheet,
  Dimensions,
  LayoutAnimation,
  TouchableOpacity,
  InteractionManager,
  ActivityIndicator,
  Platform
} from 'react-native';
import { msg } from 'plume2';
import { fromJS, is, Map } from 'immutable';

import QMFetch from '../fetch';
import QMLoading from '../loading';
import PullToRefresh from '../pull-to-refresh';
import QMNoData from '../no-data';
import BackToTop from './back-to-top';
import makeCancelable from '../cancelable';
import Kit from '../kit';
import Text from '../text';
import Theme from '../style/theme';


const MyListView: any = ListView;

//每页显示的数量
const PAGE_SIZE = 10;
//just do nothing
const noop = () => { };
//当前屏幕的宽度
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
//计算当前的屏幕高度(px)
const HEIGHT_IN_PX = SCREEN_HEIGHT * PixelRatio.get();

type State = {
  isLoadTail: boolean;
  isInitLoading: boolean;
  isShowLoadTail: boolean;
  dataSource: Array<Object>
};

type Props = {
  url: string;
  postBody: Object;
  postMethod: boolean;
  cacheKey?: string;
  pageSize: number;
  duration: number;
  style?: Object;
  backToTop: boolean;
  renderEmpty?: Function;
  renderHeader?: Function;
  renderFooter?: Function;
  onDataReceive: Function;
  onRefresh: Function;
  onScroll?: Function;
  onRefreshEnd: Function;
  onScrollEnd: Function;
  isWaitAnimation: boolean;
  convertData?: Function;
  pageNumStr?: string;
  renderFlowBtn: any;
  dataSource: Array<Object>;
};

export default class QMPullRefreshListView extends React.Component<any, any> {
  //==========默认属性配置===========
  static defaultProps: Props = {
    //==数据源为http的参数配置==
    url: '',
    //post方法传递的参数
    postBody: {},
    //是否开启post方法
    postMethod: false,
    //默认当前的pageSize
    pageSize: PAGE_SIZE,

    //动画消失时间
    duration: 400,
    //覆盖默认的ListView的样式
    style: null,
    //是否显示返回顶部
    backToTop: false,

    //====自定义头部和尾部的配置====
    renderEmpty: null,
    renderHeader: null,
    renderFooter: null,
    // 自定义漂浮按钮;
    renderFlowBtn: null,

    //==外界的数据源==
    dataSource: null,
    //数据回来的callback，
    onDataReceive: noop,
    //通知外面正在进行刷新状态
    onRefresh: noop,
    //出发滚动通知
    onScroll: null,
    onRefreshEnd: noop,
    onScrollEnd: noop,
    // 是否等待页面动画完成后再执行当前组件的行为
    isWaitAnimation: true,
    // 转换数据结构为 {res: {dataList:[]}}
    convertData: null,
    // 页数str转换
    pageNumStr: 'pageNum'
  };


  //==========内部属性========
  _listView: any;
  _page: number;
  _isLoading: boolean;
  _swipeRefreshStatus: string;
  _ds: any;
  state: State;
  _scrollOffset: 0; // 返回顶部后需要隐藏返回顶底按钮;
  cancelable: any;


  constructor(props: Object) {
    super(props);

    //当前页
    this._page = 0;
    //当前是不是处于请求数据刷新状态
    this._isLoading = false;
    //swipe-refresh的状态
    this._swipeRefreshStatus = '';

    //ListView
    this._ds = new ListView.DataSource({
      rowHasChanged(r1, r2) {
        return r1 != r2;
      }
    });

    //当前的状态
    this.state = {
      /*是不是loading到结尾*/
      isLoadTail: false,
      /*是否显示底部加载中信息 */
      isShowLoadTail: false,
      /*标记是不是初始化loading*/
      isInitLoading: true,
      /*数据源*/
      dataSource: [],
    };
  }


  componentWillReceiveProps(nextProps: any) {
    const newHttpParam = fromJS({
      url: nextProps.url,
      postMethod: nextProps.postMethod,
      postBody: nextProps.postBody,
      pageSize: nextProps.pageSize
    });

    const oldHttpParam = fromJS({
      url: this.props.url,
      postMethod: this.props.postMethod,
      postBody: this.props.postBody,
      pageSize: this.props.pageSize
    });

    this._waitAnimation(nextProps.isWaitAnimation, () => {
      //请求的参数发生变化
      if (!is(newHttpParam, oldHttpParam)) {
        // 避免重复请求，当需要请求时，先取消请求
        this.cancelable && this.cancelable.cancel();
        //显示loading状态
        this.setState({ isInitLoading: true });
        //初始化数据
        this._init(nextProps);
      }

      //协同数据源的当前的页数
      const { dataSource, pageSize } = nextProps;
      if (dataSource) {
        if (dataSource.length === 0) {
          this._page = 0;
        } else {
          this._page = Math.floor((dataSource.length + pageSize - 1) / pageSize) - 1;
        }
      }
    })
  }

  componentDidMount() {
    //如果当前的数据源都没有值,就去初始化一次
    if (this._isEmptyDataSource()) {
      this._waitAnimation(this.props.isWaitAnimation, () => {
        this._init()
      })
    } else {
      this.setState({ isInitLoading: false })
    }
  }

  componentWillUpdate() {
    // LayoutAnimation.easeInEaseOut();
  }

  componentWillUnmount() {
    // 取消请求      
    this.cancelable && this.cancelable.cancel();
  }


  //===================================render===============================
  render() {
    const { isInitLoading } = this.state;
    const { renderScrollList = true } = this.props;
    const {
      backToTop,
      renderHeader,
      contentContainerStyle
    } = this.props;

    //默认的ListView的容器内样式
    const defaultContentContainerStyle = (
      this._isEmptyDataSource() && styles.container
    );

    //如果有自定义的header，则构造自定义头的对象
    const header = {};
    if (renderHeader) {
      header['renderHeader'] = this._renderHeader;
    }

    //如果是初始loading
    //如果有自定义header，就不显示全局的loading
    if (isInitLoading && !renderHeader) {
      return (<QMLoading />);
    }

    let extProps: any = {};
    if (renderScrollList) {
      extProps.renderScrollComponent = (props) => (
        <PullToRefresh
          duration={this.props.duration}
          scrollRenderAheadDistance={HEIGHT_IN_PX / 2}
          {...props}
        />
      )
    }

    return (
      <View style={[styles.container, this.props.style]}>
        { /* contentContainerStyle={[defaultContentContainerStyle]} 这个属性不支持了; */}
        <MyListView
          ref={(listView) => this._listView = listView}
          pageSize={1}
          onScroll={(e) => this._handleScroll(e)}
          enableEmptySections={true}
          onEndReachedThreshold={100}
          scrollEventThrottle={32}
          keyboardShouldPersistTaps="never"
          showsVerticalScrollIndicator={true}
          automaticallyAdjustContentInsets={false}
          removeClippedSubviews={true}
          onRefresh={(onRefreshEnd) => {
            this._isLoading = true;
            this.props.onRefresh();
            this._handleMomentumScrollEnd(onRefreshEnd);
          }}
          onModeChange={(mode) => this._swipeRefreshStatus = mode}
          onRefreshEnd={(result) => {
            this._isLoading = false;
            this.props.onRefreshEnd();
          }}
          onScrollEnd={this.props.onScrollEnd && this.props.onScrollEnd}
          onEndReached={this._handlePagination}
          dataSource={this._ds.cloneWithRows(this._getDataSource())}
          renderHeader={this._renderHeader}
          renderRow={this.props.renderRow}
          renderFooter={this._renderFooter}
          {...extProps}
        />
        {/*返回顶部*/}
        {this._renderFlowBtn()}
      </View>
    );
  }


  //=================================渲染头部================================================
  _renderHeader = () => {
    //判断是不是为空
    const isShowNoData = this.state.isLoadTail && this._isEmptyDataSource();
    const { isInitLoading } = this.state;
    const { defHeight = 0 } = this.props;
    let listHeight = Dimensions.get('window').height - defHeight;
    return (
      <View style={this._isEmptyDataSource() && styles.container}>
        {this.props.renderHeader && this.props.renderHeader()}
        {/*显示空*/}
        {isShowNoData ? <QMNoData style={Platform.OS === 'android' ? { height: listHeight - 148 } : { height: listHeight - 158 }} /> : null}
        {isInitLoading ? <QMLoading /> : null}
      </View>
    );
  };

  //===================================渲染漂浮按钮===================================
  _renderFlowBtn = () => {
    const { renderFlowBtn, backToTop } = this.props;
    if (backToTop || renderFlowBtn) {
      return (
        <View style={styles.shortcut}>
          {/*自定义头部*/}
          {renderFlowBtn && renderFlowBtn()}
          <BackToTop
            show={backToTop && this._scrollOffset > (SCREEN_HEIGHT / 2)}
            onPress={this._backToTop} />
        </View>
      );
    } else {
      return null;
    }
  };


  //===================================渲染ListView的footer===================================
  //如果没有数据或者以及加载到最后,就不显示footer
  _renderFooter = () => {
    if (!this.state.isShowLoadTail || this._isEmptyDataSource()) {
      return null;
    }
    return (
      <View style={styles.footer}>
        <ActivityIndicator size='small' />
        <Text style={[styles.text]}>
          正在加载...
        </Text>
      </View>
    );
  };


  //====================================获取当前的数据源=========================================
  _getDataSource = () => this.props.dataSource || this.state.dataSource;


  //====================================判断当前的数据源是不是为空================================
  _isEmptyDataSource = () => this._getDataSource().length == 0;


  //===================================获取url=================================================
  _getURL = (): string => {
    const { url, usePostMethod } = this.props;

    if (!usePostMethod) {
      let paramChar = url.indexOf('?') != -1 ? '&' : '?';
      return `${url}${paramChar}pageNum=${this._page}&pageNo=${this._page}&pageSize=${this.props.pageSize}`;
    } else {
      return url;
    }
  };


  //==================================处理分页=================================================
  _handlePagination: Function = async (e) => {
    //1. 屏蔽不是ScrollView滚动到底部产生的事件
    //2. 如果当前的状态不是正在获取更新，不去分页获取
    //3. 是不是在pull,push,refresh
    //4. 是不是已经加载到最后一页

    console.log("pagination")
    if (!e
      || this._isLoading
      || this._swipeRefreshStatus
      || this.state.isLoadTail) {
      // 不需要再显示底部loading;
      this.setState({ isShowLoadTail: false });
      return false;
    }

    // 如果第一页的数量小于pagesize不再分页
    const dataSource = this._getDataSource();
    if (this._page == 0 && dataSource.length < this.props.pageSize) {
      // 不需要再显示底部loading;
      this.setState({ isShowLoadTail: false });
      return false;
    }
    this.setState({ isShowLoadTail: true });

    this._isLoading = true;
    this._page++;
    const { res, err } = await this._http();
    this._isLoading = false;

    if (!err) {
      //最后一页
      if (res.dataList.length === 0) {
        this._page--;
      }
      this.setState({
        dataSource: this.state.dataSource.concat(res.dataList),
        isLoadTail: res.currentPage >= (res.totalPages - 1)
      },
        async () => {
          let totalRes = { dataList: this.state.dataSource };
          const dataList = await this.props.onDataReceive(res, totalRes);
          if (dataList) {
            this.setState({
              dataSource: dataList,
              isShowLoadTail: false
            });
          } else {
            this.setState({
              isShowLoadTail: false
            });
          }
        }
      );
    }
  };

  //=======================将Fetch操作抽取出来,支持POST方法============================
  _http(): Promise<any> {
    let { url, postMethod, postBody, pageNumStr, pageSize, convertData } = this.props;

    if (Map.isMap(postBody)) {
      postBody = postBody.toJS();
    }

    const convert = (data) => {
      if (typeof convertData === "function") {
        return convertData(data);
      }
      return data;
    };

    //如果是post方法获取数据
    if (postMethod) {
      postBody[pageNumStr] = 100;
      postBody['pageNo'] = this._page; // 接口分页参数不一样;

      this.cancelable = makeCancelable(QMFetch(url, {
        method: 'POST',
        body: JSON.stringify(postBody)
      }).then(convert));

      return this.cancelable.promise;

    } else {
      //GET方法
      this.cancelable = makeCancelable(QMFetch(this._getURL()).then(convert));
      return this.cancelable.promise;
    }
  }


  //=============================滚动结束===========================================
  _handleMomentumScrollEnd: Function = async (onRefreshEnd) => {
    const { onDataReceive, pageSize } = this.props;

    //当前的页
    this._page = 0;
    let dataSource = [];
    let isLoadTail = true;
    console.log("_handleMomentumScrollEnd")
    //获取数据
    const { res, err } = await this._http();
    if (!err) {
      const { dataList } = res;
      dataSource = dataList;
      isLoadTail = res.currentPage >= (res.totalPages - 1)

      this._waitAnimation(this.props.isWaitAnimation, () => {
        this.setState({
          dataSource: dataSource,
          isLoadTail: isLoadTail
        }, () => onDataReceive(res));
      })

      //如果设置了缓存,就去缓存数据
      let { cacheKey } = this.props;
      let myWindow: any = window;

      if (cacheKey) {
        let username = myWindow.username || await AsyncStorage.getItem('d2p@username');
        let cacheStr = username + myWindow.showType + cacheKey;
        AsyncStorage.setItem(cacheStr, JSON.stringify(res));
      }
    }

    onRefreshEnd();
  };


  //=============================初始化获取数据========================================
  async _init(nextProps?: any) {
    if (nextProps) {
      this.props = nextProps;
    }
    const { onDataReceive, pageSize } = this.props;
    let { cacheKey } = this.props;

    //重新初始化当前的page number
    this._page = 0;
    let res = null;

    let myWindow: any = window;
    // cacheStr 添加用户编号绑定
    let username = myWindow.username || await AsyncStorage.getItem('d2p@username');
    let cacheStr = username + myWindow.showType + cacheKey;

    //如果cacheKey不为空,先从cache中获取，先渲染缓存的
    if (cacheKey) {
      const cacheResult = await AsyncStorage.getItem(cacheStr);
      if (cacheResult) {
        res = JSON.parse(cacheResult);

        // 处理数据
        this.setState({
          isInitLoading: false,
          dataSource: res.dataList,
          isLoadTail: res.currentPage >= (res.totalPages - 1)
        }, () => {
          onDataReceive(res);
        });
      }
    }

    // 再请求，覆盖缓存的
    const result = await this._http();
    console.log("http result", res)
    res = result.res;
    //error处理
    if (result.err) {
      this.setState({
        isInitLoading: false,
        isLoadTail: true,
        dataSource: [],
        isShowLoadTail: false
      });
      return;
    } else if (cacheKey) {
      AsyncStorage.setItem(cacheStr, JSON.stringify(res));
    }

    //处理数据
    this.setState({
      isInitLoading: false,
      dataSource: res.dataList,
      isLoadTail: res.currentPage >= (res.totalPages - 1),// 不需要再显示底部loading;
      isShowLoadTail: false
    }, () => {
      onDataReceive(res);
    });
  }


  //===============================返回顶部============================================
  _backToTop: Function = () => {
    this.getScrollResponder().scrollResponderScrollTo({ x: 0, y: 0, animated: true });
  };


  _handleScroll = (e) => {
    const { contentOffset, contentInset } = e.nativeEvent;
    this._scrollOffset = contentOffset.y + contentInset.top;
    const { onScroll } = this.props;
    onScroll && onScroll(this._scrollOffset);
    const { backToTop } = this.props;
    if (backToTop && this._scrollOffset < 10) {
      msg.emit('list-view:backToTop', true);  // 为了不在ListView上setState, 发事件到子组件去;
    } else if (backToTop && this._scrollOffset > (SCREEN_HEIGHT / 2)) {
      msg.emit('list-view:backToTop', false);  // 为了不在ListView上setState, 发事件到子组件去;
    }
  };


  _waitAnimation: Function = (isWaitAnimation: boolean, callBack: any): void => {
    isWaitAnimation ? InteractionManager.runAfterInteractions(callBack) : callBack()
  };

  //===============================获取scrollResponder=================================
  getScrollResponder = (): any => {
    return this._listView.getScrollResponder();
  };


  //===============================刷新指定列表========================================
  refreshListView = () => {
    this._waitAnimation(this.props.isWaitAnimation, () => {
      this._init();
    })
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.fillBase
  },
  footer: {
    height: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: Theme.border.widthSm,
    borderColor: Theme.border.split
  },
  text: {
    fontSize: 14,
    color: '#999'
  },
  foot: {
    alignSelf: 'stretch',
    justifyContent: 'flex-end',
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10
  },
  button: {
    backgroundColor: '#e63a59',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderRadius: 5
  },
  cont: {
    fontSize: 16,
    color: '#FFF'
  },
  arrow: {
    width: 20,
    height: 20
  },
  emptyIcon: {
    width: 110,
    height: 110,
    marginBottom: 10
  },
  shortcut: {
    position: 'absolute',
    right: 18,
    bottom: 40,
    width: 40
  },
});
