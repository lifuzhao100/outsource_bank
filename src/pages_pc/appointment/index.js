import React, { Component } from 'react';
import { Table, Form, Select, Input, DatePicker} from 'antd';
import moment from 'moment';
import store from '../../stores/appointment';
const { RangePicker } = DatePicker;
const { Option } = Select;
const { Search } = Input;
import styles from '../../less/appointment.less';
import multipleClass from '../../helpers/multiple_class';
import getToken from '../../helpers/get_token';
import axios from 'axios';
import { observer } from 'mobx-react';
@observer
class Appointment extends Component{
	constructor(props){
		super(props);
		store.dates = [
			moment(),
			moment()
		];
	}
	render(){
		let { total, size, data, key, bank_id, dates, bank_list } = store;
		let defaultDates = Array.from(dates);
		let dataSource = Array.from(data);
		let bankList = Array.from(bank_list);
		return (
			<React.Fragment>
				<Form layout='inline' className={multipleClass(styles, 'flex space-between select-bar')}>
					<Form.Item>
						<Select className={multipleClass(styles, 'select')} defaultValue={bank_id} onChange={this.changeBank}>
							<Option value='0'>全部银行</Option>
							{bankList.map(bank => <Option value={'' + bank.id} key={'' + bank.id}>{bank.name}</Option>)}
						</Select>
					</Form.Item>
					<Form.Item>
						<Search placeholder='请输入搜索内容' defaultValue={key} onSearch={this.changeKey}/>
					</Form.Item>
					<Form.Item>
						<RangePicker allowClear={false} defaultValue={defaultDates} onChange={this.changeTime}/>
					</Form.Item>
				</Form>
				<Table columns={this.columns} dataSource={dataSource} pagination={total > size ? {onChange: this.changePage} : false}/>
			</React.Fragment>
		)
	}
	componentDidMount(){
		this.getBankList();
		this.getAppointmentList();
	}
	getAppointmentList = () => {
		let { time_begin, time_end, size, page, bank_id, key } = store;
		let token = getToken();
		if(token){
			axios.get('/api/v1/orders/cms', {
				params: {
					token,
					time_begin,
					time_end,
					key,
					bank_id,
					size,
					page
				}
			})
				.then(res => {
					let resData = res.data;
					let { data, total } = resData;
					store.setData(data);
					store.total = total;
				})
				.catch(res => {

				})
		}
	};
	getBankList = () => {
		axios.get('/api/v1/cms/banks', {
			params: {
				page: 1,
				size: 1000
			}
		})
			.then(res => {
				let resData = res.data;
				let { data } = resData;
				store.bank_list = data;
			})
	};
	changeBank = (id) => {
		store.bank_id = id;
		this.getAppointmentList();
	};
	changeKey = (key) => {
		store.key = key;
		this.getAppointmentList();
	};
	changeTime = (dates) => {
		store.dates = dates;
		this.getAppointmentList();
	};
	changePage = (page) => {
		store.page = page;
		this.getAppointmentList();
	};
	columns = [{
		title: '银行名称',
		key: 'bank_name',
		dataIndex: 'bank_name'
	}, {
		title: '预约人',
		key: 'name',
		dataIndex: 'name'
	}, {
		title: '预约服务',
		key: 'type',
		dataIndex: 'type',
		render: (text, record) => <span>{record.service}{record.service_item ? '/' + record.service_item : ''}</span>
	}, {
		title: '预约时间',
		key: 'day',
		dataIndex: 'day'
	}, {
		title: '状态',
		key: 'state',
		dataIndex: 'state',
		render: state => {
			let states = ['', '待处理', '已处理', '拒绝', '已取消'];
			return states[state];
		}
	}, {
		title: '操作人',
		key: 'admin',
		dataIndex: 'admin'
	}];
}
export default Form.create()(Appointment);