import React from 'react';
import { ScrollView,StyleSheet } from 'react-native';
import Modal from './Modal';
import QMText from '../text'

export type AlertButtonType = {
  text: string;
  onPress?: () => void;
  style?: any;
};

export interface AlertContainerProps {
  title: string;
  content: any;
  actions: Array<AlertButtonType>;
  onAnimationEnd?: (visible: boolean) => void;
}

export default class AlertContainer extends React.Component<AlertContainerProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
    };
  }

  onClose = () => {
    this.setState({
      visible: false,
    });
  }

  render() {
    const { title, actions, content, onAnimationEnd } = this.props;
    const footer = actions.map((button) => {
      const orginPress = button.onPress || function () {};
      button.onPress = () => {
        const res = orginPress();
        if (res && (res as any).then) {
          (res as any).then(() => {
            this.onClose();
          });
        } else {
          this.onClose();
        }
      };
      return button;
    });

    return (
      <Modal
        transparent
        title={title}
        visible={this.state.visible}
        onClose={this.onClose}
        footer={footer}
        onAnimationEnd={onAnimationEnd}
        style={title?null:styles.contentOnlyView}
        bodyStyle={title?null:styles.contentOnlyBodyView}
      >
        <ScrollView>
          <QMText style={title?styles.content:styles.contentOnly}>{content}</QMText>
        </ScrollView>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  contentOnlyView: {
    paddingTop:43,
  },
  contentOnlyBodyView: {
    paddingBottom:31,
  },
  content: {
    fontSize: 14,
    lineHeight: 18,
    color: '#999',
    textAlign: 'center'
  },
  contentOnly: {
    fontSize: 17,
    lineHeight: 25,
    color: '#333',
    textAlign: 'center'
  }
})
