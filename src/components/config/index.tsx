/**
 * 定义系统的常量
 * @flow
 */

// api地址集合
const HOSTS = [
  'https://member-api.qianmi.com',  // 线上
  'http://172.21.34.134:8080',  // test1
  'http://172.19.67.199:8080',  // test2
  'http://172.21.33.39:8080',  // test3
  'http://172.19.68.119:8080',  // test4
  'http://172.21.33.2:8080',  // test5
  'http://172.19.67.9:8080',  // test0
  'http://127.0.0.1:9300', //dev
  'http://172.19.71.27:8080' //联调环境
];

// api地址集合
const D2P_HOSTS = [
  'https://d2p-api.1000.com',  // 线上
  'http://172.21.34.134:8080',  // test1
  'http://172.21.34.6:8080',  // test2
  'http://172.21.33.39:8080',  // test3
  'http://172.19.68.114:8080',  // test4
  'http://172.21.33.39:8080',  // test5
  'http://172.21.4.131:8080',  // test0
  'http://127.0.0.1:9300', //dev
  'http://172.21.4.131:8080',  // 联调环境
];


// 图片地址集合
const IMG_HOSTS = [
  'https://img.1000.com/qm-a-img/prod/',   // 线上
  'https://img.1000.com/qm-a-img/test1/',  // test1
  'https://img.1000.com/qm-a-img/test2/',  // test2
  'https://img.1000.com/qm-a-img/test3/',  // test3
  'https://img.1000.com/qm-a-img/test4/',  // test4
  'https://img.1000.com/qm-a-img/test5/',  // test5
  'https://img.1000.com/qm-a-img/test0/',  // test0
  'https://img.1000.com/qm-a-img/test0/',  //dev
  'https://img.1000.com/qm-a-img/testx/'   // 联调环境
];

/**
 *
 * PARENT_ID :
 * g上级编号, 为天天买及后面可能需要定制用户准备, 在自动打包中配置;
 * 不为空则App登录及找回密码需要输入上级编号地方部使用这里配置的编号, 上级编号输入界面隐藏
 */
let config = {

  iOS_STORE_VERSION: "0.0.1",

  ANDROID_VERSION: "0.0.1",

  // api地址
  HOST: "http://172.21.33.2:8080",

  D2P_HOST: 'http://d2p-api5.qianmi5.com:8080',

  HOSTS,

  D2P_HOSTS,

  // 图片地址
  IMG_HOST: 'https://img.qianmi.com/',

  IMG_HOSTS,

  PARENT_ID: "",

  //单位秒， 默认10秒
  HTTP_TIME_OUT: 10,

  //显示方式，默认显示方式
  SHOW_TYPE_DEFAULT: 'default',

  //显示方式，spu列表
  SHOW_TYPE_PRODUCT: 'product',

  //取消fetch
  hasCanceled_: false
};


export default config;
