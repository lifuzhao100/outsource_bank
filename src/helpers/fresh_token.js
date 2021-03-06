import axios from 'axios';
import getParam from './get_param';
import history from '../history';
let promise = null;

let wxToken = (notForce, code, state) => {
	let { location: {pathname} } = history;
	let removeHash = location.href.split('#')[0];
	let removeParams = removeHash.split('?')[0];
	let origin = encodeURIComponent(removeParams + '#' + pathname);
	let appId = window.appConfig.appId;
	let requestURL = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${origin}&response_type=code&scope=snsapi_userinfo&state=${state}#wechat_redirect`;
	//notForce true,上传code供后端获取用户信息 false,强制重新获取code
	if(!notForce){
		window.location = requestURL;
	}else{
		if(promise) return promise;
		promise = new Promise((resolve, reject) =>{
			axios.get('/api/v1/token/user', {
				params: {
					code
				}
			})
				.then(res => {
					promise = null;
					resolve(res);
				})
				.catch(res => {
					promise = null;
					reject(res);
				})
		});
		return promise;
	}
};

let getWxToken = (state = '') => {
	//如果有code则上传
	let code = getParam().code;
	// alert(code);
	if(location.host.indexOf('localhost') !== -1 || location.host.indexOf('127.0.0.1') !== -1) return new Promise((resolve, reject) => {
		reject();
	});
	return wxToken(!!code, code, state);
};
let refreshWxToken = () => {
	//强制重新获取code
	return wxToken(false);
};
export {
	getWxToken,
	refreshWxToken
};