import React, { Component, ReactChild, ReactChildren } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ViewStyle,
    TouchableOpacity,
    PixelRatio,
    Dimensions
} from 'react-native'
import { msg } from 'plume2'
import { List, Icon, Theme, Kit } from 'components'

const Height = Dimensions.get('window').height

export interface DropDownProps {
    onChange?: (activeKey: string) => any,
    style?: String,
    visible?: boolean
}

export interface DropDownItem {
    title: String,
    selected?: String
}

class DropDownPane extends Component<DropDownItem, any>{
    render() {
        return (
            <View style={styles.container}>
                {this.props.children}
            </View>
        )
    }
}

export default class Condition extends Component<DropDownProps, any> {
    constructor(props) {
        super(props);
        this.state = {
            showDropDown: false,
            selectKey: "",
        };
    }

    static Item = DropDownPane;

    componentDidMount() {
        msg.on('componets-dropDown:close', this._closeDropDown);
    }

    componentWillUnmount() {
        msg.off('componets-dropDown:close', this._closeDropDown);
    }

    render() {
        let { showDropDown, selectKey, selectValue } = this.state;
        let { titles, comps } = this._solveDropDown(selectKey);
        return (
            <View style={[styles.option]}>
                <View style={[styles.options]}>
                    {
                        titles.map((v, k) => {
                            if (k == 0) {
                                return (
                                    <TouchableOpacity key={k} style={[styles.options_view, styles.menuTab]}
                                        onPress={selectValue == 'fase' ? null : this._onClick.bind(this, v.key)}>
                                        <Text style={styles.btnTxt}>
                                            {v.title}
                                        </Text>
                                        {selectKey === v.key ? <Icon name="xiangshang" /> :
                                            <Icon name="xialazhankai" />}
                                    </TouchableOpacity>
                                )
                            } else {
                                return (
                                    <TouchableOpacity key={k} style={[styles.options_view, styles.menuTab, styles.leftLine]}
                                        onPress={selectValue == 'fase' ? null : this._onClick.bind(this, v.key)}>
                                        <Text style={styles.btnTxt}>
                                            {v.title}
                                        </Text>
                                        {selectKey === v.key ? <Icon name="xiangshang" /> :
                                            <Icon name="xialazhankai" />}
                                    </TouchableOpacity>
                                )
                            }
                        })
                    }
                </View >
                {
                    showDropDown ?
                        <View style={styles.downContainer}>
                            {comps.props.children}
                        </View> : null
                }
            </View>
        )
    }


    _closeDropDown = () => {
        this.setState({ selectKey: "", showDropDown: false });
    }

    _onClick(key: string) {
        let { showDropDown, selectKey } = this.state;
        let tempKey = key;
        if (selectKey == "") {
            tempKey = key;
        } else {
            tempKey = "";
        }
        if (showDropDown) {
            this.setState({ selectKey: tempKey, showDropDown: false });
        } else {
            this.setState({ selectKey: tempKey, showDropDown: true });
        }
    }

    _solveDropDown(clickKey: string): any {
        let titles = [];
        let comps = {};

        interface P {
            title?: any;
            key?: any;
        }
        React.Children.map(this.props.children, v => {
            let p: P = {};
            if (React.isValidElement(v)) {
                let title = (v as any).props.title;
                let key = v.key;
                p = { title, key };
                if (clickKey == key) {
                    comps = v;
                }
                titles.push(p);
            }
        })
        return { titles, comps };
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        zIndex: 999
    },
    conditionBar: {
        height: 43
    },
    option: {
        flexDirection: 'column',
        zIndex: 999
    },
    options: {
        height: 45,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1 / PixelRatio.get(),
        borderColor: '#eee'
    },
    options_view: {
        flex: 1,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnTxt: {
        fontSize: 16,
        color: '#666',
    },
    menuTab: {
        flexDirection: 'row',
        height: 44,
        justifyContent: 'center',
        alignItems: 'center'
    },
    downContainer: {
        left: 0,
        right: 0,
        top: 45,
        flex: 1,
        position: 'absolute',
        height: Height,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    leftLine: {
        borderLeftWidth: 1 / PixelRatio.get(),
        borderLeftColor: '#E9E9E9'
    }
})