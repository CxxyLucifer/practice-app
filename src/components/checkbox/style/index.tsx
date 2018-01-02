import Theme from '../../style/theme';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconRight: {
    marginLeft: 8, //原antd变量，theme中暂时没有
  },
  agreeItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  agreeItemCheckbox: {
    marginLeft: Theme.spacing.horizontalLg,
    marginRight: 8, //原antd变量，theme中暂时没有
  },
  checkboxItemCheckbox: {
    marginRight: 8, //原antd变量，theme中暂时没有
    alignSelf: 'center',
  },
  checkboxView: {
    flexDirection:'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Theme.border.split,
    height: '100%',
    alignItems:'center',
    paddingRight:15,
  }
});
