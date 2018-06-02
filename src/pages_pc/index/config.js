import React, { Component } from 'react';
import { Table } from 'antd';
import BasicLayout from '../../layout/index';
import styles from  '../../less/index.config.less';
import multipleClass from '../../helpers/multiple_class';
class IndexConfig extends Component{
	render(){
		return (
			<BasicLayout title='首页配置'>
				<Table columns={this.columns}/>
			</BasicLayout>
		)
	}
	columns = [{
		title: 'ID',
		key: 'id',
		dataIndex: 'id'
	}, {
		title: '图片',
		key: 'img_url',
		dataIndex: 'img_url'
	}, {
		title: '状态',
		key: 'status',
		dataIndex: 'status'
	}, {
		title: '链接',
		key: 'link',
		dataIndex: 'link'
	}, {
		title: '操作',
		key:' id',
		dataIndex: 'id',
		render: (id) => (
			<div className={multipleClass(styles, 'operate')}>
				<a>停用</a>
				<a>编辑</a>
			</div>
		)
	}]
}
export default IndexConfig;