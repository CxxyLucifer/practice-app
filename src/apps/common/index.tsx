/**
 * Created by liuhui on 2017/4/25.
 */
import React, { Component } from 'react'
import { StyleSheet, View, ListView, ViewStyle, TouchableOpacity, Text, PixelRatio } from 'react-native'
import { msg } from 'plume2'
import { Scene, Tag, Icon, SwipeAction, Theme } from 'components'

const Functions = [
    { name: 'Form' },
    { name: 'MaskModal'}
];

export default class Home extends Component<any, any> {

    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource: ds.cloneWithRows(Functions),
        };
    }

    render() {
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this._renderRow}
            />
        );
    }


    _renderRow = (rowData) => {
        const right = [
            {
                text: '编辑',
                onPress: () => console.log('edit'),
                style: { backgroundColor: Theme.colors.brandPrimary, color: Theme.colors.textBaseInverse },
            },
            {
                text: '删除',
                onPress: () => console.log('delete'),
                style: { backgroundColor: Theme.colors.brandError, color: Theme.colors.textBaseInverse },
            },
        ];

        return (
            <SwipeAction
                autoClose
                style={{ backgroundColor: 'transparent' }}
                right={right}
            >
                <TouchableOpacity style={styles.Item} onPress={() => this._goNext(rowData.name)}>
                    <Text>{rowData.name}</Text>
                    <Icon name="youjiantou" size="md" color="gray" />
                </TouchableOpacity>
            </SwipeAction>
        );
    }

    _goNext = (name) => {
        msg.emit('route:goToNext', {
            sceneName: name
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    } as ViewStyle,
    Item: {
        flex: 1,
        height: 60,
        paddingTop: 15,
        paddingBottom: 10,
        paddingRight: 10,
        paddingLeft: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderBottomWidth: 1 / PixelRatio.get(),
        borderBottomColor: '#eee'
    } as ViewStyle
});