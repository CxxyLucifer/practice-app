import React, { Component } from 'react';
import { Image, TouchableWithoutFeedback } from 'react-native';

export default class ImageButton extends Component<any, any> {
    render() {
        return (
            <TouchableWithoutFeedback onPress={this.props.onPress}>
                <Image
                    style={this.props.style}
                    source={this.props.source}
                >
                    {this.props.children}
                </Image>
            </TouchableWithoutFeedback>
        )
    }
}