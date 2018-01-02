import React from 'react';
import { TouchableWithoutFeedback, Image, View, Text } from 'react-native';
import { CheckboxProps } from './PropsType';
import CheckboxStyle from './style/index';
import QMIcon from '../icon/index';
import Theme from '../style/theme';

export default class Checkbox extends React.Component<CheckboxProps, any> {
  static CheckboxItem: any;
  static AgreeItem: any;

  static defaultProps = {
    styles: CheckboxStyle,
  };

  constructor(props: CheckboxProps, context: any) {
    super(props, context);

    this.state = {
      checked: props.checked || props.defaultChecked || false,
    };
  }

  componentWillReceiveProps(nextProps: CheckboxProps): void {
    if (typeof nextProps.checked === 'boolean') {
      this.setState({
        checked: !!nextProps.checked,
      });
    }
  }

  handleClick = () => {
    if (this.props.disabled) {
      return;
    }
    const checked = !this.state.checked;
    if (!(typeof this.props.checked === 'boolean')) {
      this.setState({
        checked,
      });
    }
    if (this.props.onChange) {
      this.props.onChange({ target: { checked } });
    }
  }

  render(): JSX.Element {
    let { style, disabled, children, styles, hitSlop } = this.props;
    let checked = this.state.checked;
    let Icon;
    if (checked) {
      if (disabled) {
        Icon = <QMIcon name="caozuochenggong" size={20} color='rgba(217,217,217,0.6)'/>;
      } else {
        Icon = <QMIcon name="caozuochenggong" size={20} color={Theme.colors.brandPrimary}/>;
      }
    } else {
      if (disabled) {
        Icon = <QMIcon name="gouxuankuang" size={20} color='rgba(217,217,217,0.6)'/>;
      } else {
        Icon = <QMIcon name="gouxuankuang" size={20} color="#d9d9d9"/>;
      }
    }

    return (
      <TouchableWithoutFeedback onPress={this.handleClick} hitSlop={hitSlop?hitSlop:null}>
        <View style={[styles.wrapper]}>
          {Icon}
          {typeof children === 'string' ? (<Text style={styles.iconRight} allowFontScaling={false}>{this.props.children}</Text>) : children}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
