import React, { Component } from 'react';
import { Table, Button, Avatar, Modal, Input, Form, Upload, Icon, message} from 'antd';
import styles from  '../../less/index.config.less';
import modalStyle from '../../less/modal_common.less';
import multipleClass from '../../helpers/multiple_class';
import getToken from '../../helpers/get_token';
import haveError from '../../helpers/have_error';
import store from '../../stores/index_config';
import { observer } from 'mobx-react';
import axios from 'axios';
@observer
class AddIndex extends Component{
	render(){
		let { base64, loading, url } = store;
		let { visible, form } = this.props;
		let { getFieldDecorator } = form;
		return (
			<Modal visible={visible} destroyOnClose={true} confirmLoading={loading} onCancel={this.closeModal} cancelText='取消' onOk={this.confirm} okText='确认' title={<p className={multipleClass(modalStyle, 'modal-title')}>新建首页<small>上传首页图片和链接</small></p>}>
				<Form>
					<Form.Item wrapperCol={{push: 6,span: 10}}>{getFieldDecorator('logo', {
						initialValue: base64,
						rules: [{required: true, message: '请选择图片'}]})(
						<Upload
							name="avatar"
							listType="picture-card"
							className="avatar-uploader"
							showUploadList={false}
							beforeUpload={(file) => this.handlePreview(file)}
						>
							{base64 ? <img src={base64} style={{width: '100%'}}/> : (
								<div>
									<Icon type='plus' />
									<div className="ant-upload-text">Upload</div>
								</div>
							)}
						</Upload>
					)}</Form.Item>
					<Form.Item label='链接' labelCol={{span: 6}} wrapperCol={{span: 14}}>{getFieldDecorator('url', {
						initialValue: url,
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
		let { selectItem } = nextProps;
		//data:image/png;base64
		let reg = /^data:image\/.+;base64,/;
		if(selectItem.logo){
			if(reg.test(selectItem.logo)){//判断是不是base64
				store.base64 = selectItem.logo;
			}else{//判断是不是图片路径
				this.toBase64(selectItem.logo);
			}
			store.url = selectItem.url;
		} else{//新增

		}
	}
	toBase64 = (src) => {
		let canvas = document.createElement('canvas'),
			context = canvas.getContext('2d'),
			img = new Image();
		img.crossOrigin = 'Anonymous';
		img.onload = () => {
			context.drawImage(img, 0, 0);
			let dataURL = canvas.toDataURL('image/png');
			store.base64 = dataURL;
			canvas = null;
		};
		img.src = src;
	};
	handlePreview = (file) => {
		let reader = new FileReader();
		reader.onload = () => {
			store.base64 = reader.result;
		};
		reader.readAsDataURL(file);
		return false;
	};
	confirm = () => {
		this.props.form.validateFields();
		let errors = this.props.form.getFieldsError();
		if(!haveError(errors)){
			let values = this.props.form.getFieldsValue();
			let { base64 } = store;
			let token = getToken();
			if(token){
				store.loading = true;
				let params = {
					logo: base64,
					url: values.url
				};
				if(this.props.selectItem && this.props.selectItem.id){//修改
					params.id = this.props.selectItem.id;
					axios.post('/api/v1/nav/update', params)
						.then(res => {
							store.loading = false;
							let resData = res.data;
							if(resData.errorCode === 0){
								let list = Array.from(store.indexList).map(item => {
									if(item.id === params.id){
										item.logo = base64;
										item.url = values.url
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
					axios.post('/api/v1/nav/save', params)
						.then(res => {
							store.loading = false;
							let resData = res.data;
							store.indexList.push({
								id: resData.id,
								logo: store.base64,
								url: values.url,
								state: 1
							});
							this.closeModal();
						})
						.catch(res => {
							store.loading = false;
						})
				}

			}
		}
	};
	closeModal = () => {
		store.visible = false;
		store.selectItem = {};
	}
}
const AddIndexWithForm = Form.create()(AddIndex);
@observer
class IndexConfig extends Component{
	render(){
		let { indexList, visible, selectItem } = store;
		let dataSource = Array.from(indexList);
		return (
			<React.Fragment>
				<div style={{textAlign: 'right', paddingBottom: '24px'}}>
					<Button type='primary' onClick={this.openModal}>新增</Button>
				</div>
				<Table columns={this.columns} dataSource={dataSource} rowKey='id'/>
				<AddIndexWithForm visible={visible} selectItem={selectItem}/>
			</React.Fragment>
		)
	}
	componentDidMount(){
		this.getIndexList();
	}
	getIndexList = () => {
		let token = getToken();
		if(token){
			axios.get('/api/v1/navs', {
				params: {
					token
				}
			})
				.then(res => {
					let resData = res.data;
					store.indexList = resData;
				})
				.catch(res => {})
		}
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
			axios.post('/api/v1/nav/state', {
				state,
				id: record.id
			})
				.then(res => {
					let list = Array.from(store.indexList).map(item => {
						if(item.id === record.id){
							item.state = state;
						}
						return item;
					});
					store.indexList = list;
				})
				.catch(res => {});
		}
	};
	editIndexConfig = (e, record) => {
		e.preventDefault();
		// record.logo = 'http://localhost:7000/imgs/banner.png';
		store.selectItem = record;
		this.openModal();
	};
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
			</div>
		)
	}]
}
export default IndexConfig;