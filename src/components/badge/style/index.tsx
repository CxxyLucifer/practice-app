/**
 * Created by syf on 2017/5/8
 * 组件和样式参考ant mobile的代码
 */
import Theme from '../../style/theme';
import { StyleSheet, Platform } from 'react-native';

const grid = 4;
export default StyleSheet.create({
  wrap: {
    flexDirection: 'row',
  },
  textCornerWrap: {
    overflow: 'hidden',
  },
  dot: {
    width: 2 * grid,
    height: 2 * grid,
    borderRadius: grid,
    backgroundColor: Theme.colors.brandImportant,
    position: 'absolute',
    top: -1 * grid,
    right: -1 * grid,
  },
  dotSizelarge: {
    width: 4 * grid,
    height: 4 * grid,
    borderRadius: 2 * grid,
  },
  textDom: {
    paddingVertical: 0.5 * grid,
    paddingHorizontal: (Platform.OS === 'ios' ? 1.5 : 2) * grid,
    backgroundColor: Theme.colors.brandImportant,
    borderRadius: 4 * Theme.border.radiusSm,
    borderStyle: 'solid',
    position: 'absolute',
    top: -10,
    right: -15,
    minWidth:21, //设置最小宽度为了解决文字为数字1时文字宽度比一般文字小导致的圆变形的问题
  },
  textCorner: {
    width: 18 * grid,
    backgroundColor: Theme.colors.brandImportant,
    transform: [{
      rotate: '45deg',
    }],
    position: 'absolute',
    top: 2 * grid,
  },
  textCornerlarge: {
    width: 26 * grid,
    top: 3 * grid,
  },
  text: {
    color: Theme.colors.textBaseInverse,
    textAlign: 'center',
  },
});