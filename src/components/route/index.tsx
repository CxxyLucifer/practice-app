/**
 * 路由入口
 */
import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';
import { msg } from 'plume2';
import Kit from '../kit';
import Theme from '../style/theme';

type IProps = {
  stackNavigator: StackNavigator;
};

export default class AppRouter extends React.Component<IProps, any> {
  Routes: any;
  navigation: any;

  constructor(props) {
    super(props);
    // 跳转页面
    msg.on('route:goToNext', this.goToNext);
    // 回上一个页面
    msg.on('route:backToLast', this.backToLast);
    // 回上第一个页面
    msg.on('route:backToTop', this.backToTop);
    // 回指定页面，根据路由位置
    msg.on('route:popToRoute', this.popToRoute);
    // 替换页面，根据路由名称
    msg.on('route:replaceRoute', this.replaceRoute);
    // 替换页面，根据路由位置
    msg.on('route:replaceAtIndex', this.replaceAtIndex);
  }

  componentWillUnmount() {
    msg.off('route:goToNext', Kit.noop);
    msg.off('route:backToLast', Kit.noop);
    msg.off('route:backToTop', Kit.noop);
    msg.off('route:popToRoute', Kit.noop);
    msg.off('route:replaceRoute', Kit.noop);
    msg.off('route:replaceAtIndex', Kit.noop);
  }

  render() {
    return (
      <this.props.stackNavigator
        ref={na => na && (this.navigation = na._navigation)}
        onNavigationStateChange={(prevState, currentState) => {
          if (!currentState) {
            return;
          }
          const currentScreen = this.getCurrentRouteName(currentState);
          const prevScreen = this.getCurrentRouteName(prevState);
          if (prevScreen !== currentScreen) {
            this.Routes = currentState.routes;
          }
        }}
      />
    );
  }

  /**
   * 跳转页面
   */
  goToNext = routeName => {
    console.log('route:goToNext', routeName);
    console.log('this.navigation', this.navigation);

    const { sceneName, ...props } = routeName;
    this.navigation.navigate(sceneName, props);
  };

  /**
   * 回上一个页面
   */
  backToLast = () => {
    this.navigation.goBack();
  };

  /**
   * 回上第一个页面
   */
  backToTop = () => {
    this.navigation.goBack(this.Routes[1].key);
  };

  /**
   * 回指定页面，根据路由位置
   */
  popToRoute = index => {
    this.navigation.goBack(this.Routes[index].key);
  };

  /**
   * 替换页面，根据路由名称
   */
  replaceRoute = routeName => {
    const navigateAction = NavigationActions.navigate({
      routeName: routeName,
      params: {},
      action: NavigationActions.navigate({ routeName })
    });

    this.navigation.dispatch(navigateAction);
  };

  /**
   * 替换页面，根据路由位置
   */
  replaceAtIndex = index => {
    const routeName = this.Routes[index].routeName;
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName })]
    });
    this.navigation.dispatch(resetAction);
  };

  /**
   * 获取当前的路由名称
   */
  getCurrentRouteName = navigationState => {
    if (!navigationState) {
      return null;
    }
    const route = navigationState.routes[navigationState.index];
    if (route.routes) {
      return this.getCurrentRouteName(route);
    }
    return route.routeName;
  };
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'green',
    flex: 1
  } as ViewStyle,
  tip: {
    marginTop: 15,
    marginBottom: 30,
    fontSize: 15,
    lineHeight: 25,
    textAlign: 'center',
    color: Theme.colors.textSecondary
  }
});
