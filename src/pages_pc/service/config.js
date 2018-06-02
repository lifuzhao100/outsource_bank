import React, { Component } from 'react';
import { Table, Button, Modal, Form, Input, Radio } from 'antd';
import { observer } from 'mobx-react';
import BasicLayout from '../../layout/index';
const { TextArea } = Input;
import styles from  '../../less/index.config.less';
import modalStyle from '../../less/modal_common.less';
import multipleClass from '../../helpers/multiple_class';
import store from '../../stores/service.config';
class AddService extends Component{
	render(){
		let { visible } = this.props;
		return (
			<Modal onCancel={this.closeModal} width={800} visible={visible} title={<p className={multipleClass(modalStyle, 'modal-title')}>新增服务<small>填写服务类别与内容</small></p>}>
				<Form>
					<Form.Item label='预约金额' labelCol={{span: 6}} wrapperCol={{span: 14}}>
						<Radio.Group>
							<Radio value='1'>需要</Radio>
							<Radio value='2'>不需要</Radio>
						</Radio.Group>
					</Form.Item>
					<Form.Item label='服务类别' labelCol={{span: 6}} wrapperCol={{span: 12}}>
						<Input placeholder='请输入服务类别'/>
					</Form.Item>
					<Form.Item label='服务内容' labelCol={{span: 6}} wrapperCol={{span: 14}}>
						<TextArea autosize={{minRows: 5}} placeholder='服务内容有多项时，用“/”隔开'/>
					</Form.Item>
				</Form>
			</Modal>
		)
	}
	closeModal = () => {
		store.visible = false;
	}
}
const AddModalWithForm = Form.create()(AddService);
@observer
class ServiceConfig extends Component{
	render(){
		let { visible } = store;
		return (
			<BasicLayout title='银行配置'>
				<div style={{textAlign: 'right', paddingBottom: '24px'}}>
					<Button type='primary' onClick={this.openModal}>新增</Button>
				</div>
				<Table columns={this.columns}/>
				<AddModalWithForm visible={visible}/>
			</BasicLayout>
		)
	}
	openModal = () => {
		store.visible = true;
	};
	columns = [{
		title: '服务类别',
		key: 'type',
		dataIndex: 'type'
	}, {
		title: '服务内容',
		dataIndex: 'content'
	}, {
		title: '操作',
		key: 'operate',
		render: (text, record) => (
			<div>
				<a>删除</a>
			</div>
		)
	}]
}

export default ServiceConfig;