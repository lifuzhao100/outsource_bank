import React, { Component } from 'react';
import { Button, Table, Input, Avatar, message } from 'antd';
const Search = Input.Search;
import axios from 'axios';
import getToken from '../../helpers/get_token';
import { SIZE } from '../../config/CONSTANT';
import store from '../../stores/bank_bind';
import { observer } from 'mobx-react';
@observer
class BankBind extends Component{
	render(){
		let total = store.total;
		let dataSource = Array.from(store.user_list);
		return (
			<React.Fragment>
				<div style={{paddingBottom: '24px', textAlign: 'right'}}>
					<Search placeholder='请输入搜索关键字' onSearch={this.handlePressEnter} style={{width: 200}}/>
				</div>
				<Table columns={this.columns} dataSource={dataSource} rowKey='id' pagination={total > SIZE ? { onChange: page => this.getUserList(page) } : false}/>
			</React.Fragment>
		)
	}
	componentDidMount(){
		this.getUserList();
	}
	getUserList = (page = 1) => {
		let token = getToken();
		if(token){
			axios.get('/api/v1/users', {
				params: {
					page,
					size: SIZE,
					key: store.key
				}
			}, {headers:{token}})
				.then(res => {
					let resData = res.data;
					store.user_list = resData.data;
				})
				.catch(res => {
					message.error(res.data.msg);
				})
		}
	};
	handlePressEnter = val => {
		store.key = val;
		this.getUserList();
	} ;
	bindAdmin = (openid, record) => {
		if(!record.name){
			message.error('请输入管理员真实姓名');
			return ;
		}
		let token = getToken();
		let { match:{params:{id}}} = this.props;
		if(token){
			axios.post('/api/v1/bank/bind', {
				bank_id: id,
				openid: openid,
				name: record.name
			}, {headers:{token}})
				.then(res => {
					let resData = res.data;
					if(resData.error_code === 0 || resData.errorCode === 0){
						this.props.history.push('/bank/config');
					}
				})
		}
	};
	columns = [{
		title: '头像',
		dataIndex: 'headimgurl',
		key: 'headimgurl',
		render: url => <Avatar src={url} size='large' shape='square' style={{margin: '-50px 0'}}/>
	}, {
		title: '昵称',
		dataIndex: 'nickname'
	}, {
		title: '真实姓名',
		render: (tex, record) => {
			let bind = record.bind || [];
			let bindItem = Array.from(bind)[0] || {};
			return !!bindItem.user_name ? bindItem.user_name : <Input style={{width: 150}} placeholder='管理员真实姓名' onChange={(e) => record.name = e.target.value}/>

		}
	},{
		title: '操作',
		dataIndex: 'openid',
		key: 'openid',
		render: (openid, record) => !record.bind || !record.bind.length ? <a onClick={() => this.bindAdmin(openid, record)}>绑定</a> : null
	}]
}
export default BankBind;