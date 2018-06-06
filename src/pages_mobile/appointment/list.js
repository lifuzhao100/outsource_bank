import React, { Component } from 'react';
import { Button, List, DatePicker, ListView, Modal } from 'antd-mobile';
import multipleClass from '../../helpers/multiple_class';
import styles from '../../less/appointment_list.less';
import { observer } from 'mobx-react';
import store from '../../stores/appointment_list';
import moment from 'moment';
moment.locale('zh_cn');
import axios from 'axios';
import { SIZE, MALE, FEMALE} from "../../config/CONSTANT";
import getParam from "../../helpers/get_param";
@observer
class AppointmentList extends Component{
	constructor(props){
		super(props);
		store.dataSource = new ListView.DataSource({
			rowHasChanged: (row1, row2) => row1 !== row2,
		});
		store.appointment_list = [];
		let day = getParam('day');
		if(day){
			store.date = new Date(day);
		}
	}
	render(){
		let { date, visible, dataSource, user_type } = store;
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
			let btns = [];
			switch (rowData.state){
				case 1:
					if(user_type === 'admin'){
						btns = [
							<Button inline={true} size='small' type='warning' onClick={() => this.reject(rowData.order_id)}>拒绝</Button>,
							<Button inline={true} size='small' type='primary' onClick={() => this.resolve(rowData.order_id)}>受理</Button>
						]
					}else{
						btns = [
							<Button inline={true} size='small' type='warning' onClick={() => this.cancel(rowData.order_id)}>取消</Button>
						]
					}
					break;
				case 2:
					btns = [
						<Button inline={true} size='small' type='primary' disabled={true}>已受理</Button>
					];
					break;
				case 3:
					btns = [
						<Button inline={true} size='small' type='warning' disabled={true}>已受理</Button>
					];
					break;
				case 4:
					btns = [
						<Button inline={true} size='small' type='ghost' disabled={true} >已取消</Button>
					];
					break;
			}
			return (
				<div key={rowID} style={{ padding: '0 15px' }}>
					<div style={{ display: '-webkit-box', display: 'flex', padding: '15px 0' }}>
						<img style={{ height: '64px', marginRight: '15px' }} src={rowData.logo} alt="" />
						<div style={{ lineHeight: 1, flexGrow: 1, flexShrink: 1 }}>
							<div style={{ marginBottom: '8px', fontWeight: 'bold' }}>{rowData.name}</div>
							<p>{rowData.address}, {rowData.sex === MALE ? '男' : '女'}</p>
							<p>{rowData.service + '/' +rowData.service_item}{rowData.money > 0 ? '/' + rowData.money : ''}</p>
						</div>
						<div className={multipleClass(styles, 'btn-group')}>{btns}</div>
					</div>
				</div>
			);
		};
		return (
			<div className='appointment_list'>
				<div className={multipleClass(styles, 'home')}>
					<Button inline={true} size='small' onClick={this.goIndex}>首页</Button>
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
					dataSource={dataSource}
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
				if(page === 1){//第一页重新渲染
					appointmentList = [];
				}
				let concatResult;
				if(resData.user_grade === 1){//用户
					concatResult = appointmentList.concat(resData.orders);
					store.user_type = 'user';
				}else{//管理员
					concatResult = appointmentList.concat(resData.data);
					store.total = resData.total;
					store.user_type = 'admin';
				}
				store.appointment_list = concatResult;
				store.dataSource = store.dataSource.cloneWithRows(concatResult);
			})
			.catch(res => {

			});
	};
	reject = (order_id) => {
		Modal.alert('拒绝受理', '将拒绝受理此项业务，请确认',[
			{
				text: '取消'
			},
			{
				text: '确认',
				onPress: () => this.handleAppointment(order_id, 3)
			}
		])
	};
	resolve = (order_id) => {
		Modal.alert('受理', '将受理此项业务，请确认',[
			{
				text: '取消'
			},
			{
				text: '确认',
				onPress: () => this.handleAppointment(order_id, 2)
			}
		])
	};
	cancel = order_id => {
		Modal.alert('取消预约', '将取消预约此项业务，请确认',[
			{
				text: '取消'
			},
			{
				text: '确认',
				onPress: () => this.handleAppointment(order_id, 4)
			}
		])
	};
	handleAppointment = (order_id, state) => {
		axios.post('/api/v1/order/handel', {
			id: order_id,
			state
		})
			.then(res => {
				let resData = res.data;
				if(resData.error_code === 0 || resData.errorCode === 0){
					this.get
				}
			})
	};
	goIndex = () => {
		this.props.history.push('/');
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