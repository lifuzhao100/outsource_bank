import React, { Component } from 'react';
import { Table, Button, Modal, Form, Input, Radio, message } from 'antd';
import { observer } from 'mobx-react';
const { TextArea } = Input;
import styles from  '../../less/index.config.less';
import modalStyle from '../../less/modal_common.less';
import multipleClass from '../../helpers/multiple_class';
import store from '../../stores/service.config';
import getToken from '../../helpers/get_token';
import haveError from '../../helpers/have_error';
import axios from 'axios';
class AddService extends Component{
	render(){
		let { visible, form } = this.props;
		let { getFieldDecorator } = form;
		return (
			<Modal onCancel={this.closeModal} width={800} visible={visible} destroyOnClose={true} okText='确认' onOk={this.confirm} cancelText='取消' title={<p className={multipleClass(modalStyle, 'modal-title')}>新增服务<small>填写服务类别与内容</small></p>}>
				<Form>
					<Form.Item label='预约金额' labelCol={{span: 6}} wrapperCol={{span: 14}}>{getFieldDecorator('money', {
						initialValue: '1',
						rules: [{
							required: true,
							message: '请选择是否需要预约金额'
						}]
					})(
						<Radio.Group>
							<Radio value='1'>需要</Radio>
							<Radio value='2'>不需要</Radio>
						</Radio.Group>
					)}</Form.Item>
					<Form.Item label='服务类别' labelCol={{span: 6}} wrapperCol={{span: 12}}>{getFieldDecorator('category', {
						rules: [{
							required: true,
							message: '请输入服务类别'
						}]
					})(
						<Input placeholder='请输入服务类别'/>
					)}</Form.Item>
					<Form.Item label='服务内容' labelCol={{span: 6}} wrapperCol={{span: 14}}>{getFieldDecorator('item', {
						rules: [{
							required: true,
							message: '请输入服务内容'
						}]
					})(
						<TextArea autosize={{minRows: 5}} placeholder='服务内容有多项时，用“/”隔开'/>
					)}</Form.Item>
				</Form>
			</Modal>
		)
	}
	confirm = () => {
		this.props.form.validateFields();
		let errors = this.props.form.getFieldsError();
		if(!haveError(errors)){
			let token = getToken();
			if(token){
				let values = this.props.form.getFieldsValue();
				axios.post('/api/v1/service/save', {
					token,
					...values
				})
					.then(res => {
						let resData = res.data;
						store.serviceList.push({
							id: resData.id,
							...values,
							item: values.item.split('/')
						});
						this.closeModal();
					})
					.catch(res => {
						let resData = res.data;
						message.error(resData.msg);
					})
			}
		}
	};
	closeModal = () => {
		store.visible = false;
	}
}
const AddModalWithForm = Form.create()(AddService);
@observer
class ServiceConfig extends Component{
	render(){
		let { visible, serviceList } = store;
		let dataSource = Array.from(serviceList);
		return (
			<React.Fragment>
				<div style={{textAlign: 'right', paddingBottom: '24px'}}>
					<Button type='primary' onClick={this.openModal}>新增</Button>
				</div>
				<Table columns={this.columns} dataSource={dataSource} rowKey='id'/>
				<AddModalWithForm visible={visible}/>
			</React.Fragment>
		)
	}
	componentDidMount(){
		this.getServiceList();
	}
	getServiceList = () => {
		let token = getToken();
		if(token){
			axios.get('/api/v1/service/services', {
				params: {
					token: token
				}
			})
				.then(res => {
					let resData = res.data;
					store.serviceList = resData;
				})
				.catch(res => {
					let resData = res.data;
					message.error(resData.msg);
				})
		}
	};
	openModal = () => {
		store.visible = true;
	};
	deleteItem = (record) => {
		Modal.confirm({
			title: '删除服务',
			content: <p>将删除<strong>{record.category}</strong>(id:{record.id})，请确认</p>,
			okText: '确认',
			cancelText: '取消',
			onOk: () => {
				let token = getToken();
				if(token){
					axios.post('/api/v1/service/delete', {
						id: record.id,
						token
					})
						.then(res => {
							let resData = res.data;
							if(resData.errorCode === 0){
								let { serviceList } = store;
								let list = Array.from(serviceList).filter(service => service.id !== record.id);
								store.serviceList = list;
							}
						})
						.catch(res => {})
				}
			}
		})
	};
	columns = [{
		title: '服务类别',
		key: 'category',
		dataIndex: 'category'
	}, {
		title: '服务内容',
		key: 'item',
		dataIndex: 'item',
		render: (item) => <span>{item.join('/')}</span>
	}, {
		title: '预约金额',
		dataIndex: 'money',
		key: 'money',
		render: (money) => money === 1 ? '需要' : '不需要'
	},{
		title: '操作',
		key: 'id',
		dataIndex: 'id',
		render: (id, record) => <a onClick={() => this.deleteItem(record)}>删除</a>
	}]
}

export default ServiceConfig;