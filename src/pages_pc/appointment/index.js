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
import { SIZE } from "../../config/CONSTANT";
@observer
class Appointment extends Component{
	constructor(props){
		super(props);
		store.dates = [
			moment(),
			moment()
		];
	}
	page = 1;
	render(){
		let { total, bank_list, appointment_list } = store;
		let bankList = Array.from(bank_list);
		let dataSource= Array.from(appointment_list);
		let { getFieldDecorator } = this.props.form;
		let current = this.page;
		return (
			<React.Fragment>
				<Form layout='inline' className={multipleClass(styles, 'flex space-between select-bar')}>
					<Form.Item>{getFieldDecorator('bank_id', {
						initialValue: '0',
						trigger: 'onSelect'
					})(
						<Select className={multipleClass(styles, 'select')} onChange={() => this.getAppointmentList()}>
							<Option value='0'>全部银行</Option>
							{bankList.map(bank => <Option value={'' + bank.id} key={'' + bank.id}>{bank.name}</Option>)}
						</Select>
					)}</Form.Item>
					<Form.Item>{getFieldDecorator('key', {
						initialValue: '',
						trigger: 'onChange'
					})(
						<Search placeholder='请输入搜索内容' onPressEnter={() => this.getAppointmentList()}/>
					)}</Form.Item>
					<Form.Item>{getFieldDecorator('dates', {
						initialValue: [moment(), moment()],
						trigger: 'onCalendarChange'
					})(
						<RangePicker allowClear={false} onChange={() => this.getAppointmentList()}/>
					)}</Form.Item>
				</Form>
				<Table columns={this.columns} dataSource={dataSource} pagination={total > SIZE ? { total,pageSize: SIZE, current, onChange: page => this.getAppointmentList(page)} : false}/>
			</React.Fragment>
		)
	}
	componentDidMount(){
		this.getBankList();
		this.getAppointmentList();
	}
	getAppointmentList = (page = 1) => {
		let {bank_id, key, dates} = this.props.form.getFieldsValue();
		let [time_begin, time_end] = dates;
		let token = getToken();
		this.page = page;
		if(token){
			axios.get('/api/v1/orders/cms', {
				params: {
					bank_id,
					key,
					time_begin: time_begin.format('YYYY-MM-DD'),
					time_end: time_end.format('YYYY-MM-DD'),
					page: page,
					size: SIZE
				}
			}, {
				headers: {
					token
				}
			})
				.then(res => {
					let resData = res.data;
					let { data, total } = resData;
					store.appointment_list = data;
					store.total = total;
				})
				.catch(res => {})
		}
	};
	getBankList = () => {
		axios.get('/api/v1/cms/banks', {
			params: {
				page: 1,
				size: 1000//使用了或者银行卡列表的接口，只能写死1000条来尽量获取大量数据，在数据超过1000条之后再做优化
			}
		})
			.then(res => {
				let resData = res.data;
				let { data } = resData;
				store.bank_list = data;
			})
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