import { StyleSheet } from 'react-native';
import Theme from "../../style/theme";

export default StyleSheet.create({
  container: {
    zIndex: Theme.modal.zindex,
  },
  wrap: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    borderRadius: Theme.modal.borderRadius,
    width: 280,
    paddingTop: 25,
    overflow: 'hidden',
  },
  // fix android borderRadius
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderBottomLeftRadius: Theme.modal.borderRadius,
    borderBottomRightRadius: Theme.modal.borderRadius,
  },
  header: {
    marginBottom: 10,
    fontSize: Theme.modal.fontSizeHeading,
    color: Theme.modal.colorBase,
    textAlign: 'center',
    lineHeight: 25,
    paddingHorizontal: Theme.modal.hSpacingXl,
  },
  body: {
    paddingTop: 0,
    paddingBottom: Theme.modal.vSpacingLg,
    paddingHorizontal: 20,
  },
  maskClosable: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
  closeWrap: {
    position: 'absolute',
    top: 0,
    left: Theme.modal.hSpacingLg,
  },
  close: {
    fontSize: 40,
    fontWeight: '200',
    color: '#bcbcbc',
    lineHeight: 30,
  },
  buttonGroupH: {
    flexGrow: 1,
    flexDirection: 'row',
  },
  buttonGroupV: {
    flexGrow: 1,
    flexDirection: 'column',
  },
  buttonWrapH: {
    flexGrow: 1,
    borderColor: Theme.modal.borderColor,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderRightWidth: StyleSheet.hairlineWidth,
    paddingVertical: 16,
  },
  buttonWrapV: {
    flexGrow: 1,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: Theme.modal.borderColor,
    paddingVertical: 16,
  },
  buttonText: {
    textAlign: 'center',
    color: Theme.modal.colorLink,
    fontSize: 17,
    backgroundColor: 'transparent',
  },
  operationContainer: {
    paddingTop: 0,
  },
  operationBody: {
    paddingBottom: 0,
    paddingHorizontal: 0,
  },
  buttonTextOperation: {
    color: Theme.modal.colorBase,
    textAlign: 'left',
    paddingHorizontal: 15,
  },
});
