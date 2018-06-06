import React from 'react';
import Wrapper  from '../components/wx_wrapper';
let handleRoutes = (routes) => {
	return routes.map(route => {
		let newRoute = {
			...route
		};
		newRoute.Component = (props) => <Wrapper component={route.component} title={route.title} {...props}/>;
		return newRoute;
	})
};
export default handleRoutes;