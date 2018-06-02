import React, { Component } from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import styles from '../less/sider_tree.less';
import multipleClass from '../helpers/multiple_class';
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
		return (
			<div className={multipleClass(styles, 'sider')}>
				<Menu>{this.menu.map(item => <Menu.Item key={item.path}><Link to={item.path}>{item.title}</Link></Menu.Item>)}</Menu>
			</div>
		)
	}
}
export default SiderTree;