import React, { Component } from 'react';
import {StyleSheet, View,Text, TouchableOpacity,Dimensions} from 'react-native';
import { Icon } from 'components';

interface Iprops{
  title: string,
  display: boolean,
  onClose: ()=> void
}

export default class MaskModal extends Component<Iprops,any>{
  static defaultProps = {
    title:'',
    display: false,
    onClose: () => {}
  }

  constructor(props:Iprops) {
		super(props);
	}

  render() {
    if(!this.props.display){
      return null;
    }

    return (
      <View style={styles.container}>
        <View style={[styles.container, styles.mask]} />
        <View style={styles.body}>
          <View style={styles.header}>
            <View style={styles.flex1} />
            <View style={styles.titleView}>
              <Text numberOfLines={1} style={styles.title}>{ this.props.title }</Text>
            </View>
            <TouchableOpacity
              onPress={() => this.props.onClose()}
              style={styles.close}
            >
              <Icon name="guanbi2" size="md" color={'#cccccc'} />
            </TouchableOpacity>
          </View>
          <View style={styles.content}>
          {
            this.props.children
          }
          </View>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    left: 0,
    right: 0,
    top: 0,
    flex: 1,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  },
  mask: {
    flex: 1,
    height: Dimensions.get('window').height,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  body:{
    width:'85%',
    height: 200,
    backgroundColor: 'white',
    marginTop: (Dimensions.get('window').height - 200) / 2,
    borderRadius: 4
  },
  header:{
    flex: 1,
    height:30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  flex1:{
    flex: 1
  },
  close:{
    flex: 1, 
    alignItems: 'flex-end', 
    marginRight: 8 
  },
  titleView:{
    flex:2,
    alignItems: 'center'
  },
  title:{
    fontSize: 16, 
    color: '#333333'
  },
  content:{
    flex:4
  }
});