import React, { Component } from 'react';
import { Button, List, DatePicker, ListView } from 'antd-mobile';
import multipleClass from '../../helpers/multiple_class';
import styles from '../../less/appointment_list.less';
import { observer } from 'mobx-react';
import store from '../../stores/appointment_list';
import moment from 'moment';
moment.locale('zh_cn');
const data = [
	{
		img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
		title: 'Meet hotel',
		des: '不是所有的兼职汪都需要风吹日晒',
	},
	{
		img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
		title: 'McDonald\'s invites you',
		des: '不是所有的兼职汪都需要风吹日晒',
	},
	{
		img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
		title: 'Eat the week',
		des: '不是所有的兼职汪都需要风吹日晒',
	},
];
const NUM_ROWS = 2;
let pageIndex = 0;

function genData(pIndex = 0) {
	const dataBlob = {};
	for (let i = 0; i < NUM_ROWS; i++) {
		const ii = (pIndex * NUM_ROWS) + i;
		dataBlob[`${ii}`] = `row - ${ii}`;
	}
	return dataBlob;
}
let dataSource = new ListView.DataSource({
	rowHasChanged: (row1, row2) => row1 !== row2,
});
dataSource = dataSource.cloneWithRows(genData());
@observer
class AppointmentList extends Component{
	constructor(props){
		super(props);
		store.date = moment().toDate()
	}
	render(){
		let { date, visible } = store;
		console.log(dataSource);
		const separator = (sectionID, rowID) => (
			<div
				key={`${sectionID}-${rowID}`}
				style={{
					margin: '0 15px',
					borderBottom: '1px solid #ECECED',
				}}
			/>
		);
		let index = data.length - 1;
		const row = (rowData, sectionID, rowID) => {
			if (index < 0) {
				index = data.length - 1;
			}
			const obj = data[index--];
			return (
				<div key={rowID} style={{ padding: '0 15px' }}>
					<div style={{ display: '-webkit-box', display: 'flex', padding: '15px 0' }}>
						<img style={{ height: '64px', marginRight: '15px' }} src={obj.img} alt="" />
						<div style={{ lineHeight: 1 }}>
							<div style={{ marginBottom: '8px', fontWeight: 'bold' }}>{obj.des}</div>
							<p>{obj.address}, {obj.sex}</p>
							<p>{obj.serveType}</p>
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