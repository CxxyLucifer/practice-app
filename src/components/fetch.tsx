/**
 * @flow
 */
('use strict');

import { Platform } from 'react-native';
import { msg } from 'plume2';
import assign from 'object-assign';
import config from './config';
import Toast from './toast';

/**
 * 定义返回的数据类型
 * 主要是为了将promise和async/await结合起来，做到既可以通过msg做通用的错误处理
 * 也可以在调用方判断是否发生了错误
 * Usage:
 * import {fetch} from 'qmkit';
 *
 *  async function fetchUser(url) {
 *     const { data, err } = await fetch(url);
 *     if (err) {}
 *  }
 */

/**
 * dispatch
 *
 * @res fetch获取的response
 */
function dispatch(res, showMsg): Result {
	const { status, message } = res;
	let dataResult = { err: null, res: {} };
	switch (status) {
		case 2:
			if (showMsg == 'true') {
				Toast.fail(res.message);
			}
			dataResult = { res: res.data, err: new Error('serverError') };
			break;
		case 1:
			dataResult = { res: res.data, err: null };
			break;
		case -1:
		case -2:
			if (showMsg == 'true') {
				Toast.fail(res.message);
			}
			dataResult = { res: res.data, err: new Error('serverError') };
			break;
		case -4:
			if (showMsg == 'true') {
				Toast.fail(`${message || '网络好像不太好使!'}`);
			}
			dataResult = { res: res.data, err: new Error('serverError') };
			break;
		case -5:
			if (showMsg == 'true') {
				Toast.fail(`${message || '加班太多,体力跟不上了.(･･;)'}`);
			}
			dataResult = { res: res.data, err: new Error('serverError') };
			break;
		default:
			// 其它异常交给调用者自己外理;
			dataResult = { res: res, err: null };
			break;
	}

	return dataResult;
}

/**
 * fetchPromise
 */
function fetchPromise(url: string, req?: any): Promise<any> {
	const versionMap = {
		ios: config.iOS_STORE_VERSION,
		android: config.ANDROID_VERSION,
	};

	//let sign = md5(`secret${req.body}`);
	// let auth = '108279c20e454eb7adc490cad4f395d4';
	const myWindow: any = window;
	// let auth = myWindow.d2pRequestParam && myWindow.d2pRequestParam.sessionId;

	let auth = myWindow.token ? myWindow.token : '4dc62ff44ff94188844c98a62fefc654';
	// let auth = '108e3fdff9d24fdc8ab4e39b3166edaf';  不要删除本行注释!!!!!!

	if (!auth) {
		Toast.fail('获取不登录信息, 请重新登录');
		return;
	}

	//判断是不是上传图片
	const contentType = req && req.isUpload ? 'multipart/form-data' : 'application/json; charset=utf-8';

	const request = {
		method: 'GET',
		headers: {
			//'Sign': sign,
			Accept: 'application/json; charset=utf-8',
			'Content-Type': contentType,
			systemId: '0033',
			credentials: 'omit', // app 不要cookie, 否则api请求失败后一直失败;
			Authorization: auth,
			//'Authorization': 'JWT ' + (window.token || ''),
			Platform: Platform.OS,
			//'Version': versionMap[Platform.OS]
		},
	};

	let merge = assign({}, request, req);
	const showMsg = merge.showMsg || 'true';
	delete merge.showMsg;

	if (__DEV__) {
		//console.log(`fetch url: ${url}`);
		//console.log(`--->fetch params: ${JSON.stringify(merge)}`);
	}

	return new Promise(resolve => {
		//增加http的超时机制
		const timeout = merge.timeout || config.HTTP_TIME_OUT || 10,
			timeoutId = setTimeout(() => {
				Toast.fail('您的网络不给力');
				resolve({ res: {}, err: new Error('timeout') });
			}, timeout * 1000);

		//开始获取数据
		fetch(url, merge)
			.then(res => {
				clearTimeout(timeoutId);
				return res.json();
			})
			.then(res => {
				//if (__DEV__) {  // TODO 需要查日志先去掉
				console.log(url, merge, res);
				//}
				resolve(dispatch(res, showMsg));
			})
			.catch(err => {
				clearTimeout(timeoutId);
				if (__DEV__) {
					console.log(err);
				}
				Toast.fail('您的网络不给力');
				//TODO: 血的教训
				//是应用层使用的时候一定用then，不要直接用done
				//done会导致整个进程crash掉。
				resolve({ res: {}, err: err });
			});
	});
}

export default fetchPromise;
