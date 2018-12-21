'use strict';

import React, { Component } from 'react';
import { Scene,MaskModal} from 'components';
import {
    StyleSheet,
    View,
    Dimensions,
    ScrollView,
    NativeModules,
    RefreshControl
} from 'react-native';
import {Button } from 'antd-mobile';

import CodeForm from './component/code_form';

export default class index extends Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            showM1:false,
            refreshing: false
        };
    }

    render() {
        const { showM1,refreshing} = this.state;
        return (
            <View style={styles.content}>
                <Scene
                    header={"MaskModal"}
                    hasBack={true}
                >
                    <ScrollView
                        refreshControl={
                            <RefreshControl
                            title='fresh'
                            refreshing={refreshing}
                            onRefresh={this._onRefresh}
                            />
                      }>
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
                    </ScrollView>
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

    timer;
    _onRefresh = () => {
        this.setState({refreshing: true});
        this.timer = setTimeout(()=>{
            this.setState({refreshing: false});
            clearTimeout(this.timer);
        },5000);
    }


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