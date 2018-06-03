import React, { Component } from 'react';
import { Menu } from 'antd';
import styles from '../less/sider_tree.less';
import multipleClass from '../helpers/multiple_class';
import history from '../history';
class SiderTree extends Component{
	menu = [{
		path: '/appointment/index',
		title: '全部预约'
	}, {
		path: '/index/config',
		title: '首页配置'
	}, {
		path: '/bank/config',
		title: '银行配置'
	}, {
		path: '/service/config',
		title: '服务配置'
	}, {
		path: '/account/renew',
		title: '修改密码'
	}];
	render(){
		let { location: { pathname }} = history;
		return (
			<div className={multipleClass(styles, 'sider')}>
				<Menu defaultSelectedKeys={[pathname]}>{this.menu.map(item => <Menu.Item key={item.path}><a onClick={(e) => this.go(e, item.path)}>{item.title}</a></Menu.Item>)}</Menu>
			</div>
		)
	}
	go = (e, path) => {
		e.preventDefault();
		history.push(path);
	}
}
export default SiderTree;