import React, { Component } from 'react';
import { Layout, Button,Avatar, Popconfirm } from 'antd';
const { Header, Content } = Layout;
import { Redirect } from 'react-router';
import styles from '../less/layout.less';
import multipleClass from '../helpers/multiple_class';
import SiderTree from '../components/sider_tree';
import { observer } from 'mobx-react';
import globalStore from '../stores/global';
import history from '../history';
import DocumentTitle from 'react-document-title';
@observer
class BasicLayout extends Component{
	state = {
		doLogout: false
	};
	render(){
		let { children, title } = this.props;
		let { doLogout } = this.state;
		let { username } = globalStore;
		return (
			<Layout className={multipleClass(styles, 'layout')}>
				<Header className={multipleClass(styles, 'no-padding')}>
					<div className={multipleClass(styles, 'header')}>
						<div style={{float: 'left'}}>
							<Button onClick={() => history.push('/')}>预约管理</Button>
              <Button style={{marginLeft: 20}} onClick={() => history.push('/wechat/config')}>微信自定义菜单</Button>
						</div>
						<div className={multipleClass(styles, 'header-right')}>
							<Popconfirm placement='bottomRight' onConfirm={this.doLogout} cancelText='取消' okText='确认' title='是否确认退出登录？'>
								{/*<Avatar src='http://www.iconpng.com/png/winter_lollipop/heart.png'/>*/}
								<span className={multipleClass(styles, 'user-name')}>{username}</span>
							</Popconfirm>
						</div>
					</div>
				</Header>
				<Content style={{height: 'calc(100% - 64px)', minHeight: 'calc(100% - 64px)',paddingTop: '24px', position: 'relative'}}>
					<div className={multipleClass(styles, 'flex content')} style={{minHeight: `${document.documentElement.clientHeight-90}px`}}>
						<SiderTree/>
						<div className={multipleClass(styles, 'main')}>
							<h3 className={multipleClass(styles, 'page-title')}>{title}</h3>
							<div className={multipleClass(styles, 'page-main')}>
								{children}
							</div>
						</div>
					</div>
				</Content>
				{ doLogout ? <Redirect to='/login' push={true}/> : null }
			</Layout>
		)
	}
	doLogout = () => {
		this.setState({
			doLogout: true
		}, () => {
			this.setState({
				doLogout: false
			})
		})
	}
}
export default BasicLayout;