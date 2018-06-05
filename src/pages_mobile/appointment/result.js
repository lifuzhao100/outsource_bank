import React, { Component } from 'react';
import { Result, Icon, WingBlank, Button } from 'antd-mobile';
import styles from '../../less/appointment_result.less';
import multipleClass from '../../helpers/multiple_class';
import history from '../../history';
class AppointmentResult extends Component{
	render(){
		return (
			<div className={multipleClass(styles, 'result')}>
				<Result
					img={<Icon type="check-circle" className={multipleClass(styles, 'result-icon')} style={{ fill: '#1F90E6' }} />}
					title="新增成功"
					message="申请已提交，请等待处理"
				/>
				<WingBlank>
					<Button type='primary' style={{marginBottom: 24}} onClick={this.look}>查看我的申请</Button>
					<Button onClick={this.goBack}>返回首页</Button>
				</WingBlank>
			</div>
		)
	}
	look = () => {
		history.push('/appointment/list')
	};
	goBack = () => {
		history.push('/')
	}
}
export default AppointmentResult;