//@flow
import React from "react";
import { Alert, Dimensions, Platform, AsyncStorage, Linking, ListView } from "react-native";
import Fetch from "./fetch";
import config from "./config";
import { msg } from "plume2";

const {
  HOST,
  PARENT_ID,
  iOS_STORE_VERSION,
  ANDROID_VERSION,
} = config;

/**
 * VersionCheck
 */
async function VersionCheck(handler: Function): Promise<any> {
  const { res, err } = await Fetch(`${HOST}/getNewVersion?parentId=${PARENT_ID}&iosVersion=${iOS_STORE_VERSION}&androidVersion=${ANDROID_VERSION}`);
  if (err) {
    return;
  }

  //iOS
  if (Platform.OS === 'ios') {
    if (res.iosStoreVersion > iOS_STORE_VERSION) {
      //Alert.alert ('友情提示', '有新版本，请升级', [
      //  {
      //    text: '确定', onPress: () => {
      //    Linking.openURL (res.iosStoreUrl);
      //  }
      //  }]);
      msg.emit('app:update', res);
    } else {
      // 没有大版本再检查codpush
      // SyncCode(handler);
    }
  }
  else {
    //Android
    if (res.androidNewVersion > ANDROID_VERSION) {
      //Alert.alert ('友情提示', '有新版本，请升级', [
      //  {
      //    text: '确定', onPress: () => {
      //    Linking.openURL (res.androidNewVersionAdd)
      //  }
      //  }]);
      msg.emit('app:update', res);
    } else {
      // 没有大版本再检查codpush
      // SyncCode(handler);
    }
  }
}


/**
 * flatModues and return a module mapper
 */
const flatModules = (modules: Array<Object | Function> = []): Object => {
  let modulesObj = {};

  for (let m of modules) {
    Object.keys(m).forEach((v) => {
      modulesObj[v] = m[v];
    });
  }

  // if (__DEV__) {
  //   if (logger.contain('showAllRouteModule')) {
  //     console.log(
  //       "============loading all modules=========",
  //       Object.keys(modulesObj)
  //     );
  //   }
  // }

  return modulesObj;
};


/**
 * 不四舍五入的取两位小数
 */
function _toFixed2(number) {
  if (typeof number != 'string') {
    number = number.toString();
  }
  let numberArray = number.split('.');
  if (numberArray[1]) {
    if (numberArray[1].length == 1) {
      numberArray[1] = numberArray[1] + '0';
    } else if (numberArray[1].length > 2) {
      numberArray[1] = numberArray[1].substring(0, 2);
    }
  } else {
    numberArray[1] = '00';
  }
  return parseFloat(numberArray.join('.'));
}


function _toRound2(x) {
  var f = parseFloat(x);
  if (isNaN(f)) {
    return;
  }

  f = Math.round(x * 100) / 100;
  return f;
}


/**
 * 格式成大单位显示; 如4箱1件
 * @param unit
 * @param containUnit
 * @param unitConversionNum
 * @private
 */
function _formatUnitStr({ unit, containerUnit, unitConversionNum, buyCount }: Unit) {
  if (buyCount > 0) {
    let smallUnit: number = buyCount % unitConversionNum;
    let bigUnit: number = buyCount / unitConversionNum;
    bigUnit = Math.floor(bigUnit);
    if (bigUnit >= 1) {
      return bigUnit + containerUnit + (smallUnit > 0 ? ('+' + smallUnit + unit) : '');  // 4箱1件
    }
  }

  return '';
}


/**
 * 显示大小单位关系;
 * @param unit
 * @param containUnit
 * @param unitConversionNum
 * @private
 */
function _formatUnitStr2({ unit, containerUnit, unitConversionNum }) {
  return '1' + containerUnit + '=' + unitConversionNum + unit;
}

/**
 * 转webp格式, ios转jpg, ios不支持webp
 * @param source
 * @private
 */
function _getWebp(source, width, height) {
  let cleanSrc = _cleanUrl(source);
  //__DEV__ && console.log('_getWebp:cleanSrc=', cleanSrc);
  let newUrl = source;
  if (Platform.OS === 'android') {
    newUrl = _format(cleanSrc, parseInt(width), parseInt(height), "webp")
  } else if (Platform.OS === 'ios') {
    newUrl = _format(cleanSrc, parseInt(width), parseInt(height), "jpg")
  }
  //__DEV__ && console.log('_getWebp:newUrl=', newUrl);
  return newUrl;
}

/**
 * 添除服务端的格式转换;
 * @param source
 * @returns {*}
 * @private
 */
function _cleanUrl(source) {
  source = (source || '');
  let p = source.lastIndexOf("@");
  if (p != -1) {
    return source.substring(0, p)
  }
  return source;
}


//格式化策略
//例如: oss策略为 x-oss-process=image/resize,m_fixed,h_100,w_100/format,jpg
function _format(src, width, height, format) {
  var f = [src, "?x-oss-process=image"];
  if (width || height) {
    f.push('/resize,m_fixed,');
    if (width) {
      f.push(`,w_${width}`)
    }
    if (height) {
      f.push(`,h_${height}`)
    }
  }
  if (format) {
    f.push(`/format,${format}`)
  }
  return f.join('')
}

const noop = () => {
};


/**
 *
 * 获取阶梯设价的价格;
 *
 * @param buyCount 下所有sku购买数量;
 * @param stepPriceArea : [
 *   0: [
 *     0: 1,      // 起
 *     1: 10,     // 止
 *     2: 150.00, // 价格;
 *   ], ...
 * ]
 * @private
 */
function _getPriceInAreaPrice(buyCount: number, stepPriceArea: Array<Array<number>>) {
  for (let i = 0; i < stepPriceArea.length; i++) {
    if (buyCount <= stepPriceArea[i][0] && buyCount <= stepPriceArea[i][1]) {
      return stepPriceArea[i][2];
    }
  }
}

const KIT = {
  /**
   *
   */
  Width: Dimensions.get('window').width,
  Height: Dimensions.get('window').height,

  /**
   *
   */
  noop: noop,

  /**
   *
   */
  simpleDataSource(): Object {
    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    });
    return dataSource;
  },

  /**
   * 判断是否是android
   * @returns {boolean}
   */
  isAndroid(): boolean {
    return Platform.OS === 'android';
  },

  /**
   * 判断是否是ios
   * @returns {boolean}
   */
  isIOS(): boolean {
    return !KIT.isAndroid();
  },

  /**
   * 版本检测
   */
  versionCheck: VersionCheck,

  /**
   * 将module flat化
   */
  flatModules: flatModules,

  /**
   * 截取两位小数;
   */
  toFixed2: _toFixed2,

  /**
   * 四舍五入两位小数;
   */
  toRound2: _toRound2,

  /**
   * 格式成大单位显示; 如: 4箱2件 即1箱零4件;
   */
  formatUnitStr: _formatUnitStr,

  /**
   * 大小单位关系; 如: 1箱=50件;
   */
  formatUnitStr2: _formatUnitStr2,

  /**
   * 转换图片格式, ios(jpg), android(webp)
   */
  getWebp: _getWebp,


  /**
   * 获取阶梯价中实际购买价格;
   */
  getPriceInAreaPrice: _getPriceInAreaPrice,

};

export default KIT;
