// import VConsole from 'vconsole';
// window.vConsole = new VConsole();
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import App from './pages_mobile/app';
import root from './helpers/create_root';
import './less/mobile.less';
import history from "./history";
import './config/wx_config';
let render = (Comp) => {
	ReactDOM.render(
		<Router history={history}>
			<Comp/>
		</Router>,
		root
	)
};
render(App);