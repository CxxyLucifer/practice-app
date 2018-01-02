/**
 * Created by syf on 2017/5/4
 * 组件和样式参考ant mobile的代码
 */

import React from 'react';
import { TouchableHighlight, Text, StyleSheet, View, ActivityIndicator } from 'react-native';
import buttonStyles from './style/index';
import PropsType from './propstype';
import QMIcon from '../icon';

export default class QMButton extends React.Component<PropsType, any> {
	styles = buttonStyles;
	static defaultProps = {
		disabled: false,
		activeStyle: {},
		loading: false,
		onPress: (_x?: any) => { },
		onPressIn: (_x?: any) => { },
		onPressOut: (_x?: any) => { },
		onShowUnderlay: (_x?: any) => { },
		onHideUnderlay: (_x?: any) => { },
	};

	constructor(props) {
		super(props);
		this.state = {
			pressIn: false,
			touchIt: false,
			clicking: true,
		};
	}

	onPress = (...arg) => {
		let myState: any = this.state;

		if (this.props.onPress) {
			if (myState.clicking) {
				myState.clicking = false;
				(this.props.onPress as any)(...arg);
				setTimeout(() => {
					myState.clicking = true;
				}, 500);
			}
		}
	};

	onPressIn = (...arg) => {
		if (!this.props.disabled) {
			this.setState({ pressIn: true });
		}
		if (this.props.onPressIn) {
			(this.props.onPressIn as any)(...arg);
		}
	};

	onPressOut = (...arg) => {
		if (!this.props.disabled) {
			this.setState({ pressIn: false });
		}
		if (this.props.onPressOut) {
			(this.props.onPressOut as any)(...arg);
		}
	};

	onShowUnderlay = (...arg) => {
		if (!this.props.disabled) {
			this.setState({ touchIte: true });
		}
		if (this.props.onShowUnderlay) {
			(this.props.onShowUnderlay as any)(...arg);
		}
	};

	onHideUnderlay = (...arg) => {
		if (!this.props.disabled) {
			this.setState({ touchIt: false });
		}
		if (this.props.onHideUnderlay) {
			(this.props.onHideUnderlay as any)(...arg);
		}
	};

	render() {
		// TODO: replace `TouchableHighlight` with `TouchableWithoutFeedback` in version 1.1.0
		const {
			size = 'normal',
			type = 'default',
			disabled,
			activeStyle,
			onPress,
			style,
			loading,
			...restProps,
		} = this.props;

		[
			'activeOpacity',
			'delayPressOut',
			'underlayColor',
			'onPress',
			'onPressIn',
			'onPressOut',
			'onShowUnderlay',
			'onHideUnderlay',
		].forEach(prop => {
			if (restProps.hasOwnProperty(prop)) {
				delete restProps[prop];
			}
		});

		const styles = this.styles;
		const textStyle = [
			styles[`${size}RawText`],
			styles[`${type}RawText`],
			disabled && styles.disabledRawText && styles[`${type}DisabledText`],
			this.state.pressIn && styles[`${type}HighlightText`],
		];

		const wrapperStyle = [
			styles.wrapperStyle,
			styles[`${size}Raw`],
			styles[`${type}Raw`],
			disabled && styles.disabledRaw && styles[`${type}Disabled`],
			this.state.pressIn && activeStyle && styles[`${type}Highlight`],
			this.state.touchIt && activeStyle,
			style,
		];

		const underlayColor = StyleSheet.flatten(styles[activeStyle ? `${type}Highlight` : `${type}Raw`])
			.backgroundColor;

		const indicatorColor = (StyleSheet.flatten(
			this.state.pressIn ? styles[`${type}HighlightText`] : styles[`${type}RawText`]
		) as any).color;

		return (
			<TouchableHighlight
				activeOpacity={1}
				delayPressOut={1}
				underlayColor={underlayColor}
				style={wrapperStyle}
				onPress={this.onPress}
				onPressIn={this.onPressIn}
				onPressOut={this.onPressOut}
				onShowUnderlay={this.onShowUnderlay}
				onHideUnderlay={this.onHideUnderlay}
				disabled={disabled}
				{...restProps}
			>
				<View style={styles.container}>
					{loading
						? <ActivityIndicator style={styles.indicator} animating color={indicatorColor} size="small" />
						: null}
					<Text style={textStyle} allowFontScaling={false} numberOfLines={1}>
						{this.props.children}
					</Text>
				</View>
			</TouchableHighlight>
		);
	}
}
