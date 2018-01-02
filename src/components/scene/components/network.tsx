import React from 'react';
import { View, Image, StyleSheet, ViewStyle, ImageStyle } from 'react-native';
import Kit from '../../kit';
import Button from '../../button';
import Icon from '../../icon';
import Text from '../../text';
import Theme from '../../style/theme';

export default class NoNetwork extends React.Component<any, any> {
	static defaultProps = {
		onPress: Kit.noop,
	};

	render() {
		return (
			<View style={styles.container}>
				<View style={[styles.body]}>
					<Text style={styles.bodyText}>喂喂，网断啦，连不上啦</Text>
					<Text style={styles.bodyText}>快去检查网络</Text>
					<Button style={styles.btn} size="middle" onPress={this.props.onPress}>
						重新加载
					</Button>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	} as ViewStyle,
	body: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	} as ViewStyle,
	bodyText: {
		fontSize: 14,
		color: '#999',
		lineHeight: 20,
		marginBottom: 5,
	} as ViewStyle,
	btn: {
		marginTop: 15,
		width: 180,
	} as ViewStyle,
});
