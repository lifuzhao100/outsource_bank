import axios from 'axios';
import getParam from './get_param';
let wxToken = (notForce, code) => {
	let origin = encodeURIComponent(location.href.split('#')[0]);
	let appid = 'wxf4b7d664b2461f4b';
	let requestURL = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${origin}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect;`
	//notForce true,上传code供后端获取用户信息 false,强制重新获取code
	if(!notForce){
		window.location = requestURL;
	}else{
		return new Promise((resolve, reject) =>{
			axios.get('/api/v1/token/user', {
				params: {
					code
				}
			})
				.then(res => {
					resolve(res);
				})
				.catch(res => {
					reject(res);
				})
		})
	}
};

let getWxToken = () => {
	//如果有code则上传
	let code = getParam().code;
	wxToken(!!code, code);
};
let refreshWxToken = () => {
	//强制重新获取code
	wxToken(false);
};
export {
	getWxToken,
	refreshWxToken
};