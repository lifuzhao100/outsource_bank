import React, { Component } from 'react';
import { Form, Input, Button,message } from 'antd';
import styles from '../../less/renew.less';
import multipleClass from '../../helpers/multiple_class';
import getToken from '../../helpers/get_token';
import haveError from '../../helpers/have_error';
import history from '../../history';
import axios from 'axios';
class Renew extends Component{
	oldPwdTouched = false;
	newPwdTouched = false;
	repeatPwdTouched = false;
	render(){
		let { form } = this.props;
		let { getFieldDecorator, getFieldsError, isFieldTouched, getFieldError, getFieldValue } = form;
		let btnErr = haveError(getFieldsError());
		if(isFieldTouched('old_pwd')){
			this.oldPwdTouched = true;
		}
		if(isFieldTouched('new_pwd')){
			this.newPwdTouched = true;
		}
		if(isFieldTouched('repeat_pwd')){
			this.repeatPwdTouched = true;
		}
		let oldPwdErr, newPwdErr, repeatPwdErr;
		if(this.oldPwdTouched){
			oldPwdErr = getFieldError('old_pwd')
		}
		if(this.newPwdTouched){
			newPwdErr =  getFieldError('new_pwd');
		}
		if(this.repeatPwdTouched){
			repeatPwdErr = getFieldError('repeat_pwd');
		}
		let newPwd = getFieldValue('new_pwd');
		return (
			<div className={multipleClass(styles, 'renew')}>
				<Form>
					<Form.Item className={multipleClass(styles, 'form-item')}>
						<Input disabled={true} value={sessionStorage.getItem('phone')}/>
					</Form.Item>
					<Form.Item
						help={oldPwdErr ? oldPwdErr : ''}
						validateStatus={oldPwdErr ? 'error': 'success'}
						className={multipleClass(styles, 'form-item')}>{getFieldDecorator('old_pwd', {
						rules: [{
							required: true,
							message: '请输入旧密码'
						}]
					})(
						<Input type='password' placeholder='旧密码'/>
					)}</Form.Item>
					<Form.Item
						help={newPwdErr ? newPwdErr: ''}
						validateStatus={newPwdErr ? 'error': 'success'}
						className={multipleClass(styles, 'form-item')}>{getFieldDecorator('new_pwd', {
						rules: [{
							required: true,
							message: '请输入新密码'
						}]
					})(
						<Input type='password' placeholder='新密码'/>
					)}</Form.Item>
					<Form.Item
						help={repeatPwdErr ? repeatPwdErr : ''}
						validateStatus={repeatPwdErr ? 'error': 'success'}
						className={multipleClass(styles, 'form-item')}>{getFieldDecorator('repeat_pwd', {
						rules: [{
							required: true,
							message: '请再次输入新密码'
						},{
							message: '两次输入不匹配',
							validator: (rule, value, cb) => {
								this.timer = null;
								this.timer = setTimeout(() => {
										let reg = new RegExp(`^${value}`);
										if(reg.test(newPwd)) {
											cb();
										}else{
											cb(true);
										}
								}, 500);
							}
						}]
					})(
						<Input type='password' placeholder='再次确认新密码'/>
					)}</Form.Item>
					<Form.Item className={multipleClass(styles, 'form-item')}>
						<Button disabled={btnErr} type='primary' style={{width: '100%'}} onClick={this.doModify}>修改密码</Button>
					</Form.Item>
				</Form>
			</div>
		)
	}
	componentDidMount(){
		this.props.form.validateFields();
	}
	doModify = () => {
		let { old_pwd, new_pwd, repeat_pwd } = this.props.form.getFieldsValue();
		if(new_pwd !== repeat_pwd)return;
		let token = getToken();
		if(token){
			axios.post('/api/v1/token/update',{
				old_pwd,
				new_pwd
			}, {headers:{token}})
				.then(res => {
					let resData = res.data;
					message.success('修改密码成功，2秒后将退出重新登陆');
					setTimeout(() => {
						history.push('/login');
					}, 2000);
				})
				.catch(res => {

				})
		}
	}
}
export default Form.create()(Renew);