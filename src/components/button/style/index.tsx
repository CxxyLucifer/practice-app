/**
 * Created by syf on 2017/5/4
 * 组件和样式参考ant mobile的代码
 */
import Theme from '../../style/theme';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  defaultHighlight: {
    backgroundColor: Theme.button.defaultFillTap,
    borderColor:  Theme.colors.borderBase,
  },
  primaryHighlight: {
    backgroundColor: Theme.button.primaryFillTap,
    borderColor: Theme.button.primaryFillTap,
  },
  ghostHighlight: {
    backgroundColor: Theme.colors.fillBase,
    borderColor: Theme.button.ghostColorTap,
  },
  wrapperStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Theme.border.radiusSm,
    borderWidth: Theme.border.widthSm,
  },
  normalRaw: {
    height: Theme.button.height,
    paddingLeft: Theme.button.spacing,
    paddingRight: Theme.button.spacing,
  },
  middleRaw: {
    height: Theme.button.heightMd,
    paddingLeft: Theme.button.spacingMd,
    paddingRight: Theme.button.spacingMd,
  },
  smallRaw: {
    height: Theme.button.heightSm,
    paddingLeft: Theme.button.spacingSm,
    paddingRight: Theme.button.spacingSm,
  },
  defaultRaw: {
    // height: Theme.button.height,
    backgroundColor: Theme.colors.fillBase,
    borderColor: Theme.colors.borderBase,
  },
  primaryRaw: {
    backgroundColor: Theme.button.primaryFill,
    borderColor: Theme.button.primaryFill,
  },
  ghostRaw: {
    backgroundColor: Theme.colors.fillBase,
    borderColor: Theme.button.ghostColor,
  },
  disabledRaw: {
    // backgroundColor: Theme.colors.fillDisabled,
    // borderColor: Theme.colors.fillDisabled,
    color: Theme.colors.textDisabled,
  },
  defaultDisabledText: {
    color: Theme.colors.textDisabled,
  },
  primaryDisabled: {
    backgroundColor: '#ddd',
    borderColor: '#ddd',
  },
  primaryDisabledText: {
    color: '#b8b8b8',
  },
  ghostDisabled: {
    backgroundColor: Theme.colors.fillBase,
    borderColor: Theme.colors.borderBase,
  },
  ghostDisabledText: {
    color: Theme.colors.textDisabled,
  },
  acrossRaw: {
    width: '100%',
  },
  defaultHighlightText: {
    color: Theme.colors.textBase,
  },
  primaryHighlightText: {
    color: Theme.colors.textBaseInverse,
  },
  ghostHighlightText: {
    color: Theme.button.ghostColorTap,
  },
  normalRawText: {
    fontSize: Theme.button.fontSize,
  },
  middleRawText: {
    fontSize: Theme.button.fontSizeMd,
  },
  smallRawText: {
    fontSize: Theme.button.fontSizeSm,
  },
  defaultRawText: {
    color: Theme.colors.textBase,
  },
  primaryRawText: {
    color: Theme.colors.textBaseInverse,
  },
  ghostRawText: {
    color: Theme.button.ghostColor,
  },
  disabledRawText: {
    color: Theme.colors.textDisabled,
  },
  iconRawText: {
    paddingRight: Theme.spacing.horizontalSm,
  },
  indicator: {
    marginRight: Theme.spacing.horizontalMd,
  },
});