import Theme from '../../style/theme';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 15, //原antd变量，theme中暂时没有
    height: 15 * 0.8, //原antd变量，theme中暂时没有
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioItemRadio: {
    marginLeft: Theme.spacing.horizontalLg,
    marginRight: 8, //原antd变量，theme中暂时没有
  },
  radioItemContent: {
    color: '#000', //原antd变量，theme中暂时没有
    fontSize: 17, //原antd变量，theme中暂时没有
  },
  radioItemContentDisable: {
    color: '#bbb', //原antd变量，theme中暂时没有
  },
});
