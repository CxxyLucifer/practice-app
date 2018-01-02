import React from 'react';
import { ActionSheetIOS, Platform } from 'react-native';
import topView from 'rn-topview';
import ActionSheetAndroidContainer from './AndroidContainer';
import { createForm } from 'rc-form'

let ActionSheet = ActionSheetIOS as any;

if (Platform.OS !== 'ios') {
  let instance;

  const saveInstance = (i) => {
    instance = i;
  };

  const onAnimationEnd = (visible) => {
    if (!visible) {
      topView.remove();
    }
  };

  ActionSheet = {
    showActionSheetWithOptions(config, callback) {
      topView.set(
        createForm()(<ActionSheetAndroidContainer
          visible
          ref={saveInstance}
          onAnimationEnd={onAnimationEnd}
          config={config}
          callback={callback}
        />),
      );
    },
    showShareActionSheetWithOptions(config: any) {
      topView.set(
        createForm()(<ActionSheetAndroidContainer
          visible
          ref={saveInstance}
          onAnimationEnd={onAnimationEnd}
          config={config}
          share
        />),
      );
    },
    close() {
      if (instance) {
        instance.close();
      }
    },
  };
}

// const ActionSheetCom = createForm()(ActionSheet);
// export default ActionSheetCom;
export default ActionSheet;
