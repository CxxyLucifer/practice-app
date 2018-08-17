import { Image } from 'react-native';
/**
 * @providesModule components
 */
import { Platform } from 'react-native'

import Text from './text'
import TextInput from './textinput'
import CheckBox from './checkbox'
import Radio from './radio'
import List from './list'
import Switch from './switch'
import Toast from './toast'
import Tabs from './tabs'
import InputItem from './input-item'
import Badge from './badge'
import Button from './button'
import Icon from './icon'
import Modal from './modal'
import SwipeAction from './swipe-action'
import Tag from './tag'
import Picker from './picker/picker'
import ActionSheet from './action-sheet'
import TextArea from './textarea-item'
import DatePicker from './date-picker'
import Theme from './style/theme'
import TabBarIOS from './tabbar/index.ios'
import TabBarAndroid from './tabbar/index.android'
import PullToRefresh from './pull-to-refresh'
import PullToRefreshListIOS from './pull-refresh-list-view/index.ios'
import PullToRefreshListAndroid from './pull-refresh-list-view/index.android'
import Scene from './scene'
import Header from './header'
import Kit from './kit'
import QRScannerView from './QRScanner'
import Colors from './colors'
import Images from './images'
import DropComponent from './dropDown'
import noop from './noop'
import config from './config'
import RegUtil from './util/regUtil'
import Util from './util/util'
import TextField from './text-field'
import MaskModal from './maskModal/index'


const PullToRefreshList = Platform.OS === 'android' ? PullToRefreshListAndroid : PullToRefreshListIOS;
const TabBar = Platform.OS === 'android' ? TabBarAndroid : TabBarIOS;

export {
    Text,
    TextInput,
    Tabs,
    Toast,
    CheckBox,
    Radio,
    List,
    Switch,
    Badge,
    Button,
    Icon,
    Modal,
    InputItem,
    SwipeAction,
    Tag,
    Picker,
    ActionSheet,
    TextArea,
    DatePicker,
    Theme,
    TabBar,
    PullToRefresh,
    PullToRefreshList,
    Scene,
    Header,
    Kit,
    QRScannerView,
    Colors,
    Images,
    DropComponent,
    noop,
    config,
    RegUtil,
    Util,
    TextField,
    MaskModal
}
