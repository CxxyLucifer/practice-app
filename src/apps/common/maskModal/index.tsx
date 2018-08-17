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
    Dimensions,
    ViewStyle
} from 'react-native';
import { List, Toast, Button } from 'antd-mobile';
import objectAssign from 'object-assign';

import CodeForm from './component/code_form';

export default class index extends Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            showM1:false
        };
    }

    render() {
        const { showM1} = this.state;
        return (
            <View style={styles.content}>
                <Scene
                    header={"MaskModal"}
                    hasBack={true}
                >
                    <View style={styles.container}>
                        <Button
                            type="ghost"
                            onClick={() => this._modal({showM1:true})}
                        >
                            打开
                        </Button>
                    </View>
                </Scene >
                <MaskModal 
                    onClose={()=> this._modal({showM1:false}) }
                    title='弹出框1' 
                    display={showM1}>
                    <CodeForm/>
                </MaskModal>
            </View>
        );
    };


    _modal=(obj)=>{
        this.setState(obj)
    }
}

const styles = StyleSheet.create({
    content:{
        flex: 1,
        height: Dimensions.get('window').height
    },
    container: {
        flex: 1,
        paddingTop: 20,
        alignItems: 'center'
    },
    buttonView: {
        paddingTop: 10
    },
});