import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import routes from '../routes_mobile';
import handleRoutes from '../helpers/handle_routes';
const routeArr = handleRoutes(routes);
import history from '../history';
class App extends Component{
	render(){
		return (
			<Switch>{
				routeArr.map(({path, Component, exact}) => <Route key={path} exact={!!exact} path={path} render={(props) => <Component {...props}/>}/>)
			}</Switch>
		)
	}
	componentDidMount(){
		let appid = 'wxf4b7d664b2461f4b';
		let redirect_uri = 'http://bank.mengant.cn/index.html';
		let url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;
		let { location } = history;
		for(let key in location){
			alert(key + ':' +location[key]);
		}
		window.location = url;
		return ;
		if(location.search){
			console.log(location);
			let search = location.search.slice(1);
			let params = search.split('&');
			let param = {};
			params.forEach(p => {
				let keyValue = p.split('=');
				let key = keyValue[0];
				let value = keyValue[1];
				param[key] = value;
			});
			if(!params.code){
				window.location = url;
			}else{
				alert(params.code);
			}
		}else{
			window.location = url;
		}
	}
}
export default App;