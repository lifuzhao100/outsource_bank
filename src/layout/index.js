import React, { Component } from 'react';
import { Layout, Button,Avatar, Popconfirm } from 'antd';
const { Header, Content } = Layout;
import styles from '../less/layout.less';
import multipleClass from '../helpers/multiple_class';
import SiderTree from '../components/sider_tree';
class BasicLayout extends Component{
	render(){
		let { children, title = '预约管理' } = this.props;
		return (
			<Layout className={multipleClass(styles, 'layout')}>
				<Header className={multipleClass(styles, 'no-padding')}>
					<div className={multipleClass(styles, 'header')}>
						<div style={{float: 'left'}}>
							<Button>预约管理</Button>
						</div>
						<div className={multipleClass(styles, 'header-right')}>
							<Popconfirm placement='bottomRight' cancelText='取消' okText='确认' title='是否确认退出登录？'>
								<Avatar src='http://www.iconpng.com/png/winter_lollipop/heart.png'/>
								<span className={multipleClass(styles, 'user-name')}>lifuzhao</span>
							</Popconfirm>
						</div>
					</div>
				</Header>
				<Content style={{height: 'calc(100% - 64px)',paddingTop: '24px'}}>
					<div className={multipleClass(styles, 'flex content')}>
						<SiderTree/>
						<div className={multipleClass(styles, 'main')}>
							<h3 className={multipleClass(styles, 'page-title')}>{title}</h3>
							<div className={multipleClass(styles, 'page-main')}>
								{children}
							</div>
						</div>
					</div>
				</Content>
			</Layout>
		)
	}
}
export default BasicLayout;