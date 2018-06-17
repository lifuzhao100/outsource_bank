import React, { Component } from 'react';
import { Table, Button, Modal, Form, Avatar, Upload, Icon, Input, message } from 'antd';
import styles from  '../../less/index.config.less';
import modalStyle from '../../less/modal_common.less';
import multipleClass from '../../helpers/multiple_class';
import { observer } from 'mobx-react';
import { autorun } from 'mobx';
import store from '../../stores/bank.config';
import axios from 'axios';
import getToken from '../../helpers/get_token';
import { SIZE } from '../../config/CONSTANT';
import history from '../../history';
import haveError from "../../helpers/have_error";
@observer
class AddBank extends Component{
	init = {};
	render(){
		let { visible, form } = this.props;
		let { getFieldDecorator } = form;
		let { logo, modalLoading } = store;
		let init = this.init;
		let modalTitle = this.props.selectItem ? '编辑' : '新增';
		return (
			<Modal
				visible={visible}
				destroyOnClose={true}
				confirmLoading={modalLoading}
				onCancel={this.closeModal}
				okText='确认'
				onOk={this.confirm}
				cancelText='取消'
				title={<p className={multipleClass(modalStyle, 'modal-title')}>{modalTitle}银行<small>填写银行信息</small></p>}>
				<Form>
					<Form.Item wrapperCol={{push: 6,span: 10}}>{getFieldDecorator('logo', {
						initialValue: init.logo,
						rules: [{
							required: true,
							message: '请上传银行logo'
						}]
					})(
						<Upload
							name="avatar"
							listType="picture-card"
							className="avatar-uploader"
							showUploadList={false}
							beforeUpload={(file) => this.handlePreview(file)}
						>
							{!!logo ? <img src={logo} style={{width: '100%'}}/> : (
								<div>
									<Icon type='plus' />
									<div className="ant-upload-text">Upload</div>
								</div>
							)}
						</Upload>
					)}</Form.Item>
					<Form.Item label='银行名称' labelCol={{span: 6}} wrapperCol={{span: 14}}>{getFieldDecorator('name', {
						initialValue: init.name,
						rules: [{
							required: true,
							message: '银行名称不能为空'
						}]
					})(
						<Input placeholder='请输入银行名称'/>
					)}</Form.Item>
					<Form.Item label='银行地址' labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>{getFieldDecorator('address', {
						initialValue: init.address,
						rules: [{
							required: true,
							message: '银行地址不能为空'
						}]
					})(
						<Input placeholder='请输入银行地址'/>
					)}</Form.Item>
					{!!init.order ? (
						<Form.Item label='排序' labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>{getFieldDecorator('order', {
							initialValue: init.order,
							rules: [{
								required: true,
								message: '银行顺序不能为空'
							}]
						})(
							<Input placeholder='请输入银行顺序'/>
						)}</Form.Item>
					) : null }
				</Form>
			</Modal>
		)
	}
	componentWillReceiveProps(nextProps){
		let selectItem = nextProps.selectItem;
		if(selectItem){
			store.logo = selectItem.logo;
			this.init = {
				...selectItem
			};
		}else{
			this.init = {};
		}
	}
	handlePreview = (file) => {
		let reader = new FileReader();
		reader.onload = () => {
			store.logo = reader.result;
		};
		reader.readAsDataURL(file);
		return false;
	};
	confirm = () => {
		let { form, selectItem } = this.props;
		form.validateFields();
		let errors = form.getFieldsError();
		if(!haveError(errors)){
			let token = getToken();
			if(token){
				store.modalLoading = true;
				let {  name, address } = form.getFieldsValue();
				let { logo } = store;
				let dealLogo = logo.replace(/^data:.*base64,/, '');
				let params = {
					name,
					address
				};
				if(this.props.selectItem){//更新
					let isChangeLogo = /^data:.*base64,/.test(logo);//判断有没有修改logo
					if(isChangeLogo){
						params.logo = dealLogo;
					}
					params.id = selectItem.id;
					axios.post('/api/v1/bank/update', params, {
						headers: {
							token
						}
					})
						.then(res => {
							this.closeModal();
						})
						.catch(res => {
							store.modalLoading = false;
							message.error(res.data.msg);
						});
				}else{
					params.logo = dealLogo;
					axios.post('/api/v1/bank/save', params, {headers: {token}})
						.then(res => {
							this.closeModal();
						})
						.catch(res => {
							store.modalLoading = false;
							message.error(res.data.msg);
						})
				}
			}
		}
	};
	closeModal = () => {
		store.visible = false;
		store.logo = '';
		store.modalLoading = false;
		store.selectItem = null;
	}
}
const AddBankWithForm = Form.create()(AddBank);
@observer
class BankConfig extends Component{
	page = 1;
	render(){
		let { visible, bank_list, tableLoading, total, selectItem } = store;
		let dataSource = Array.from(bank_list);
		let current = this.page;
		return (
			<React.Fragment>
				<div style={{paddingBottom: '24px', textAlign: 'right'}}>
					<Button type='primary' onClick={this.openModal}>新增</Button>
				</div>
				<Table columns={this.columns} dataSource={dataSource} rowKey='id' loading={tableLoading} pagination={total > SIZE ? {total, pageSize: SIZE, current, onChange: page => this.getBankList(page)} : false }/>
				<AddBankWithForm visible={visible} selectItem={selectItem}/>
			</React.Fragment>
		)
	}
	componentDidMount(){
		autorun(() => {
			if(!store.visible){
				this.getBankList();
			}
		});
	}
	getBankList = (page = 1) => {
		let token = getToken();
		this.page = page;
		if(token){
			store.tableLoading = true;
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
					let resData = res.data || [];
					let { data, total } = resData;
					store.bank_list = data;
					store.total = total;
					store.tableLoading = false;
				})
				.catch(res => {
					store.tableLoading = false;
				})
		}
	};

	openModal = () => {
		store.visible = true;
	};
	editBank = record => {
		this.openModal();
		store.selectItem = record;
	};
	bindAdmin = id => {
		history.push(`/bank/bind/${id}`);
	};
	unbindAdmin = record => {
		Modal.confirm({
			title: '解绑管理员',
			content: <p>将解除管理员<strong>{record.user.real_name}</strong>与<strong>{record.name}</strong>的绑定关系，请确认</p>,
			okText: '确认',
			cancelText: '取消',
			onOk: () => {
				store.tableLoading = true;
				let token = getToken();
				if(token){
					axios.get('/api/v1/bank/untie', {
						params: {
							bind_id: record.user.id
						}
					}, {headers: {token}})
						.then(res => {
							store.tableLoading = false;
							this.getBankList();
						})
						.catch(res => {
							store.tableLoading = false;
						});
				}
			}
		})
	};
	changeState = (id, state) => {
		let token = getToken();
		if(token){
			axios.post('/api/v1/bank/state', {
				state,
				id
			}, {
				headers: {
					token
				}
			})
				.then(res => {
					this.getBankList();
				})
				.catch(res => {
					message.error(res.data.msg);
				})
		}
	};
	columns = [{
		key: 'id',
		title: 'ID',
		dataIndex: 'id'
	}, {
		key: 'order',
		title: '顺序',
		dataIndex: 'order'
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
		render: (user, record) => user && user.real_name || <a onClick={() => this.bindAdmin(record.id)}>绑定管理员</a>
	}, {
		title: '操作',
		render: (text, record) => (
			<div className={multipleClass(styles, 'operate')}>
				<a onClick={() => this.editBank(record)}>编辑</a>
				{/*
				1表示启用中
				2表示已停用
				*/}
				<a onClick={() => this.changeState(record.id , record.state === 1 ? '2' : '1')}>{record.state === 1 ? '停用' : '启用'}</a>
				{record.user ? <a onClick={() => this.unbindAdmin(record)}>解绑管理员</a> : null}
			</div>
		)
	}]
}
export default BankConfig;