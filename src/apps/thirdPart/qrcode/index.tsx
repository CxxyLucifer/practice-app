
'use strict';

import React, { Component } from 'react'
import QRCode from 'react-native-qrcode'
import { Scene } from 'components'

import {
    AppRegistry,
    StyleSheet,
    View,
    TextInput
} from 'react-native';

export default class index extends Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            text: 'http://www.baidu.com/'
        };
    }


    render() {
        return (
            <Scene
                header={"生成二维码"}
                hasBack={true}
            >
                <View style={styles.container}>
                    <QRCode
                        value={this.state.text}
                        size={200}
                        bgColor='#335b9a'
                        fgColor='white' />
                </View>
            </Scene>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },

    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
        borderRadius: 5,
        padding: 5,
    }
});