/**
 * 延迟加载组件
 *
 * @type {ReactNative|exports|module.exports}
 */
import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
var { width: SCREEN_WIDTH } = Dimensions.get('window');

class StaticComponent extends Component<any, any> {
	shouldComponentUpdate() {
		return this.refs.component == null;
	}

	render() {
		var Component = this.props.component;

		if (this.props.selected) {
			return React.cloneElement(Component, {
				ref: 'component',
			});
		}

		return null;
	}
}

/**
 * Usage
 *
 * var LazyComponent = require('lazy-component');
 *
 * <LazyComponent selected={true} component={XXX}/>
 */
export default class LazyComponent extends Component<any, any> {
	static defaultProps = {
		selected: false,
		component: null,
	};

	render() {
		const { selected, component } = this.props;

		return (
			<View style={[styles.content, selected && styles.selected]}>
				<StaticComponent selected={selected} component={component} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	content: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		right: 0,
		width: SCREEN_WIDTH,
		left: -SCREEN_WIDTH,
	},
	selected: {
		left: 0,
	},
});
