import React from 'react';
import topView from 'rn-topview';
import AlertContainer from './AlertContainer';

export function alert(...args) {
  let title,content,actions;
  if(args.length==2){
    title = null
    content = args[0];
    actions = args[1] || [{ text: '确定' }];
  }else if(args.length==3){
    title = args[0];
    content = args[1];
    actions = args[2] || [{ text: '确定' }];
  }


  const onAnimationEnd = visible => {
    if (!visible) {
      topView.remove();
    }
  };

  topView.set(
    <AlertContainer
      title={title}
      content={content}
      actions={actions}
      onAnimationEnd={onAnimationEnd}
    />
  );
}

export function close() {
  topView.remove();
}
