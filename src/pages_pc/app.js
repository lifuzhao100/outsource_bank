import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import routes from '../routes_pc';
import handleRoutes from '../helpers/handle_routes';
const routeArr = handleRoutes(routes);
class App extends Component{
	render(){
		return(
			<Switch>{
				routeArr.map(({path, Component}) => <Route key={path} path={path} render={(props) => <Component {...props}/>}/>)
			}</Switch>
		)
	}
}
export default App;