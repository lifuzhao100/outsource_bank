import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import BasicLayout from '../../layout/index';
import styles from '../../less/renew.less';
import multipleClass from '../../helpers/multiple_class';
class Renew extends Component{
	render(){
		let { form } = this.props;
		let { getFieldDecorator } = form;
		return (
			<BasicLayout title='修改配置'>
				<div className={multipleClass(styles, 'renew')}>
					<Form>
						<Form.Item className={multipleClass(styles, 'form-item')}>{getFieldDecorator('email', {
							initialValue: 'lifuzhao@qq.com'
						})(
							<Input disabled={true}/>
						)}</Form.Item>
						<Form.Item className={multipleClass(styles, 'form-item')}>{getFieldDecorator('old_password')(
							<Input placeholder='旧密码'/>
						)}</Form.Item>
						<Form.Item className={multipleClass(styles, 'form-item')}>{getFieldDecorator('new_password')(
							<Input placeholder='新密码'/>
						)}</Form.Item>
						<Form.Item className={multipleClass(styles, 'form-item')}>{getFieldDecorator('repeat_password')(
							<Input placeholder='再次确认新密码'/>
						)}</Form.Item>
						<Form.Item className={multipleClass(styles, 'form-item')}>
							<Button type='primary' style={{width: '100%'}}>修改密码</Button>
						</Form.Item>
					</Form>
				</div>
			</BasicLayout>
		)
	}
}
export default Form.create()(Renew);