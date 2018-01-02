/**
 * Created by syf on 2017/5/8
 * 组件和样式参考ant mobile的代码
 */

import Theme from '../../style/theme';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  tag: {
    borderRadius: Theme.tag.borderRadius,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    overflow: 'visible',
  },
  wrap: {
    overflow: 'hidden',
    borderRadius: Theme.tag.borderRadius,
    borderWidth: Theme.border.widthSm,
    borderStyle: 'solid',
    height: Theme.tag.height,
    justifyContent: 'center',
    paddingHorizontal: Theme.spacing.horizontalLg,
  },
  middleWrap: {
    height: Theme.tag.heightMd,
    paddingHorizontal: Theme.spacing.horizontalMd,
  },
  smallWrap: {
    height: Theme.tag.heightSm,
    paddingHorizontal: Theme.spacing.horizontalSm,
  },
  text: {
    fontSize: Theme.tag.fontSize,
    textAlign: 'center',
  },
  middleText: {
    fontSize: Theme.tag.fontSizeMd,
  },
  smallText: {
    fontSize: Theme.tag.fontSizeSm,
  },
  normalWrap: {
    backgroundColor: Theme.colors.fillBase,
    borderColor: Theme.colors.borderBase,
  },
  normalText: {
    color: Theme.colors.textCaption,
  },
  defaultHighlight: {
    backgroundColor: Theme.tag.defaultFill,
    borderColor: Theme.tag.defaultBorderColor,
  },
  defaultActiveHighlight: {
    backgroundColor: '#dfeaf9',
    borderColor: '#dfeaf9',
  },
  defaultHighlightText: {
    color: Theme.tag.defaultTextColor,
  },
  defaultActiveHighlightText: {
    color: Theme.colors.brandPrimary,
  },
  primaryHighlight: {
    backgroundColor: Theme.tag.primaryFill,
    borderColor: Theme.tag.primaryBorderColor,
  },
  primaryActiveHighlight: {
    backgroundColor: Theme.tag.primaryFill,
    borderColor: Theme.tag.primaryBorderColor,
  },
  primaryHighlightText: {
    color: Theme.tag.primaryTextColor,
  },
  primaryActiveHighlightText: {
    color: Theme.tag.primaryTextColor,
  },
  hotHighlight: {
    backgroundColor: Theme.tag.hotFill,
    borderColor: Theme.tag.hotBorderColor,
  },
  hotActiveHighlight: {
    backgroundColor: Theme.tag.hotFill,
    borderColor: Theme.tag.hotBorderColor,
  },
  hotHighlightText: {
    color: Theme.tag.hotTextColor,
  },
  hotActiveHighlightText: {
    color: Theme.tag.hotTextColor,
  },
  warningHighlight: {
    backgroundColor: Theme.tag.successFill,
    borderColor: Theme.tag.warningBorderColor,
  },
  warningActiveHighlight: {
    backgroundColor: Theme.tag.successFill,
    borderColor: Theme.tag.warningBorderColor,
  },
  warningHighlightText: {
    color: Theme.tag.warningTextColor,
  },
  warningActiveHighlightText: {
    color: Theme.tag.warningTextColor,
  },
  successHighlight: {
    backgroundColor: Theme.tag.successFill,
    borderColor: Theme.tag.successBorderColor,
  },
  successActiveHighlight: {
    backgroundColor: Theme.tag.successFill,
    borderColor: Theme.tag.successBorderColor,
  },
  successHighlightText: {
    color: Theme.tag.successTextColor,
  },
  successActiveHighlightText: {
    color: Theme.tag.successTextColor,
  },
  activeWrap: {
    backgroundColor: Theme.colors.fillBase,
    borderColor: Theme.colors.brandPrimary,
  },
  activeText: {
    color: Theme.colors.textLink,
  },
  disabledWrap: {
    backgroundColor: Theme.colors.fillDisabled,
    borderWidth: 0,
  },
  disabledText: {
    color: Theme.colors.textDisabled,
  },
  close: {
    position: 'absolute',
    backgroundColor: Theme.colors.textPlaceholder,
  },
  closeIOS: {
    borderRadius: 8,
    width: 16,
    height: 16,
    left: -5,
    top: -4,
    overflow: 'hidden',
  },
  closeAndroid: {
    width: 16,
    height: 32,
    left: -2,
    top: -10,
    transform: [{
      rotate: '45deg',
    }],
  },
  closeText: {
    color: Theme.colors.textBaseInverse,
    textAlign: 'center',
    fontSize: 20,
    lineHeight: 18,
  },
  closeTransform: {
    transform: [{
      rotate: '-45deg',
    }],
  },
});