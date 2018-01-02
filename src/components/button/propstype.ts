interface ButtonProps {
	type?: 'primary' | 'ghost';
	size?: 'small' | 'middle';
	activeStyle?: boolean | Object;
	disabled?: boolean;
	loading?: boolean;
	style?: Object | Array<Object>;
	/** rn only */
	onPress?: (x: any) => void;
	onPressIn?: (x?: any) => void;
	onPressOut?: (x?: any) => void;
	onShowUnderlay?: (x?: any) => void;
	onHideUnderlay?: (x?: any) => void;
}
export default ButtonProps;
