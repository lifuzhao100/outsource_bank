import React, { Component } from 'react';
import styles from '../less/login.less';
import multipleClass from '../helpers/multiple_class';
import { Form, Input, Button } from 'antd';
import haveError from '../helpers/have_error';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import globalStore from '../stores/global';
class Login extends Component{
	isPhoneTOuched = false;
	isPasswdTouched = false;
	state = {
		loginSuccess: false
	};
	render(){
		let { form } = this.props;
		let { loginSuccess } = this.state;
		let { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = form;
		if(isFieldTouched('phone')){
			this.isPhoneTOuched = true;
		}
		if(isFieldTouched('passwd')){
			this.isPasswdTouched = true;
		}
		//由于会出现isFieldTouched刷新的情况，暂时使用这种方式来保存isFieldTouched的状态
		let phoneErr;
		let passwdErr;
		if(this.isPhoneTOuched){
			phoneErr = getFieldError('phone');
		}
		if(this.isPasswdTouched){
			passwdErr = getFieldError('passwd');
		}
		let btnErr = haveError(getFieldsError());
		return (
			<div className={multipleClass(styles, 'login-container flex flex-middle')}>
				<div className={multipleClass(styles, 'login flex')}>
					<h3 className={multipleClass(styles, 'login-title inline-flex flex-middle')}>预约管理</h3>
					<div className={multipleClass(styles, 'login-form flex flex-middle')}>
						<h4 className={multipleClass(styles, 'login-form-title')}>请登陆</h4>
						<Form >
							<Form.Item
								help={phoneErr ? phoneErr : ''}
								validateStatus={phoneErr ? 'error': 'success'}
								className={multipleClass(styles, 'form-item')}>{getFieldDecorator('phone', {
								rules: [{
									required: true,
									message: '请输入账号'
								}]
							})(
								<Input size='large' placeholder='账号' autoComplete='off'/>
							)}</Form.Item>
							<Form.Item
								help={passwdErr ? passwdErr : ''}
								validateStatus={passwdErr ? 'error': 'success'}
								className={multipleClass(styles, 'form-item')}>{getFieldDecorator('passwd', {
								rules: [{
									required: true,
									message: '请输入密码'
								}]
							})(
								<Input type='password' size='large' placeholder='密码' autoComplete='off'/>
							)}</Form.Item>
							<Form.Item className={multipleClass(styles, 'form-item')}>
								<Button disabled={btnErr} size='large' style={{width: '100%'}} type='primary' onClick={this.doLogin}>登陆</Button>
							</Form.Item>
						</Form>
					</div>
				</div>
				{ loginSuccess ? <Redirect to='/appointment/index'/> : null}
			</div>
		)
	}
	componentDidMount(){
		this.props.form.validateFields();
	}
	doLogin = () => {
		let that = this;
		let { getFieldsValue, setFields } = this.props.form;
		let values = getFieldsValue();
		if(!values.phone || !values.passwd) return;
		axios.post('/api/v1/token/admin', {
			params: values
		})
			.then(res => {
				let { data } = res;
				sessionStorage.setItem('token', data['token']);
				sessionStorage.setItem('username', data['username']);
				sessionStorage.setItem('u_id', data['u_id']);
				sessionStorage.setItem('phone', values.phone);
			}).catch(res => {
				let { response: {data: {error_code}} } = res;
				if(error_code === 30000){
					setFields({
						phone: {
							value: values.phone,
							errors: [
								new Error('用户不存在')
							]
						}
					});
				}else if(error_code === 30002){
					that.props.form.setFields({
						passwd: {
							value: values.passwd,
							errors: [
								new Error('密码不正确')
							]
						}
					});
				}
		})
	}
}
export default Form.create()(Login);