
'use strict';

import React, { Component } from 'react'
import {
    AppRegistry,
    StyleSheet,
    View,
    Text,
    TextInput
} from 'react-native'
import { Scene, QRScannerView, Toast, Colors, Images } from 'components'
import ImageButton from './component/ImageButton'
import TitleBar from './component/TitleBar'

const MyText: any = Text;

export default class index extends Component<any, any> {

    render() {
        return (
            < QRScannerView
                bottomMenuStyle={{ height: 100, backgroundColor: Colors.black_393A3F, opacity: 1 }}
                hintTextPosition={120}
                hintTextStyle={{ color: Colors.gray_C0C0C0 }}
                maskColor={Colors.black_0000004D}
                borderWidth={0}
                iscorneroffset={false}
                cornerOffsetSize={0}
                scanBarAnimateTime={3000}
                onScanResultReceived={this.barcodeReceived.bind(this)}

                renderTopBarView={() => {
                    return (
                        <TitleBar
                            titleColor={Colors.white_fff}
                            bgColor={Colors.black_393A3F}
                            title={"扫一扫"}
                            rightIcon={Images.ic_wechat_more}
                            leftIcon={Images.ic_wechat_back}
                            leftIconPress={() => this.props.navigation.goBack()}
                        />

                    )
                }}

                renderBottomMenuView={() => {
                    return (
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            <View style={Styles.view_bottom_menu_item}>
                                <ImageButton
                                    style={Styles.image_bottom_menu}
                                    source={Images.ic_wechat_scan_hl}
                                />
                                <Text
                                    style={Styles.text_bottom_menu_item}
                                >扫码</Text>
                            </View>
                        </View>
                    )
                }}
            />
        );
    };


    barcodeReceived(e) {
        Toast.show('Type: ' + e.type + '\nData: ' + e.data);
    }
}

const Styles = StyleSheet.create({
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
    },
    image_bottom_menu: {
        height: 46,
        width: 46,
        resizeMode: 'contain'
    },
    view_bottom_menu_item: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
    },
    text_bottom_menu_item: {
        color: Colors.white_fff,
        marginTop: 8
    }
});