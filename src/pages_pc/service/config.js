import React, { Component } from 'react';
import { Table, Button, Modal, Form, Input, Radio, message, TimePicker, InputNumber } from 'antd';
import { observer } from 'mobx-react';
import { autorun } from 'mobx';
const { TextArea } = Input;
import styles from  '../../less/service_config.less';
import modalStyle from '../../less/modal_common.less';
import multipleClass from '../../helpers/multiple_class';
import store from '../../stores/service.config';
import getToken from '../../helpers/get_token';
import haveError from '../../helpers/have_error';
import axios from 'axios';
import moment from 'moment';
//增加与修改service
@observer
class AddNEditService extends Component{
	render(){
		let { visible, form, editType } = this.props;
		let { getFieldDecorator, getFieldsValue, isFieldTouched } = form;
		let { editItem, modalLoading, time_begin, time_end } = store;
		let inits = {
			time_begin: time_begin,
			time_end: time_end,
			money: '1',
			category: '',
			item: '',
			money_type: '1'
		};
		let showOrder = false;
		if(editType === 'edit'){
			showOrder = true;
			inits.order = editItem.order;
			inits.time_begin = time_begin;
			inits.time_end = time_end;
			inits.money = '' + editItem.money;
			inits.category = editItem.category;
			inits.item = editItem.item.join('/');
			let money_type = editItem.money_type ? '' + editItem.money_type : '1';
			inits.money_type = money_type;
		}
		let money;
		if(isFieldTouched('money')){
			money = getFieldsValue(['money']).money;
		}else{
			money = inits.money;
		}
		let showMoneyType =  money === '1';
		return (
			<Modal
				confirmLoading={modalLoading}
				onCancel={this.closeModal}
				width={800}
				visible={visible}
				destroyOnClose={true}
				okText='确认'
				onOk={this.confirm}
				cancelText='取消'
				title={<p className={multipleClass(modalStyle, 'modal-title')}>{editType === 'add' ? '新增' : '编辑'}服务<small>填写服务类别与内容</small></p>}>
				<Form>
					<Form.Item label='预约受理时间' labelCol={{span: 6}} wrapperCol={{span: 14}}>{getFieldDecorator('times', {
						initialValue: inits.times,
						rules: [{
							required: true,
							message: '请选择预约受理时间'
						}]
					})(
						<React.Fragment>
							<TimePicker onChange={time => store.time_begin = time} allowEmpty={false} format='mm:ss' defaultValue={inits.time_begin}/> - <TimePicker format='mm:ss' allowEmpty={false} defaultValue={inits.time_end} onChange={time => store.time_end = time}/>
						</React.Fragment>
					)}</Form.Item>
					<Form.Item label='预约金额' labelCol={{span: 6}} wrapperCol={{span: 14}}>{getFieldDecorator('money', {
						initialValue: inits.money,
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
					{!showMoneyType ? null : 
						<Form.Item label='预约金额类型' labelCol={{span: 6}} wrapperCol={{span: 14}}>{getFieldDecorator('money_type', {
							initialValue: inits.money_type,
							rules: [{
								required: true,
								message: '请选择预约金额类型'
							}]
						})(
							<Radio.Group>
								<Radio value='1'>大额预约</Radio>
								<Radio value='2'>小额预约</Radio>
							</Radio.Group>
						)}</Form.Item>
					}
					{!showOrder ? null : 
						<Form.Item label='排序' labelCol={{span: 6}} wrapperCol={{span: 12}}>{getFieldDecorator('order', {
							initialValue: inits.order,
							rules: [{
								required: true,
								message: '请输入服务排序'
							}, {
								pattern: /[1-9][0-9]*/,
								message: '服务排序最小值为1'
							}]
						})(
							<InputNumber placeholder='请输入服务排序'/>
						)}</Form.Item>
					}
					<Form.Item label='服务类别' labelCol={{span: 6}} wrapperCol={{span: 12}}>{getFieldDecorator('category', {
						initialValue: inits.category,
						rules: [{
							required: true,
							message: '请输入服务类别'
						}]
					})(
						<Input placeholder='请输入服务类别'/>
					)}</Form.Item>
					<Form.Item label='服务内容' labelCol={{span: 6}} wrapperCol={{span: 14}}>{getFieldDecorator('item', {
						initialValue: inits.item,
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
		this.props.form.validateFields(['money', 'money_type', 'category', 'item', 'order']);
		let errors = this.props.form.getFieldsError(['money', 'money_type', 'category', 'item','order']);
		if(!haveError(errors)){
			store.modalLoading = true;
			let token = getToken();
			if(token){
				let values = this.props.form.getFieldsValue();
				let { time_begin, time_end } = store;
				if(values.money === '2'){//不需要预约金额
					delete values.money_type;
				}
				values.time_begin = time_begin.format('mm:ss');
				values.time_end = time_end.format('mm:ss');
				if(this.props.editType === 'add'){
					axios.post('/api/v1/service/save', {
						...values
					}, {
						headers: {
							token
						}
					})
						.then(res => {
							this.closeModal();
						})
						.catch(res => {
							store.modalLoading = false;
							let resData = res.data;
							message.error(resData.msg);
						})
				}else{
					let id = store.editItem.id;
					axios.post('/api/v1/service/update', {
						...values,
						id: id
					},{
						headers: {
							token
						}
					})
						.then(res => {
							let resData = res.data;
							if(resData.error_code === 0 || resData.errorCode === 0){
								this.closeModal();
							}
						})
						.catch(res => {
							store.modalLoading = false;
							let resData = res.data;
							message.error(resData.msg);
						})
				}
			}
		}
	};
	closeModal = () => {
		store.visible = false;
		store.editItem = {};
		store.time_begin = moment('08:00', 'mm:ss');
		store.time_end = moment('15:00', 'mm:ss');
		store.modalLoading = false;
	}
}
const AddNEditServiceWithForm = Form.create()(AddNEditService);

//service列表
@observer
class ServiceConfig extends Component{
	render(){
		let { visible, service_list, editType } = store;
		let dataSource = Array.from(service_list);
		return (
			<React.Fragment>
				<div style={{textAlign: 'right', paddingBottom: '24px'}}>
					<Button type='primary' onClick={this.openModal}>新增</Button>
				</div>
				<Table columns={this.columns} dataSource={dataSource} rowKey='id' pagination={false}/>
				<AddNEditServiceWithForm visible={visible} editType={editType}/>
			</React.Fragment>
		)
	}
	componentDidMount(){
		autorun(() => {
			if(!store.visible){
				this.getServiceList();
			}
		})
	}
	getServiceList = page => {
		let token = getToken();
		if(token){
			axios.get('/api/v1/service/services', {
				params: {}
			}, {
				headers: {
					token
				}
			})
				.then(res => {
					let resData = res.data;
					resData.sort((a,b) => a.order - b.order);
					store.service_list = resData;
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
	editItem = record => {
		store.editItem = record;
		let time_begin = record.time_begin || '08:00:00';
		let time_end = record.time_end || '15:00:00';
		store.time_begin = moment(time_begin, 'mm:ss:SS');
		store.time_end = moment(time_end, 'mm:ss:SS');
		this.openModal();
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
						id: record.id
					}, {
						headers: {
							token: token
						}
					})
						.then(res => {
							let resData = res.data;
							if(resData.errorCode === 0 || resData.error_code === 0){
								let { service_list } = store;
								let list = Array.from(service_list).filter(service => service.id !== record.id);
								store.service_list = list;
							}
						})
						.catch(res => {})
				}
			}
		})
	};
	columns = [{
		title: '排序',
		key: 'order',
		dataIndex: 'order'
	},{
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
		render: (money) => parseInt(money) === 1 ? '需要' : '不需要'
	},{
		title: '操作',
		key: 'id',
		dataIndex: 'id',
		render: (id, record) => <div className={multipleClass(styles, 'operate')}>
			<a onClick={() => this.editItem(record)}>编辑</a>
			<a onClick={() => this.deleteItem(record)}>删除</a>
		</div>
	}]
}

export default ServiceConfig;