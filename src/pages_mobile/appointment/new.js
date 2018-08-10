import React, { Component } from 'react';
import styles from '../../less/appointment_new.less';
import multipleClass from '../../helpers/multiple_class';
import { List, InputItem, Picker, DatePicker, Button, WingBlank, Toast, Checkbox, TextareaItem } from 'antd-mobile';
const CheckboxItem = Checkbox.CheckboxItem;
import { observer } from 'mobx-react';
import { autorun } from 'mobx';
import store from '../../stores/appointment_new';
import { getMinMaxTime, getMinMaxDate } from '../../helpers/get_min_max_date_time';
import axios from 'axios';
import history from '../../history';
import { getWxToken } from "../../helpers/fresh_token";
import moment from 'moment';
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
			let { date, time_begin, time_end } = store;
			if(date){
				let {defaultDate, ...minMaxTime} = getMinMaxTime(date, time_begin, time_end);
				store.minMaxTime = minMaxTime;
				store.time = defaultDate;
			}
			
		});
	}
	componentWillUnmount(){
		this.autorunHandler();
	}
	render(){
		let { showMoney, showMoneyType, date, time, bank_list, selected_bank, disableBtn, init, minMaxDate, minMaxTime, money_type_list, time_begin, time_end } = store;
		let bankList = Array.from(bank_list);
		let selectedBank = Array.from(selected_bank);
		let selectSex = Array.from(store.selectSex);
		let serviceTypeList = Array.from(store.service_type_list);
		let serviceType = Array.from(store.service_type);
		let serviceContentList = Array.from(store.service_content_list);
		let serviceContent = Array.from(store.service_content);
		let moneyTypeList = Array.from(money_type_list);
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
					{ showMoneyType ? (
						<List className='show_money_type'>
							<div style={{width: '29.1%', fontSize: 17,paddingLeft: 15, display:'flex', alignItems: 'center'}}>预约面额</div>
							{ moneyTypeList.map(money => 
								<CheckboxItem key={money.value} defaultChecked={money.checked} style={{width: '29.1%'}} onChange={() => this.selectMoneyType(money)}>
									{money.value}
								</CheckboxItem>
							)}
						</List>
					) : null }
				</List>
				<List renderHeader={() => `预约受理时间: ${time_begin.format('mm:ss')} ~ ${time_end.format('mm:ss')}`}>
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
					<TextareaItem 
						title='备注'
						placeholder="填写备注的信息，文字不得超过30字"
						autoHeight
						count={30}
						onChange={this.handleRemark}
					/>
				</List>
				<WingBlank style={{marginTop: 48, marginBottom: 48}}>
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

	selectMoneyType = (money_type) => {
		let moneyTypeList = Array.from(store.money_type_list);
		moneyTypeList.forEach(moneyType => {
			if(money_type.value === moneyType.value){
				moneyType.checked = !moneyType.checked;
			}
		});
		store.money_type_list = moneyTypeList;
	};
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
		let showMoneyType = false;
		Array.from(store.origin_service_type_list).forEach(type => {
			if(type.category === value[0]){
				if(type.money === 1){
					showMoney = true;
				}
				if(type.money_type === 2){
					showMoneyType = true;
				}
				item = type.item.map(it => {
					return {
						label: it,
						value: it
					}
				});
				let time_begin = type.time_begin || '08:00:00';
				let time_end = type.time_end || '15:00';
				store.time_begin = moment(time_begin, 'mm:ss:SS');
				store.time_end = moment(time_end, 'mm:ss:SS');
				store.minMaxDate = getMinMaxDate();
			}
		});
		store.service_content_list = item;
		store.service_content = [];
		store.showMoney = showMoney;
		store.showMoneyType = showMoneyType;
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
	handleRemark = val => {
		store.remark = val;
	}
	confirm = () => {
		let { disableBtn, name, phone, identity, sex, service, service_item, bank_id, day, money,showMoney, name_sub, remark, showMoneyType, money_type_list } = store;
		if(!disableBtn){
			let params = {
				name, phone, identity, sex, service, service_item, bank_id, day, remark
			};
			if(showMoney) {
				params.money = money;
			}
			if(name_sub){
				params.name_sub = name_sub;
			}
			if(showMoneyType){
				let denominations = Array.from(money_type_list).filter(money => {
					if(money.checked) return true;
					return false;
				});
				params.denomination = denominations.map(deno => deno.value).join(',');
			}
			params.remark = remark || '';
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