import React, { Component } from 'react';
import BasicLayout from '../../layout/index';
import { Table, Form, Select, Input, DatePicker} from 'antd';
import moment from 'moment';
import store from '../../stores/appointment';
const { RangePicker } = DatePicker;
const { Option } = Select;
const { Search } = Input;
import styles from '../../less/appointment.less';
import multipleClass from '../../helpers/multiple_class';
class Appointment extends Component{
	constructor(props){
		super(props);
		store.dates = [
			moment(),
			moment()
		]
	}
	render(){
		let { form } = this.props;
		let { getFieldDecorator } = form;
		let dates = Array.from(store.dates);
		return (
			<BasicLayout title={'全部预约'}>
				<Form layout='inline' className={multipleClass(styles, 'flex space-between select-bar')}>
					<Form.Item>{getFieldDecorator('bank_id', {
						initialValue: '0'
					})(
						<Select className={multipleClass(styles, 'select')}>
							<Option value='0'>全部银行</Option>
						</Select>
					)}</Form.Item>
					<Form.Item>
						<Search placeholder='请输入搜索内容'/>
					</Form.Item>
					<Form.Item>{getFieldDecorator('dates', {
						initialValue: dates
					})(
						<RangePicker allowClear={false}/>
					)}</Form.Item>
				</Form>
				<Table columns={this.columns}/>
			</BasicLayout>
		)
	}
	columns = [{
		title: '银行名称',
		dataIndex: 'name'
	}, {
		title: '预约人',
		dataIndex: 'user'
	}, {
		title: '预约服务',
		dataIndex: 'type'
	}, {
		title: '预约时间',
		dataIndex: 'appoint_time'
	}, {
		title: '状态',
		dataIndex: 'status'
	}, {
		title: '操作人',
		dataIndex: 'operator'
	}];
}
export default Form.create()(Appointment);