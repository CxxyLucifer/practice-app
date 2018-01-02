import { StyleSheet } from 'react-native';
import Theme from '../style/theme';

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  header: {
    flexGrow: 1,
    height: 44,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f7f7f7',
    borderBottomWidth: Theme.border.widthSm,
    borderBottomColor: Theme.border.split,
  },
  headerItem: {
    paddingLeft: 15,
    paddingRight: 15,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    color: Theme.colors.brandPrimary,
    fontSize: 15,
    textAlign: 'center',
  },
  title: {
    color: Theme.colors.textSecondary,
    fontSize: Theme.font.sizeCaption,
    textAlign: 'center',
  },
});

export default styles;
