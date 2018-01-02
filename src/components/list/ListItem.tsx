/* tslint:disable:jsx-no-multiline-js */
import React from 'react';
import { Image, View, TouchableHighlight, Text } from 'react-native';
import { ListItemProps } from './PropsType';
import listItemStyles from './style/index';
import QMIcon from '../icon/index';
import Theme from '../style/theme';

function noop() {
}

export default class Item extends React.Component<ListItemProps, any> {
  static defaultProps = {
    multipleLine: false,
    wrap: false,
    styles: listItemStyles,
  };
  static Brief: any;
  render() {
    const {
      styles, children, multipleLine, thumb, extra, arrow = '', style, onClick,
      onPressIn = noop, onPressOut = noop, wrap, disabled, align, ...restProps,
    } = this.props;

    let numberOfLines = {};
    if (wrap === false) {
      numberOfLines = {
        numberOfLines: 1,
      };
    }

    let underlayColor = {};

    if (!disabled && onClick) {
      underlayColor = {
        underlayColor: styles.underlayColor,
        activeOpacity: 0.5,
      };
    } else {
      underlayColor = {
        activeOpacity: 1,
      };
    }

    let alignStyle = {};

    if (align === 'top') {
      alignStyle = {
        alignItems: 'flex-start',
      };
    } else if (align === 'bottom') {
      alignStyle = {
        alignItems: 'flex-end',
      };
    }

    let contentDom;
    if (Array.isArray(children)) {
      const tempContentDom: any[] = [];
      children.forEach((el, index) => {
        if (React.isValidElement(el)) {
          tempContentDom.push(el);
        } else {
          tempContentDom.push(<View style={[styles.column, styles.label]}><Text allowFontScaling={false} style={[styles.Content]} {...numberOfLines} key={`${index}-children`}>{el}</Text></View>);
        }
      });
      contentDom = <View style={[styles.column, styles.label]}>{tempContentDom}</View>;
    } else {
      if (React.isValidElement(children)) {
        contentDom = <View style={[styles.column, styles.label]}>{children}</View>;
      } else {
        contentDom = (
          <View style={[styles.column, styles.label]}>
            <Text allowFontScaling={false} style={[styles.Content]} {...numberOfLines}>{children}</Text>
          </View>
        );
      }
    }

    let extraDom;
    if (extra) {
      extraDom = (
        <View style={[styles.column, {flex: 1}]}>
          <Text allowFontScaling={false} style={[styles.Extra]} {...numberOfLines}>{extra}</Text>
        </View>
      );
      if (React.isValidElement(extra)) {
        const extraChildren = (extra.props as any).children;
        if (Array.isArray(extraChildren)) {
          const tempExtraDom: any[] = [];
          extraChildren.forEach((el, index) => {
            if (typeof el === 'string') {
              tempExtraDom.push(
                <Text
                  allowFontScaling={false}
                  {...numberOfLines}
                  style={[styles.Extra]}
                  key={`${index}-children`}
                >
                  {el}
                </Text>,
              );
            } else {
              tempExtraDom.push(el);
            }
          });
          extraDom = (
            <View style={[styles.column, {flex: 1}]}>
              {tempExtraDom}
            </View>
          );
        } else {
          extraDom = extra;
        }
      }
    }

    const arrEnum = {
      horizontal: <QMIcon name="youjiantou" style={{marginRight:-5}} color={Theme.colors.iconBase} size="xxs"/>,
      down: <QMIcon name="xialazhankai" style={{marginRight:-5}} color={Theme.colors.iconBase} size="xxs"/>,
      up: <QMIcon name="xiangshang" style={{marginRight:-5}} color={Theme.colors.iconBase} size="xxs"/>,
    };

    const itemView = (
      <View {...restProps} style={[styles.Item, style]}>
        {typeof thumb === 'string' ? (
          <Image
            source={{ uri: thumb }}
            style={[styles.Thumb, multipleLine && styles.multipleThumb]}
          />
        ) : thumb}
        <View style={[styles.Line, multipleLine && styles.multipleLine, multipleLine && alignStyle]}>
          {contentDom}
          {extraDom}
          {arrow ? (arrEnum[arrow] || <View style={styles.Arrow} />) : null}
        </View>
      </View>
    );

    return (
      <TouchableHighlight
        {...underlayColor}
        onPress={onClick ? onClick : undefined}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
      >
        {itemView}
      </TouchableHighlight>
    );
  }
}
