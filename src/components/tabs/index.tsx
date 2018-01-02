import React, { Component, ReactChild, ReactChildren } from "react";
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
  ScrollView
} from "react-native";
import QMKit from "../kit";
import Theme from "../style/theme";
import QMText from "../text";

export interface TabsProps {
  activeKey?: string | number;
  defaultActiveKey?: string | number;
  onChange?: (activeKey: string) => any;
}

export interface TabPaneProps {
  tab: string;
  key: string;
}

class TabPane extends Component<TabPaneProps, any> {
  render() {
    return (
      <View style={styles.container}>
        {this.props.children}
      </View>
    );
  }
}

export default class Tabs extends Component<TabsProps, any> {
  state = {
    activeKey: undefined,
    tabContents: {}
  };

  static TabPane = TabPane;

  render() {
    const { defaultActiveKey } = this.props;
    let firstKey: string | number = "";
    if (defaultActiveKey) {
      firstKey = defaultActiveKey;
    } else {
      React.Children.map(this.props.children, (v: any, k) => {
        if (k === 0) {
          firstKey = v.key;
        }
      });
    }

    const { activeKey = firstKey } = this.state;
    let { panes, comps } = this.solveTabPanes(activeKey);
    let content = comps;
    return (
      <View style={styles.container}>
        <View style={styles.tabs}>
          <ScrollView
            style={{
              flex: 1
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            <View style={styles.tabbox}>
              {panes.map((v, key) => {
                let tabStyle = v.active
                  ? [styles.tab, styles.active]
                  : styles.tab;
                return (
                  <View style={styles.tabItem} key={key}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={tabStyle}
                      onPress={this.handleTabTouch.bind(this, v.key)}
                    >
                      <QMText style={v.active ? styles.activeText : null}>
                        {v.tab}
                      </QMText>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </View>
        <View style={styles.container}>
          <content.type {...content.props} key={activeKey}>
            {content.props.children}
          </content.type>
        </View>
      </View>
    );
  }

  getTabContent(key: string) {
    const { tabContents } = this.state;
    return tabContents[key];
  }

  handleTabTouch(key: string) {
    const { onChange } = this.props;
    if (typeof onChange === "function") {
      onChange(key);
    }
    this.setState({ activeKey: key });
  }

  solveTabPanes(activeKey: string): any {
    let panes = [];
    let comps = {};
    interface P {
      tab?: any;
      active?: any;
      key?: any;
    }
    React.Children.map(this.props.children, v => {
      let p: P = {};
      if (React.isValidElement(v)) {
        let tab = (v as any).props.tab;
        let key = v.key;
        p = { tab, key };
        if (activeKey === key) {
          p.active = true;
          comps = v;
        }
        panes.push(p);
      }
    });
    return { panes, comps };
  }
}

const styles = StyleSheet.create({
  tabs: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  } as ViewStyle,
  tabbox: {
    minWidth: QMKit.Width,
    flexDirection: "row",
    borderBottomWidth: Theme.border.widthSm,
    borderColor: Theme.colors.borderSplit
  } as ViewStyle,
  tabItem: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: -1,
    alignItems: "center",
    justifyContent: "center",
    height: Theme.tabBar.height
  } as ViewStyle,
  tab: {
    flex: 1,
    paddingBottom: 2,
    paddingHorizontal: 10,
    height: Theme.tabBar.height,
    justifyContent: "center"
  } as ViewStyle,
  active: {
    paddingBottom: 0,
    borderBottomColor: Theme.colors.brandPrimary,
    borderBottomWidth: 2
  } as ViewStyle,
  activeText: {
    color: Theme.colors.brandPrimary
  } as ViewStyle,
  container: {
    flex: 1
  } as ViewStyle
});
