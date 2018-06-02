import React, { Component } from 'react';
import { Result, Icon, WingBlank, Button } from 'antd-mobile';
import styles from '../../less/appointment_result.less';
import multipleClass from '../../helpers/multiple_class';
class AppointmentResult extends Component{
	render(){
		return (
			<div className={multipleClass(styles, 'result')}>
				<Result
					img={<Icon type="check-circle" className={multipleClass(styles, 'result-icon')} style={{ fill: '#1F90E6' }} />}
					title="验证成功"
					message="所提交内容已成功完成验证"
				/>
				<WingBlank>
					<Button type='primary' style={{marginBottom: 24}}>查看我的申请</Button>
					<Button>返回首页</Button>
				</WingBlank>
			</div>
		)
	}
}
export default AppointmentResult;