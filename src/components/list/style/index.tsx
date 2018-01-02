import { StyleSheet } from "react-native";
import Theme from "../../style/theme";

export default {
  underlayColor: Theme.list.fillTap,
  HeaderView: {
    paddingTop: 9,
    paddingLeft: Theme.list.horizontalSpacing,
    paddingRight: Theme.list.horizontalSpacing,
    height: Theme.list.listItemHeight,
    justifyContent: "center",
    backgroundColor: Theme.colors.fillBody
  },
  Header: {
    fontSize: 14,
    color: Theme.list.textCaptionColor,
    backgroundColor: Theme.colors.fillBody
  },
  Footer: {
    fontSize: Theme.list.textSizeBase,
    color: Theme.list.textCaptionColor,
    paddingLeft: Theme.list.horizontalSpacing,
    paddingRight: Theme.list.horizontalSpacing,
    paddingTop: Theme.list.verticalSpacing,
    paddingBottom: Theme.list.verticalSpacing,
    backgroundColor: Theme.colors.fillBody
  },
  Body: {
    backgroundColor: Theme.colors.fillBase,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Theme.border.split
  },
  BodyBottomLine: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: StyleSheet.hairlineWidth,
    backgroundColor: Theme.border.split,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Theme.border.split
  },
  Item: {
    flexGrow: 1,
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: Theme.list.horizontalSpacing,
    backgroundColor: Theme.colors.fillBase
  },
  Line: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: Theme.list.horizontalSpacing,
    paddingTop: Theme.list.verticalSpacing,
    paddingBottom: Theme.list.verticalSpacing,
    minHeight: Theme.list.listItemHeight,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Theme.border.split
  },
  Thumb: {
    width: Theme.icon.sizeMd,
    height: Theme.icon.sizeMd,
    marginRight: Theme.list.horizontalSpacing
  },
  Content: {
    color: Theme.list.textBaseColor,
    fontSize: Theme.list.textSizeBase,
    textAlignVertical: "center"
  },
  Extra: {
    color: Theme.list.textExtraColor,
    fontSize: Theme.list.textSizeBase,
    textAlign: "right",
    textAlignVertical: "center",
    lineHeight: 18
  },
  Brief: {
    minHeight: Theme.list.briefHeight
  },
  BriefText: {
    color: Theme.list.textCaptionColor,
    fontSize: Theme.list.textSizeSmall,
    paddingTop: 6,
    lineHeight: Theme.list.briefLineHeight,
    textAlignVertical: "center"
  },
  Arrow: {
    width: 8,
    height: 13,
    marginLeft: 8,
    marginTop: 3
  },
  /*ArrowV: {
    width: 13,
    height: 8,
    marginLeft: variables.hSpacingMd,
  },*/
  multipleLine: {
    paddingTop: Theme.list.verticalSpacing,
    paddingBottom: Theme.list.verticalSpacing
  },
  multipleThumb: {
    width: Theme.icon.sizeLg,
    height: Theme.icon.sizeLg
  },
  column: {
    flexDirection: "column"
  },
  label: {
    minWidth: 85,
    marginRight: 10
  },
  row: {
    flex: 1,
    paddingRight: Theme.list.horizontalSpacing,
    paddingTop: Theme.list.verticalSpacing,
    paddingBottom: Theme.list.verticalSpacing,
    minHeight: Theme.list.listItemHeight,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Theme.border.split
  },
  rowContent: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center"
  }
};
