/**
 * TabBar组件,尽量兼容TabBarIOS
 *
 * TabBar并不是Android的原生的体验,是iOS的舶来品
 * 但是现在的App很多都去融合这两者,给用户提供统一的体验
 * 因此,我们就要去build android版本的TabBar
 *
 * 为什么不用Android的TabHost去写,
 * 1.TabHost已经过期,不再提倡使用
 * 2.原生的api不够声明式,转化起来比较麻烦
 * 3.ReactNative的view层js搞定,太简单了.
 *
 *
 * @type {ReactNative|exports|module.exports}
 */
import React, { Component } from 'react';
import LazyComponent from './lazy-component';
import Item from './item';
import { View, PixelRatio, StyleSheet, Dimensions } from 'react-native';
import Theme from '../style/theme';
const HEIGHT = Dimensions.get('window').height;

export default class TabBar extends Component<any, any> {
	Item: any;
	/**
   * 渲染TabBar
   *
   * @returns {XML}
   */
	render() {
		return (
			<View style={styles.container}>
				<View style={styles.container}>
					{this._renderContent()}
				</View>
				<View style={styles.tabBar}>
					{this.props.children}
				</View>
			</View>
		);
	}

	/**
   * 渲染内容区域
   *
   * @returns {Array}
   * @private
   */
	_renderContent() {
		var _children = [];
		var selectedIndex = 0;

		//遍历TabBar.Item的children
		React.Children.forEach(this.props.children, (child: any, index: any) => {
			if (child) {
				if (child.props.selected) {
					selectedIndex = index;
				}
				_children.push(child.props.children);
			} else {
				_children.push(null);
			}
		});

		//返回延迟加载的组件,当selected为true时,才去真正的render组件
		return _children.map((child, i) => {
			var selected = selectedIndex == i;
			if (child) {
				return <LazyComponent selected={selected} component={child} key={i} />;
			}
		});
	}
}

//绑定Item
(TabBar as any).Item = Item;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	tabBar: {
		height: HEIGHT / 14,
		flexDirection: 'row',
		backgroundColor: Theme.colors.fillBase,
		borderTopWidth: Theme.border.widthSm,
		borderColor: Theme.border.split,
	},
});
