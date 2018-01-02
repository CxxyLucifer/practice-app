interface TagProps {
  type?: 'default' | 'primary' | 'hot' | 'warning' | 'success';
  size?: 'middle' | 'small';
  disabled?: boolean;
  selected?: boolean;
  closable?: boolean;
  readOnly?: boolean;
  onChange?: (selected: boolean) => void;
  onClose?: () => void;
  afterClose?: () => void;
  style?: {};
  tagWrapStyle?: {};
  tagTextStyle?: {};
  /** rn only */
  styles?: any;
}

export default TagProps;