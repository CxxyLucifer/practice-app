'use strict';

import React, { Component } from 'react';
import { Scene, Text, Theme, InputItem, RegUtil, TextField, ActionSheet, Kit, Util,MaskModal} from 'components';
import {
    StyleSheet,
    View,
    TextInput,
    ScrollView,
    Keyboard,
    findNodeHandle,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import { createForm } from 'rc-form';
import { List, Toast, Button } from 'antd-mobile';
import objectAssign from 'object-assign';

let height = Kit.Height;//手机屏幕高度

let wrapProps;
if (Kit.isIOS) {
    wrapProps = {
        onTouchStart: e => e.preventDefault()
    };
}

@createForm()
export default class index extends Component<any, any> {
    _scrollView: any;
    keyboardDidShowListener: any;
    keyboardDidHideListener: any;

    constructor(props) {
        super(props);
        this.state = {
            data: {
                sex: '1',//性别，默认男,
                bottom: 0
            }
        };
    }

    componentWillMount() {
        this._listerKeyBoard();
    }

    componentWillUnmount() {
        this._unListerKeyBoard();
    }

    componentDidMount() {
        let { type = 'add' } = this.props;
        //利用此方法可以做到新增和编辑用同一个页面
        if (type == 'edit') {
            this.props.form.setFieldsValue(
                { name: "jack", mobile: "17361858115" }
            );
        }
    }

    render() {
        const { getFieldProps } = this.props.form;
        const { data } = this.state;
        let sex = "";
        if (data.sex == "1") {
            sex = "男";
        } else if (data.sex == "0") {
            sex = "女";
        }

        return (
            <View style={styles.content}>
                <Scene
                    header={"表单"}
                    hasBack={true}
                >
                    <View style={styles.container}>
                        <ScrollView ref={scrollView => (this._scrollView = scrollView)}>
                            <List >
                                <InputItem
                                    {...getFieldProps('name', {
                                        rules: [
                                            { required: true, message: '请输入姓名' },
                                            { min: 4, max: 20, message: '姓名4~20位,中文或英文组成' },
                                            { pattern: RegUtil.reg_name, message: '姓名只能由中文或者英文组成' }
                                        ]
                                    }) }
                                    ref='nameInput'
                                    clear
                                    maxLength={20}
                                    onBlur={() => this._blur('name')}
                                    onFocus={() => this._handleKeyBoard(this.refs['nameInput'], 0)}
                                    placeholder="请输入姓名,必填"
                                >姓名</InputItem>

                                <InputItem
                                    {...getFieldProps('mobile', {
                                        rules: [
                                            { required: true, message: '请输入手机号码' },
                                        ]
                                    }) }
                                    ref='mobileInput'
                                    clear
                                    type="number"
                                    maxLength={11}
                                    onBlur={() => this._blur('mobile')}
                                    onFocus={() => this._handleKeyBoard(this.refs['mobileInput'], 0)}
                                    placeholder="请输入手机号码,必填"
                                >手机号码</InputItem>

                                <TextField
                                    onPress={this._showActionSheet}
                                    label="性别"
                                    placeholder={"请选择"}
                                    value={sex}
                                    style={{ marginLeft: 15, padding: 0, height: 48, paddingRight: 15 }}
                                />
                            </List>
                        </ScrollView>
                    </View>
                    <View style={[styles.buttonView, { marginBottom: this.state.bottom }]}>
                        <Button
                            className="btn"
                            type="primary"
                            onClick={() => this.__save()}
                        >
                            确定
                        </Button>
                    </View>
                </Scene >
                <MaskModal title='这里是弹出框' display={true}/>
            </View>
        );
    };

    __save = () => {
        const { data } = this.state;
        this.props.form.validateFields({ force: true }, (error) => {
            if (!error) {
                objectAssign(data, this.props.form.getFieldsValue());

                console.log('======== data:', data);
            } else {
                Util.solveMessage(error);
            }
        });
    }


    _blur = (input) => {
        this.props.form.validateFields([input], { force: true }, (error) => {
            if (error) {
                Util.solveMessage(error);
            }
        });
    }

    //底部弹出选择男女
    _showActionSheet = () => {
        const BUTTONS = ["男", "女", "取消"];
        const buttonValues = ["1", "0"];
        const { data } = this.state;

        let selectedIndex: Number = -1;
        if (data.sex === "0") {
            selectedIndex = 1;
        } else if (data.sex === "1") {
            selectedIndex = 0;
        }
        ActionSheet.showActionSheetWithOptions(
            {
                options: BUTTONS,
                cancelButtonIndex: BUTTONS.length - 1,
                maskClosable: true,
                valueSelected: selectedIndex,
                wrapProps
            },
            buttonIndex => {
                if (buttonIndex != 2) {
                    objectAssign(data, { sex: buttonValues[buttonIndex] });
                    this.setState({ data: data })
                }
            }
        );
    };

    _handleKeyBoard = (input, offset) => {
        if (Kit.isIOS) {
            this._scrollView.scrollResponderScrollNativeHandleToKeyboard(
                findNodeHandle(input),
                offset,
                true
            );
        }
    };

    _listerKeyBoard() {
        if (Kit.isIOS()) {
            this.keyboardDidShowListener = Keyboard.addListener(
                'keyboardDidShow', (e) => {
                    this._upBottom(height - e.endCoordinates.screenY);
                }
            );
            this.keyboardDidHideListener = Keyboard.addListener(
                'keyboardDidHide', (e) => {
                    this._upBottom(0);
                }
            );
        }
    }

    _unListerKeyBoard() {
        if (Kit.isIOS()) {
            this.keyboardDidShowListener.remove();
            this.keyboardDidHideListener.remove();
        }
    }

    _upBottom = (height) => {
        this.setState({ bottom: height });
    }
}

const styles = StyleSheet.create({
    content:{
        flex: 1,
        height: Dimensions.get('window').height
    },
    container: {
        flex: 1
    },
    buttonView: {
        paddingTop: 10
    },
});