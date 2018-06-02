import React from 'react';
import Wrapper  from '../components/wrapper';
let handleRoutes = (routes) => {
	return routes.map(route => {
		let newRoute = {
			...route
		};
		newRoute.Component = (props) => <Wrapper component={route.component} {...props}/>;
		return newRoute;
	})
};
export default handleRoutes;