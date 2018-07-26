import React, { Component } from 'react';
import styles from '../../less/appointment_new.less';
import multipleClass from '../../helpers/multiple_class';
import { List, InputItem, Picker, DatePicker, Button, WingBlank, Toast } from 'antd-mobile';
import { observer } from 'mobx-react';
import { autorun } from 'mobx';
import store from '../../stores/appointment_new';
import { getMinMaxTime, getMinMaxDate } from '../../helpers/get_min_max_date_time';
import axios from 'axios';
import history from '../../history';
import { getWxToken } from "../../helpers/fresh_token";
@observer
class AppointmentNew extends Component{
	constructor(props){
		super(props);
		store.minMaxDate = getMinMaxDate();
	}
	componentDidMount(){
		this.getServiceList();
		this.getBankList();
		this.autorunHandler = autorun(() => {
			let { date } = store;
			if(date){
				let {defaultDate, ...minMaxTime} = getMinMaxTime(date);
				store.minMaxTime = minMaxTime;
				console.log(defaultDate);
				store.time = defaultDate;
			}
			
		});
	}
	componentWillUnmount(){
		this.autorunHandler();
	}
	render(){
		let { showMoney, date, time, bank_list, selected_bank, disableBtn, init, minMaxDate, minMaxTime } = store;
		let bankList = Array.from(bank_list);
		let selectedBank = Array.from(selected_bank);
		let selectSex = Array.from(store.selectSex);
		let serviceTypeList = Array.from(store.service_type_list);
		let serviceType = Array.from(store.service_type);
		let serviceContentList = Array.from(store.service_content_list);
		let serviceContent = Array.from(store.service_content);
		return (
			<div>
				<h3 className={multipleClass(styles, 'header')}>填写预约信息</h3>
				<List >
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
					{init.type === '对公' ?
						<React.Fragment>
							<InputItem placeholder={`请输入企业名称`} onChange={val => store.name = val}>企业名称</InputItem>
							<InputItem placeholder='请输入15位或18位的社会信用代码' onChange={val => store.identity = val}>营业执照号</InputItem>
							<InputItem placeholder={`请输入企业联系人姓名`}  onChange={val => store.name_sub = val}>联系人</InputItem>
						</React.Fragment>
						:
						<React.Fragment>
							<InputItem placeholder={`请输入姓名`} onChange={val => store.name = val}>姓名</InputItem>
							<InputItem placeholder={`请输入身份证号`} onChange={val => store.identity = val}>身份证号</InputItem>
						</React.Fragment>
					}
					<InputItem placeholder='请输入手机号' type='phone' onChange={val => store.inputPhone = val}>手机号</InputItem>
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
					{showMoney ? <InputItem placeholder='请输入预约金额' type='money' moneyKeyboardAlign='left' onChange={val => store.money = val}>预约金额</InputItem> : null}
				</List>
				<List renderHeader={() => '预约受理时间:08:00~15:00'}>
					<DatePicker
						mode='date'
						onChange={this.handleDate}
						{...minMaxDate}
						value={date}
					>
						<List.Item arrow='horizontal'>预约日期</List.Item>
					</DatePicker>
					<DatePicker
						mode='time'
						minuteStep={30}
						{...minMaxTime}
						onChange={this.handleTime}
						value={time}
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
				let resData = res.data;
				if (!resData) {
					let promise = getWxToken();
					promise.then(res => {
						this.getServiceList();
					})
				} else if (resData.error_code === 10001 || resData.errorCode === 10001) {
					let promise = getWxToken();
					promise.then(res => {
						this.getServiceList();
					})
				}
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
			.catch(res => {
				let resData = res.data;
				if (!resData) {
					let promise = getWxToken();
					promise.then(res => {
						this.getBankList();
					})
				} else if (resData.error_code === 10001 || resData.errorCode === 10001) {
					let promise = getWxToken();
					promise.then(res => {
						this.getBankList();
					})
				}
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
	handleTime = (time) => {
		store.time = time;
	}
	confirm = () => {
		let { disableBtn, name, phone, identity, sex, service, service_item, bank_id, day, money,showMoney, name_sub } = store;
		if(!disableBtn){
			let params = {
				name, phone, identity, sex, service, service_item, bank_id, day
			};
			if(showMoney) {
				params.money = money;
			}
			if(name_sub){
				params.name_sub = name_sub;
			}
			Toast.loading('提交中，请稍后...', 30);
			axios.post('/api/v1/order/save', params)
				.then(res => {
					Toast.hide();
					let resData = res.data;
					if(resData.error_code === 0 || resData.errorCode === 0){
						history.push('/appointment/result');
					}
				})
				.catch(res => {
					Toast.hide();
				})
		}
	}
}
export default AppointmentNew;