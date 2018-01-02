import React, { Component } from "react"
import { View, StyleSheet } from "react-native"
import { Scene, TabBar, Theme, Text } from "components";
import { StoreProvider, msg } from "plume2";
import Common from '../common';
//third
import ThirdPart from '../thirdPart';

const MyTabBar: any = TabBar;

export default class Home extends Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            selected: 'base',
            title: '基础组件'
        };
    }

    render() {
        let { title, selected } = this.state;

        return (
            <Scene
                header={title}
                hasBack={false}
            >
                <View style={styles.content}>
                    <TabBar style={styles.tab} tintColor={Theme.colors.brandPrimary} barTintColor={Theme.colors.fillBase}>
                        <MyTabBar.Item
                            title="基础组件"
                            accessible={true}
                            accessibilityLabel={`home:qmbase-btn`}
                            icon={require('../../img/base_gray.png')}
                            selectedIcon={require('../../img/base_blue.png')}
                            onPress={this._handleSelect.bind(this, 'base', '基础组件')}
                            selected={selected === 'base'}
                        >
                            <Common />
                        </MyTabBar.Item>

                        <MyTabBar.Item
                            title="业务组件"
                            accessible={true}
                            accessibilityLabel={`home:qmset-btn`}
                            icon={require('../../img/common_gray.png')}
                            selectedIcon={require('../../img/common_blue.png')}
                            onPress={this._handleSelect.bind(this, 'bussiness', '业务组件')}
                            selected={selected === 'bussiness'}
                        >
                            <Text>22222</Text>
                        </MyTabBar.Item>

                        <MyTabBar.Item
                            title="第三方组件"
                            accessible={true}
                            accessibilityLabel={`home:qmbusiness-btn`}
                            icon={require('../../img/core_gray.png')}
                            selectedIcon={require('../../img/core_blue.png')}
                            onPress={this._handleSelect.bind(this, 'third', '第三方组件')}
                            selected={selected === 'third'}
                        >
                            <ThirdPart />
                        </MyTabBar.Item>
                    </TabBar>
                </View>
            </Scene>
        );
    }

    _handleSelect = (item, title) => {
        this.setState({
            selected: item,
            title: title
        });
    };
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: '#F4F5F7',
        flexDirection: 'column'
    },
    item: {
        marginTop: 10
    },
    tab: {
        flex: 1,
        borderWidth: 0,
    },
})
