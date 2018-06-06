import React, { Component } from 'react';
import styles from '../../less/appointment_new.less';
import multipleClass from '../../helpers/multiple_class';
import { List, InputItem, Picker, DatePicker, Button, WingBlank } from 'antd-mobile';
import { observer } from 'mobx-react';
import store from '../../stores/appointment_new';
import getMinMaxDateTime from '../../helpers/get_min_max_date_time';
import axios from 'axios';
import history from '../../history';
@observer
class AppointmentNew extends Component{
	render(){
		let { showMoney, date, bank_list, selected_bank, disableBtn } = store;
		let bankList = Array.from(bank_list);
		let selectedBank = Array.from(selected_bank);
		let selectSex = Array.from(store.selectSex);
		let serviceTypeList = Array.from(store.service_type_list);
		let serviceType = Array.from(store.service_type);
		let serviceContentList = Array.from(store.service_content_list);
		let serviceContent = Array.from(store.service_content);
		let minMaxDate = getMinMaxDateTime();
		return (
			<div>
				<h3 className={multipleClass(styles, 'header')}>填写预约信息</h3>
				<List>
					<InputItem placeholder='请输入姓名' onChange={val => store.name = val}>姓名</InputItem>
					<InputItem placeholder='请输入手机号' type='phone' onChange={val => store.inputPhone = val}>手机号</InputItem>
					<InputItem placeholder='请输入身份证号' onChange={val => store.identity = val}>身份证号</InputItem>
					<Picker
						data={this.sexList}
						value={selectSex}
						cols={1}
						onOk={this.pickSex}
					>
						<List.Item arrow='horizontal'>性别</List.Item>
					</Picker>
					<Picker
						data={bankList}
						value={selectedBank}
						cols={1}
						onOk={this.pickBank}
					>
						<List.Item arrow='horizontal'>预约银行</List.Item>
					</Picker>
					<Picker
						data={serviceTypeList}
						value={serviceType}
						cols={1}
						onOk={this.pickServiceType}
					>
						<List.Item arrow='horizontal'>服务类别</List.Item>
					</Picker>
					<Picker
						data={serviceContentList}
						value={serviceContent}
						cols={1}
						onOk={this.pickServiceContent}
					>
						<List.Item arrow='horizontal'>服务内容</List.Item>
					</Picker>
					{showMoney ? <InputItem placeholder='请输入预约金额' type='money' moneyKeyboardAlign='left' onChange={val => store.money = val}>预约金额</InputItem> : null}
				</List>
				<List style={{marginTop: '24px'}}>
					<DatePicker
						mode='datetime'
						minuteStep={30}
						{...minMaxDate}
						onChange={this.handleDate}
						value={date}
					>
						<List.Item arrow='horizontal'>预约时间</List.Item>
					</DatePicker>
				</List>
				<WingBlank style={{marginTop: 48}}>
					<Button type='primary' disabled={disableBtn} onClick={this.confirm}>提交预约申请</Button>
				</WingBlank>
			</div>
		)
	}
	componentDidMount(){
		this.getServiceList();
		this.getBankList();
	}
	getServiceList = () => {
		axios.get('/api/v1/service/services')
			.then(res => {
				let resData = res.data;
				store.origin_service_type_list = resData;
				store.service_type_list = resData.map(item => {
					return {
						label: item.category,
						value: item.category
					}
				});
			})
			.catch(res => {

			})
	};
	getBankList = () => {
		axios.get('/api/v1/banks')
			.then(res => {
				let resData = res.data;
				// store.origin_bank_list = resData;
				store.bank_list = resData.map(r => {
					return {
						label: r.name + '(' + r.address + ')',
						value: r.id
					}
				})
			})
	};
	sexList = [{
		label: '男',
		value: '1'
	}, {
		label: '女',
		value: '2'
	}];
	pickSex = (sex) => {
		store.selectSex = sex;
	};
	pickBank = (bank) => {
		store.selected_bank = bank;
	};
	pickServiceType = (value) => {
		store.service_type = value;
		let item = [];
		let showMoney = false;
		Array.from(store.origin_service_type_list).forEach(type => {
			if(type.category === value[0]){
				if(type.money === 1){
					showMoney = true;
				}
				item = type.item.map(it => {
					return {
						label: it,
						value: it
					}
				})
			}
		});
		store.service_content_list = item;
		store.service_content = [];
		store.showMoney = showMoney;
	};
	pickServiceContent = (value) => {
		store.service_content = value;
	};
	handleDate = date => {
		store.date = date;
	};
	confirm = () => {
		let { disableBtn, name, phone, identity, sex, service, service_item, bank_id, day, money,showMoney } = store;
		if(!disableBtn){
			let params = {
				name, phone, identity, sex, service, service_item, bank_id, day
			};
			if(showMoney) {
				params.money = money;
			}
			axios.post('/api/v1/order/save', params)
				.then(res => {
					let resData = res.data;
					if(resData.error_code === 0 || resData.errorCode === 0){
						history.push('/appointment/result');
					}
				})
				.catch(res => {

				})
		}
	}
}
export default AppointmentNew;