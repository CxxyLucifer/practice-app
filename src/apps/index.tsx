import React from 'react';
import {
    View,
    StyleSheet,
    ViewStyle,
    BackHandler,
    NativeModules
} from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';
import { msg } from 'plume2';
import { Kit, Toast, Modal } from 'components';
import { List } from 'immutable';
import Routes from './route';


const backOutPages = List([
    'Home'
]);


export default class Index extends React.Component<any, any> {
    Routes: any;
    navigation: any;
    _sceneName: any;
    // 防止快速点击，重复进路由
    debounce: boolean;

    props: {
        // 初始化页面
        initialRoute: string;
        isShowPopup: boolean;
    };

    constructor(props) {
        super(props);

        // 跳转页面
        msg.on('route:goToNext', this._goToNext);
        // 回上一个页面
        msg.on('route:backToLast', this._backToLast);
        // 回上第一个页面
        msg.on('route:backToTop', this._backToTop);
        // 回指定页面，根据路由位置
        msg.on('route:popToRoute', this._popToRoute);
        // 替换页面，根据路由名称
        msg.on('route:replaceRoute', this._replaceRoute);
        // 替换页面，根据路由位置
        msg.on('route:replaceAtIndex', this._replaceAtIndex);
        // 退出应用
        msg.on('app:backOut', this._handleBackOut);

        //监听Android的实体物理键的返回
        if (Kit.isAndroid()) {
            BackHandler.addEventListener(
                'hardwareBackPress',
                this._handleBackAndroid
            );
        }

        // 初始化_sceneName
        this._sceneName = this.props.initialRoute;


        // 防止快速点击，重复进路由
        this.debounce = true;
    }

    componentWillUnmount() {
        msg.off('route:goToNext', Kit.noop);
        msg.off('route:backToLast', Kit.noop);
        msg.off('route:backToTop', Kit.noop);
        msg.off('route:popToRoute', Kit.noop);
        msg.off('route:replaceRoute', Kit.noop);
        msg.off('route:replaceAtIndex', Kit.noop);
        msg.on('app:backOut', Kit.noop);
        if (Kit.isAndroid()) {
            msg.off('hardwareBackPress', Kit.noop);
        }
    }


    render() {
        //StackNavigator(RouteConfigs, StackNavigatorConfig)
        const AppStackNavigator = StackNavigator(Routes, {
            initialRouteName: this.props.initialRoute || 'Home', //Sets the default screen of the stack. Must match one of the keys in route configs.
            cardStyle: { flex: 1, backgroundColor: '#fff' },  //Use this prop to override or extend the default style for an individual card in stack.
            navigationOptions: {//Default navigation options to use for screens
                header: null,
                gesturesEnabled: false //Whether you can use gestures to dismiss this screen. Defaults to true on iOS, false on Android.
            }
        });

        return (
            <AppStackNavigator
                ref={na => na && (this.navigation = na._navigation)}
                onNavigationStateChange={
                    (prevState, currentState) => {
                        {/* console.log('------prevState:', prevState);
                        console.log('------currentState:', currentState); */}

                        if (!currentState) {
                            return;
                        }
                        const currentScreen = this._getCurrentRouteName(currentState);
                        const prevScreen = this._getCurrentRouteName(prevState);
                        if (prevScreen !== currentScreen) {
                            this.Routes = currentState.routes;
                            this._sceneName = currentScreen;
                        }
                    }}

            />
        );
    }
    /**
     * 跳转页面
     */
    _goToNext = routeName => {
        const { sceneName, ...props } = routeName;
        // 添加点击判断
        if (this.debounce) {
            this.debounce = false;
            this.navigation.navigate(sceneName, props);
            setTimeout(() => {
                this.debounce = true;
            }, 500);
        }
    };

    /**
     * 回上一个页面
     */
    _backToLast = () => {
        this.navigation.goBack();
    };

    /**
     * 回上第一个页面
     */
    _backToTop = () => {
        this.navigation.goBack(this.Routes[1].key);
    };

    /**
     * 回指定页面，根据路由位置
     */
    _popToRoute = index => {
        this.navigation.goBack(this.Routes[index].key);
    };

    /**
       * 替换页面，根据路由名称
       */
    _replaceRoute = routeName => {
        const { sceneName, ...props } = routeName;
        const navigateAction = NavigationActions.navigate({
            routeName: sceneName,
            params: props,
            action: NavigationActions.navigate({ sceneName })
        });

        this.navigation.dispatch(navigateAction);
    };

    /**
     * 替换页面，根据路由位置
     */
    _replaceAtIndex = index => {
        const routeName = this.Routes[index].routeName;
        const resetAction = NavigationActions.reset({//Replace current state with a new state
            index: 0,
            actions: [NavigationActions.navigate({ routeName })]
        });
        this.navigation.dispatch(resetAction);
    };

    /**
     * 获取当前的路由名称
     */
    _getCurrentRouteName = navigationState => {
        if (!navigationState) {
            return null;
        }
        const route = navigationState.routes[navigationState.index];
        if (route.routes) {
            return this._getCurrentRouteName(route);
        }
        return route.routeName;
    };

    /**
     * 处理android的实体键的返回
     */
    _handleBackAndroid = () => {
        if (__DEV__) {
            console.log('current sceneName', this._sceneName);
        }

        // if popup is top remove it;
        if (this.props.isShowPopup) {
            msg.emit('pop-up-close', true);
            return false;
        }

        if (backOutPages.includes(this._sceneName)) {
            this._backToLast();

            // 退出时释放监听;
            if (Kit.isAndroid()) {
                BackHandler.removeEventListener(
                    'hardwareBackPress',
                    this._handleBackAndroid
                );
            }

            this._handleBackOut();
            return true;
        } else {
            this._backToLast();
            return true;
        }
    };

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
     * 退出插件应用
     */
    _handleBackOut = () => {
        NativeModules.extra.close();
    };
}


