// import VConsole from 'vconsole';
// window.vConsole = new VConsole();
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import App from './pages_mobile/app';
import root from './helpers/create_root';
import './less/index.less';
let render = (Comp) => {
	ReactDOM.render(
		<HashRouter>
			<Comp/>
		</HashRouter>,
		root
	)
};
render(App);