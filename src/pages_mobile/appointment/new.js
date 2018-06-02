import React, { Component } from 'react';
import styles from '../../less/appointment_new.less';
import multipleClass from '../../helpers/multiple_class';
import { List, InputItem, Picker, DatePicker, Button, WingBlank } from 'antd-mobile';
import { observer } from 'mobx-react';
import store from '../../stores/appointment_new';
import getMinMaxDateTime from '../../helpers/get_min_max_date_time';
@observer
class AppointmentNew extends Component{
	render(){
		let sex = Array.from(store.sex);
		let serveTypeList = Array.from(store.serveTypeList);
		let serveContentList = Array.from(store.serveContentList);
		let minMaxDate = getMinMaxDateTime();
		return (
			<div>
				<h3 className={multipleClass(styles, 'header')}>填写预约信息</h3>
				<List>
					<InputItem placeholder='请输入姓名'>姓名</InputItem>
					<InputItem placeholder='请输入手机号'>手机号</InputItem>
					<InputItem placeholder='请输入身份证号'>身份证号</InputItem>
					<Picker
						data={this.sexList}
						value={sex}
						cols={1}
						onOk={this.pickSex}
					>
						<List.Item arrow='horizontal'>性别</List.Item>
					</Picker>
					<Picker
						data={serveTypeList}
						value={sex}
						cols={1}
						onOk={this.pickSex}
					>
						<List.Item arrow='horizontal'>服务类别</List.Item>
					</Picker>
					<Picker
						data={serveContentList}
						value={sex}
						cols={1}
						onOk={this.pickSex}
					>
						<List.Item arrow='horizontal'>服务内容</List.Item>
					</Picker>
				</List>
				<List style={{marginTop: '24px'}}>
					<DatePicker
						mode='datetime'
						minuteStep={30}
						{...minMaxDate}
					>
						<List.Item>预约时间</List.Item>
					</DatePicker>
				</List>
				<WingBlank style={{marginTop: 48}}>
					<Button type='primary'>提交预约申请</Button>
				</WingBlank>
			</div>
		)
	}
	sexList = [{
		label: '男',
		value: '1'
	}, {
		label: '女',
		value: '2'
	}];
	pickSex = (sex) => {
		store.sex = sex;
	}
}
export default AppointmentNew;