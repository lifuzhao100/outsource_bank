import React, { Component } from 'react';
import { Table, Button, Avatar, Modal, Input, Form, Upload, Icon, message, Tabs, Radio } from 'antd';
import styles from  '../../less/index.config.less';
import modalStyle from '../../less/modal_common.less';
import multipleClass from '../../helpers/multiple_class';
import getToken from '../../helpers/get_token';
import haveError from '../../helpers/have_error';
import store from '../../stores/index_config';
import { observer } from 'mobx-react';
import axios from 'axios';
import { SIZE } from "../../config/CONSTANT";
const { TabPane } = Tabs;
const carousel_key = '1';
const module_key = '2';
const carousel_word = '轮播图';
const module_word = '模块图';

@observer
class AddIndex extends Component{
	render(){
		let { modalLoading, selectItem, logo } = store;
		let { visible, form, editType } = this.props;
		let { getFieldDecorator, getFieldsValue, isFieldTouched } = form;
		let inits = {
			logo: '',
			url: '',
			type: module_key,
			index_type: '1'
		};
		let disabledRadio = false;//编辑时禁止切换图片类型
		if(editType === 'edit'){
			inits.logo = selectItem.logo;
			inits.url = selectItem.url;
			inits.type = '' + selectItem.type;
			let index_type = selectItem.index_type || '';
			inits.index_type = '' + index_type;
			disabledRadio = true;
		}
		if(!logo){
			logo = inits.logo;
		}
		let showIndexType;
		if(isFieldTouched('type')){
			showIndexType = getFieldsValue(['type']).type === module_key;
		}else{
			showIndexType = inits.type === module_key;
		}
		return (
			<Modal width={800} visible={visible} destroyOnClose={true} confirmLoading={modalLoading} onCancel={this.closeModal} cancelText='取消' onOk={this.confirm} okText='确认' title={<p className={multipleClass(modalStyle, 'modal-title')}>新建首页<small>上传首页图片和链接</small></p>}>
				<Form>
					<Form.Item wrapperCol={{push: 6,span: 10}}>{getFieldDecorator('logo', {
						initialValue: inits.logo,
						rules: [{required: true, message: '请选择图片'}]})(
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
					<Form.Item label='图片用途' labelCol={{span: 6}} wrapperCol={{span: 14}}>{getFieldDecorator('type', {
						initialValue: inits.type,
						rules: [{
							required: true,
							message: '请选择图片用途'
						}]
					})(
						<Radio.Group disabled={disabledRadio}>
							<Radio value={module_key}>{module_word}</Radio>
							<Radio value={carousel_key}>{carousel_word}</Radio>
						</Radio.Group>
					)}</Form.Item>
					{!showIndexType ? null : 
						<Form.Item label='模块图分类' labelCol={{span: 6}} wrapperCol={{span: 14}}>{getFieldDecorator('index_type', {
							initialValue: inits.index_type,
							rules: [{
								required: true,
								message: '请选择首页模块图分类'
							}]
						})(
							<Radio.Group>
								<Radio value={'1'}>电子银行业务</Radio>
								<Radio value={'2'}>银行预约分类</Radio>
								<Radio value={'3'}>公司业务</Radio>
							</Radio.Group>
						)}</Form.Item>
					}
					<Form.Item label='链接' labelCol={{span: 6}} wrapperCol={{span: 14}}>{getFieldDecorator('url', {
						initialValue: inits.url,
						rules: [{
							required: true,
							message: '请输入链接'
						}]
					})(
						<Input placeholder='请输入链接' autoComplete='off'/>
					)}</Form.Item>
				</Form>
			</Modal>
		)
	}
	componentWillReceiveProps(nextProps){

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
		this.props.form.validateFields();
		let errors = this.props.form.getFieldsError();
		console.log(errors);
		if(!haveError(errors)){
			let { url, type, index_type } = this.props.form.getFieldsValue();
			let { logo, selectItem } = store;
			let token = getToken();
			if(token){
				store.modalLoading = true;
				let params = {
					url: url
				};
				if(type === module_key){
					params.index_type = index_type;
				}
				if(!!selectItem.id){//修改
					if(logo){
						let dealLogo = logo.replace(/^data:.*base64,/, '');
						params.logo = dealLogo;
					}
					params.id = selectItem.id;
					axios.post('/api/v1/nav/update', params, {
						headers: {
							token: token
						}
					})
						.then(res => {
							store.modalLoading = false;
							let resData = res.data;
							if(resData.errorCode === 0 || resData.error_code === 0){
								let list = Array.from(store.indexList).map(item => {
									if(item.id === params.id){
										item.logo = logo || store.selectItem.logo;
										item.url = url
									}
									return item;
								});
								store.indexList = list;
							}
							this.closeModal();
						})
						.catch(res => {
							let resData = res.data;
							message.error(resData.msg);
						});
				}else{//新增
					let dealLogo = logo.replace(/^data:.*base64,/, '');
					params.logo = dealLogo;
					params.type = type;
					axios.post('/api/v1/nav/save', params, {
						headers:{
							token
						}
					})
						.then(res => {
							store.modalLoading = false;
							let resData = res.data;
							store.indexList.push({
								id: resData.id,
								logo: logo,
								url: url,
								state: 1
							});
							this.closeModal();
						})
						.catch(res => {
							store.modalLoading = false;
						})
				}

			}
		}
	};
	closeModal = () => {
		store.visible = false;
		store.logo = '';
		store.selectItem = {};
	}
}
const AddIndexWithForm = Form.create()(AddIndex);

@observer
class IndexConfig extends Component{
	constructor(props){
		super(props);
		store.activeTab = module_key;//默认模块图
		store.indexList = [];
	}
	render(){
		let { indexList, visible, editType, tableLoading, activeTab } = store;
		let dataSource = Array.from(indexList);
		let Main = (
			<React.Fragment>
				<Table columns={this.columns} dataSource={dataSource} rowKey='id' pagination={false} loading={tableLoading}/>
				<AddIndexWithForm visible={visible} editType={editType} />
			</React.Fragment>
		);
		return (
			<React.Fragment>
				<div className={multipleClass(styles, 'handle-bar')}>
					<div className={multipleClass(styles, 'bar-container')}>
						<Button type='primary' onClick={this.openModal}>新增</Button>
					</div>
				</div>
				{/*这里强行加一个tab*/}
				<Tabs defaultActiveKey={activeTab} onTabClick={this.clickTab}>
					<TabPane key={module_key} tab={module_word}>{Main}</TabPane>
					<TabPane key={carousel_key} tab={carousel_word}>{Main}</TabPane>
				</Tabs>
			</React.Fragment>
		)
	}
	componentDidMount(){
		this.getIndexList();
	}
	getIndexList = (page = 1) => {
		let token = getToken();
		if(token){
			let { activeTab } = store;
			store.tableLoading = true;
			axios.get('/api/v1/navs', {
				params: {
					page,
					size: SIZE,
					type: activeTab
				}
			}, {
				headers: {
					token: token
				}
			})
				.then(res => {
					let resData = res.data;
					store.indexList = resData.data;
					store.total = resData.total;
					store.tableLoading = false;
				})
				.catch(res => {
					store.tableLoading = false;
				})
		}
	};
	clickTab = (tab) => {
		store.activeTab = tab;
		this.getIndexList();
	};
	handleIndexConfigState = (e, record) => {
		e.preventDefault();
		let state = record.state;
		if(record.state === 1){//如果已经启用,则暂停使用
			state = 2;
		}else{
			state = 1;
		}
		let token = getToken();
		if(token){
			store.tableLoading = true;
			axios.post('/api/v1/nav/state', {
				state,
				id: record.id
			}, {headers:{token}})
				.then(res => {
					let list = Array.from(store.indexList).map(item => {
						if(item.id === record.id){
							item.state = state;
						}
						return item;
					});
					store.indexList = list;
					store.tableLoading = false;
				})
				.catch(res => {
					store.tableLoading = false;
				});
		}
	};
	editIndexConfig = (e, record) => {
		e.preventDefault();
		// record.logo = 'http://localhost:7000/imgs/banner.png';
		store.selectItem = record;
		this.openModal();
	};
	deleteIndexConfig(e,record){
		e.preventDefault();
		let token = getToken();
		if(token){
			store.tableLoading = true;
			axios.post('/api/v1/nav/state', {
				state: 3,
				id: record.id
			}, {headers:{token}})
				.then(res => {
					let list = Array.from(store.indexList).filter(item => {
						if(item.id === record.id){
							return false;
						}
						return true;
					});
					store.indexList = list;
					store.tableLoading = false;
				})
				.catch(res => {
					store.tableLoading = false;
				});
		}
	}
	openModal = () => {
		store.visible = true;
	};
	columns = [{
		title: 'ID',
		key: 'id',
		dataIndex: 'id'
	}, {
		title: '图片',
		key: 'logo',
		dataIndex: 'logo',
		render: (logo) => <Avatar src={logo} shape="square" size='large' style={{margin: '-50px 0'}}/>
	}, {
		title: '状态',
		key: 'state',
		dataIndex: 'state',
		render: (state) => {
			let states = ['', '启用中', '已停用'];
			return states[state];
		}
	}, {
		title: '链接',
		key: 'url',
		dataIndex: 'url'
	}, {
		title: '操作',
		key:' id',
		dataIndex: 'id',
		render: (id, record) => (
			<div className={multipleClass(styles, 'operate')}>
				<a onClick={(e) => this.handleIndexConfigState(e, record)}>{record.state === 1 ? '停用' : '启用'}</a>
				<a onClick={(e) => this.editIndexConfig(e, record)}>编辑</a>
				<a onClick={(e) => this.deleteIndexConfig(e, record)}>删除</a>
			</div>
		)
	}]
}
export default IndexConfig;