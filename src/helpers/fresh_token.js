import axios from 'axios';
import history from '../history';
let getCode = () => {
	let reg = new RegExp("(^|&)code=([^&]*)(&|$)");
	let result = location.search.substr(1).match(reg);
	if (result != null) return decodeURIComponent(result[2]);
	return null;
};
let wxToken = (notForce, code) => {
	// let origin = encodeURIComponent(location.href);
	let { location: { pathname }} = history;
	let origin = encodeURIComponent(`http://bank.mengant.cn/index.html#${pathname}`);
	let appid = 'wxf4b7d664b2461f4b';
	let requestURL = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${origin}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect;`
	//notForce true,上传code供后端获取用户信息 false,强制重新获取code
	if(!notForce){
		window.location = requestURL;
	}else{
		axios.get('/api/v1/token/user', {
			params: {
				code
			}
		})
			.then(res => {
				// alert(res.data);
			})
	}
};

let getToken = () => {
	//如果有code则上传
	let code = getCode();
	wxToken(!!code, code);
};
let refreshToken = () => {
	//强制重新获取code
	wxToken(false);
};
export {
	getToken,
	refreshToken
};