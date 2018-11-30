'use strict';

import React, { Component } from 'react';
import { Scene,MaskModal} from 'components';
import {
    StyleSheet,
    View,
    Dimensions,
    NativeModules
} from 'react-native';
import {Button } from 'antd-mobile';

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

                         <Button
                            type="ghost"
                            onClick={() => this._toast('原生android的方法')}
                        >
                            android原生Toast
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

    _toast=(msg)=>{
        NativeModules.extra.Toast(msg);
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