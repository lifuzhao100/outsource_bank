import React, { Component } from 'react';
import { Button, List, DatePicker, ListView } from 'antd-mobile';
import multipleClass from '../../helpers/multiple_class';
import styles from '../../less/appointment_list.less';
import { observer } from 'mobx-react';
import store from '../../stores/appointment_list';
import moment from 'moment';
moment.locale('zh_cn');
import axios from 'axios';
import { SIZE, MALE, FEMALE} from "../../config/CONSTANT";
import getWxToken from '../../helpers/get_wx_token';
@observer
class AppointmentList extends Component{
	dataSource = new ListView.DataSource({
		rowHasChanged: (row1, row2) => row1 !== row2,
	});
	render(){
		let { date, visible, appointment_list } = store;
		let appointmentList = Array.from(appointment_list);
		this.dataSource = this.dataSource.cloneWithRows(appointmentList);
		const separator = (sectionID, rowID) => (
			<div
				key={`${sectionID}-${rowID}`}
				style={{
					margin: '0 15px',
					borderBottom: '1px solid #ECECED',
				}}
			/>
		);
		const row = (rowData, sectionID, rowID) => {
			return (
				<div key={rowID} style={{ padding: '0 15px' }}>
					<div style={{ display: '-webkit-box', display: 'flex', padding: '15px 0' }}>
						<img style={{ height: '64px', marginRight: '15px' }} src={rowData.img} alt="" />
						<div style={{ lineHeight: 1, flexGrow: 1, flexShrink: 1 }}>
							<div style={{ marginBottom: '8px', fontWeight: 'bold' }}>{rowData.name}</div>
							<p>{rowData.address}, {rowData.sex}</p>
							<p>{rowData.service + '/' +rowData.service_item}{rowData.money > 0 ? '/' + rowData.money : ''}</p>
						</div>
						<div className={multipleClass(styles, 'btn-group')}>
							<Button inline={true} size='small' type='warning'>拒绝</Button>
							<Button inline={true} size='small' type='primary'>受理</Button>
						</div>
					</div>
				</div>
			);
		};
		return (
			<div className='appointment_list'>
				<div className={multipleClass(styles, 'home')}>
					<Button inline={true} size='small'>首页</Button>
				</div>
				<List style={{borderBottom:'none'}}>
					<List.Item
						onClick={this.openDateModal}
					>
						<span>预约日期</span>
						<span className={multipleClass(styles, 'date')}>{moment(date).format('YYYY/MM/DD dddd')}</span>
					</List.Item>
				</List>
				<DatePicker
					visible={visible}
					mode='date'
					onDismiss={this.closeDateModal}
					onOk={this.setDate}
				/>
				<ListView
					dataSource={this.dataSource}
					renderSectionHeader={() => <span>预约列表</span>}
					renderRow={row}
					renderSeparator={separator}
					pageSize={4}
					useBodyScroll
					style={{height: 600}}
				>

				</ListView>
			</div>
		)
	}
	componentDidMount(){
		this.getAppointmentList();
	}
	getAppointmentList = (page = 1) => {
		let { day } = store;
		getWxToken()
		axios.get('/api/v1/orders/wx', {
			params: {
				page,
				size: SIZE,
				day: day
			}
		})
			.then(res => {
				let resData = res.data;
				let appointmentList = Array.from(store.appointment_list);
				let orders = [{
					"name": "朱明良",
					"phone": "18956225230",
					"identity": "34262619901001****",
					"sex": 1,
					"service": "ATM机",
					"service_item": "ATM机吞卡",
					"day": "2018-06-02 00:00:00",
					"state": "1",
					"money": 2
				}, {
					"name": "朱明良",
					"phone": "18956225230",
					"identity": "34262619901001****",
					"sex": 1,
					"service": "ATM机",
					"service_item": "ATM机吞卡",
					"day": "2018-06-02 10:00:00",
					"state": "1",
					"money": 2
				}];
				if(resData.user_grade === 1){
					store.appointment_list = appointmentList.concat(orders);
				}else{
					store.appointment_list = resData.data;
					store.total = resData.total;
				}
			})
			.catch(res => {

			});
	};
	openDateModal = () => {
		store.visible = true;
	};
	closeDateModal = () => {
		store.visible = false;
	};
	setDate = (date) => {
		store.date = date;
		store.visible = false;
	}
}
export default AppointmentList;