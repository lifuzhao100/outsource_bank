import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import routes from '../routes_mobile';
import handleRoutes from '../helpers/handle_wx_routes';
const routeArr = handleRoutes(routes);
import '../less/mobile.less';
class App extends Component{
	render(){
		return (
			<Switch>{
				routeArr.map(({path, Component, exact}) => <Route key={path} exact={!!exact} path={path} render={(props) => <Component {...props}/>}/>)
			}</Switch>
		)
	}
}
export default App;