import React, { Component } from 'react';
import { Toast } from 'antd-mobile';
class Wrapper extends Component{
	state = {
		Comp: null
	};
	render(){
		let { Comp } = this.state;
		let props = this.props;
		if(!Comp) return null;
		return <Comp {...props}/>
	}
	componentDidMount(){
		let { component } = this.props;
		this.load(component);
	}
	load = (component) => {
		Toast.loading('加载中...', 30);
		component().then(file => {
			Toast.hide();
			this.setState({
				Comp: file.default
			})
		})
	}
}
export default Wrapper;