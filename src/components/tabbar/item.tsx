/**
 * TabBar.Item组件,
 * 尽量和TabBarIOS的Item的api相同
 *
 * @type {ReactNative|exports|module.exports}
 */
import React, { Component } from 'react';
import { TouchableNativeFeedback, View, Image, StyleSheet } from 'react-native';
import Text from '../text';
import emptyFn from '../empty-fn';

/**
 * tabbar每个项
 */
export default class TabBarItem extends Component<any, any> {
	static defaultProps = {
		selected: false,
		onPress: emptyFn,
		accessible: false,
		accessibilityLabel: '',
	};

	render() {
		return (
			<TouchableNativeFeedback
				accessible={this.props.accessible}
				accessibilityLabel={this.props.accessibilityLabel}
				onPress={this.props.onPress}
			>
				<View style={styles.container}>
					{this._getImage()}
					<Text
						style={[
							styles.title,
							this.props.selected && {
								color: '#418cd6',
							},
						]}
					>
						{this.props.title}
					</Text>
				</View>
			</TouchableNativeFeedback>
		);
	}

	/**
   * 获取图片
   */
	_getImage = () => {
		if (!this.props.selectedIcon && !this.props.icon) {
			return null;
		}

		/*选中的图片*/
		if (this.props.selected) {
			return (
				<View>
					<Image style={styles.img} source={this.props.selectedIcon} resizeMode="stretch" />
				</View>
			);
		} else {
			return (
				<View>
					<Image style={styles.img} source={this.props.icon} resizeMode="stretch" />
				</View>
			);
		}
	};
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		color: 'gray',
		fontSize: 10,
	},
	img: {
		width: 20,
		height: 20,
	},
});
