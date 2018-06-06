import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import routes from '../routes_pc';
import handleRoutes from '../helpers/handle_routes';
const routeArr = handleRoutes(routes);
import BasicLayout from '../layout/index';
import { Redirect } from 'react-router';
class App extends Component{
	render(){
		return(
			<Switch>{
				routeArr.map(({path, Component, title, withoutNav}) => <Route key={path} path={path} render={(props) => {
					if(withoutNav) return <Component {...props}/>;
					return <BasicLayout title={title}><Component {...props}/></BasicLayout>;
				 }}/>)
			}
				<Route render={() => <Redirect to='/appointment/index'/>}/>
			</Switch>
		)
	}
}
export default App;