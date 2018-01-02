import { StyleSheet } from "react-native";
import Theme from "../../style/theme";

export default StyleSheet.create({
  container: {
    height: Theme.inputItem.height,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Theme.border.split,
    marginLeft: 15,
    paddingRight: 15,
    marginTop: 0,
    marginBottom: 0,
    flexDirection: "row",
    alignItems: "center"
  },
  label: {
    marginRight: 10,
    width: Theme.inputItem.labelWidth
  },
  text: {
    textAlignVertical: "center",
    fontSize: Theme.inputItem.fontSize,
    color: Theme.inputItem.textColor
  },
  inputBox: {
    flex: 1
  },
  input: {
    flex: 1,
    padding: 0,
    height: Theme.inputItem.height,
    backgroundColor: "transparent",
    fontSize: Theme.inputItem.fontSize,
    textAlignVertical: "center"
  },
  extra: {
    marginLeft: 5,
    fontSize: Theme.inputItem.fontExtraSize,
    color: Theme.inputItem.extraColor
  },
  errorIcon: {
    marginLeft: 5,
    width: Theme.icon.sizeMd,
    height: Theme.icon.sizeMd
  },
  //头部搜索框
  containerSearch: {
    height: Theme.searchBar.height,
    borderBottomWidth: 0,
    borderBottomColor: "transparent",
    marginBottom: 5
  },
  searchBox: {
    backgroundColor: Theme.colors.fillBody,
    borderRadius: 2,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 1.5,
    paddingBottom: 1.5
  },
  iconSearch: {
    paddingLeft: 10
  },
  inputSearch: {
    paddingLeft: 10,
    paddingRight: 10,
    height: Theme.searchBar.height,
    fontSize: Theme.searchBar.fontSize
  },
  extraSearch: {
    fontSize: Theme.searchBar.fontSize,
    marginLeft: 10
  }
});
