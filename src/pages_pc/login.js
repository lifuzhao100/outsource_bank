import React, { Component } from 'react';
import styles from '../less/login.less';
import multipleClass from '../helpers/multiple_class';
import { Form, Input, Button } from 'antd';
class Login extends Component{
	render(){
		let { form } = this.props;
		let { getFieldDecorator } = form;
		return (
			<div className={multipleClass(styles, 'login-container flex flex-middle')}>
				<div className={multipleClass(styles, 'login flex')}>
					<h3 className={multipleClass(styles, 'login-title inline-flex flex-middle')}>预约管理</h3>
					<div className={multipleClass(styles, 'login-form flex flex-middle')}>
						<h4 className={multipleClass(styles, 'login-form-title')}>请登陆</h4>
						<Form >
							<Form.Item className={multipleClass(styles, 'form-item')}>{getFieldDecorator('user')(
								<Input size='large' placeholder='账号' autoComplete='off'/>
							)}</Form.Item>
							<Form.Item className={multipleClass(styles, 'form-item')}>{getFieldDecorator('password')(
								<Input size='large' placeholder='密码' autoComplete='off'/>
							)}</Form.Item>
							<Form.Item className={multipleClass(styles, 'form-item')}>
								<Button size='large' style={{width: '100%'}} type='primary'>登陆</Button>
							</Form.Item>
						</Form>
					</div>
				</div>
			</div>
		)
	}
}
export default Form.create()(Login);