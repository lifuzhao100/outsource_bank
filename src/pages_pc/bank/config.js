import React, { Component } from 'react';
import { Table, Button, Modal, Form, Avatar, Upload, Icon, Input } from 'antd';
import styles from  '../../less/index.config.less';
import modalStyle from '../../less/modal_common.less';
import multipleClass from '../../helpers/multiple_class';
import { observer } from 'mobx-react';
import store from '../../stores/bank.config';
import axios from 'axios';
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
		axios.get('/api/v1/cms/banks', {
			params: {
				page,
				size: SIZE
			}
		})
			.then(res => {
				let resData = res.data || [];
				let { data, total } = resData;
				console.log(data);
				store.bank_list = data;
				store.total = total;
			})
			.catch(res => {

			})
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
		key: 'order',
		title: '预约上线',
		dataIndex: 'order'
	},{
		key: 'user',
		title: '管理员',
		dataIndex: 'user',
		render: user => user && user.real_name || <a>生成绑定链接</a>
	}, {
		title: '操作',
		render: (text, record) => (
			<div className={multipleClass(styles, 'operate')}>
				<a>停用</a>
				<a>解绑管理员</a>
			</div>
		)
	}]
}
export default BankConfig;