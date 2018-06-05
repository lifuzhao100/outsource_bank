import React, { Component } from 'react';
import { Table, Button, Modal, Form, Avatar, Upload, Icon, Input } from 'antd';
import styles from  '../../less/index.config.less';
import modalStyle from '../../less/modal_common.less';
import multipleClass from '../../helpers/multiple_class';
import { observer } from 'mobx-react';
import store from '../../stores/bank.config';
import axios from 'axios';
import getToken from '../../helpers/get_token';
import { SIZE } from '../../config/CONSTANT';
class AddBank extends Component{
	render(){
		let { bank_list } = store;
		let { visible, form } = this.props;
		let { getFieldDecorator } = form;

		return (
			<Modal visible={visible} onCancel={this.closeModal} title={<p className={multipleClass(modalStyle, 'modal-title')}>新建银行<small>填写银行信息</small></p>}>
				<Form>
					<Form.Item wrapperCol={{push: 6,span: 10}}>
						<Upload
							name="avatar"
							listType="picture-card"
							className="avatar-uploader"
							showUploadList={false}
							customRequest={this.chooseImg}
						>
							<img src="https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3864400085,1348845309&fm=58&bpow=300&bpoh=290"/>
							{/*<div>*/}
								{/*<Icon type='plus' />*/}
								{/*<div className="ant-upload-text">Upload</div>*/}
							{/*</div>*/}
						</Upload>
					</Form.Item>
					<Form.Item label='银行名称' labelCol={{span: 6}} wrapperCol={{span: 14}}>{getFieldDecorator('name', {
						required: true
					})(
						<Input placeholder='请输入'/>
					)}</Form.Item>
					<Form.Item label='预约上线' labelCol={{span: 6}} wrapperCol={{span: 14}}>{getFieldDecorator('book', {
						required: true
					})(
						<Input placeholder='请输入'/>
					)}</Form.Item>
				</Form>
			</Modal>
		)
	}
	chooseImg = (args) => {
		console.log(args);
	};
	closeModal = () => {
		store.visible = false;
	}
}
const AddBankWithForm = Form.create()(AddBank);
@observer
class BankConfig extends Component{
	render(){
		let { visible, bank_list } = store;
		let dataSource = Array.from(bank_list);
		return (
			<React.Fragment>
				<div style={{paddingBottom: '24px', textAlign: 'right'}}>
					<Button type='primary' onClick={this.openModal}>新增</Button>
				</div>
				<Table columns={this.columns} dataSource={dataSource}/>
				<AddBankWithForm visible={visible}/>
			</React.Fragment>
		)
	}
	componentDidMount(){
		this.getBankList();
	}
	getBankList = (page = 1) => {
		let token = getToken();
		if(token){
			axios.get('/api/v1/cms/banks', {
				params: {
					page,
					size: SIZE
				},
				headers: {
					token
				}
			})
				.then(res => {
					// let resData = res.data || [];
					let resData = {
						"total": 3,
						"per_page": "10",
						"current_page": 1,
						"last_page": 1,
						"data": [
							{
								"id": 3,
								"logo": "http://test.mengant.cn/static/imgs/67840FF6-AE4B-F6CF-D593-929DAD1BDC2D.jpg",
								"name": "银行1",
								"address": "地球路",
								"user": {
									"id": 2,
									"openid": "oFw780z5tKLo_C2uxuBqLSTmjmMw",
									"bank_id": 3,
									"real_name": "朱明良",
									"name": {
										"id": 3,
										"openid": "oFw780z5tKLo_C2uxuBqLSTmjmMw",
										"unionid": null,
										"nickname": "朱明良?",
										"sex": 1,
										"city": "铜陵",
										"country": "中国",
										"province": "安徽",
										"language": "zh_CN",
										"headimgurl": "http://thirdwx.qlogo.cn/mmopen/OgbF7oDeHreWPZjB0LYIFVF6lm7VUVG0GXFAJxxAy0Ohah1v3FiczrPOejGedFscmTbkAC3cLtMQRVjfSlUwibRFsXYwCy9WHd/132",
										"create_time": "2018-06-01 13:43:17",
										"last_update": "0000-00-00 00:00:00"
									}
								}
							},
							{
								"id": 2,
								"logo": "http://test.mengant.cn/static/imgs/81871337-8702-0F2A-BE4A-260BBC3D0F9E.jpg",
								"name": "北京路银行",
								"address": "北京路",
								"user": null
							},
							{
								"id": 1,
								"logo": "http://test.mengant.cn/static/imgs/26C48B51-4265-EC7B-78E7-9241222C2564.jpg",
								"name": "丰都银行",
								"address": "丰都路",
								"user": {
									"id": 1,
									"openid": "2",
									"bank_id": 1,
									"real_name": "朱明良",
									"name": {
										"id": 1,
										"openid": "2",
										"unionid": null,
										"nickname": "zml",
										"sex": 1,
										"city": null,
										"country": null,
										"province": null,
										"language": null,
										"headimgurl": null,
										"create_time": "2018-05-27 23:55:40",
										"last_update": "2018-05-27 23:55:43"
									}
								}
							}
						]
					};
					let { data, total } = resData;
					console.log(data);
					store.bank_list = data;
					store.total = total;
				})
				.catch(res => {

				})
		}
	};
	openModal = () => {
		store.visible = true;
	};
	columns = [{
		key: 'id',
		title: 'ID',
		dataIndex: 'id'
	}, {
		key: 'logo',
		title: 'logo',
		dataIndex: 'logo',
		render: (logo) => <Avatar src={logo} shape='square' size='large' style={{margin: '-50px 0'}}/>
	}, {
		key: 'name',
		title: '名称',
		dataIndex: 'name'
	}, {
		key: 'address',
		title: '地址',
		dataIndex: 'address'
	},{
		key: 'user',
		title: '管理员',
		dataIndex: 'user',
		render: user => user && user.real_name || <a>绑定管理员</a>
	}, {
		title: '操作',
		dataIndex: '',
		render: (text, record) => (
			<div className={multipleClass(styles, 'operate')}>
				<a>停用</a>
				<a>解绑管理员</a>
			</div>
		)
	}]
}
export default BankConfig;