import variables from '../../style/themes/default';
import { StyleSheet } from 'react-native';
import Theme from "../../style/theme";

export default StyleSheet.create({
  message: {
    marginTop: Theme.modal.vSpacingLg,
    color: Theme.modal.colorCaption,
    fontSize: Theme.modal.fontSizeBase,
    textAlign: 'center',
  },
  inputGroup: {
    marginTop: Theme.modal.vSpacingMd,
    flexDirection: 'column',
  },
  inputWrapper: {
    borderWidth: StyleSheet.hairlineWidth,
    borderTopWidth: 0,
    borderColor: Theme.modal.borderColor,
  },
  input: {
    height: 22,
    fontSize: Theme.modal.fontSizeBase,
    paddingHorizontal: Theme.modal.hSpacingSm,
    paddingVertical: 0,
  },
  inputFirst: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  inputLast: {
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
  },
});
