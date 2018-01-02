/**
 * Created by wyz on 2017/5/9.
 */
import React from 'react';
import { CascaderValue } from '../../../node_modules/rmc-cascader/lib/CascaderTypes.d';
import { IPopupPickerProps } from '../../../node_modules/rmc-picker/lib/PopupPickerTypes.d';

interface Props extends IPopupPickerProps {
  data: any;
  cascade?: boolean;
  value?: Array<string|number>;
  format?: (values) => void;
  cols?: number;
  extra?: string;
  children?: any;
  onChange?: (date?: CascaderValue,label?: Array<string|number>) => void;
  /** web only */
  pickerPrefixCls?: string;
  popupPrefixCls?: string;
  onPickerChange?: (value: CascaderValue) => void;
  /**rn only**/
}

export default Props;
