import React, { Component } from 'react';
import { Toast } from 'antd-mobile';
import DocumentTitle from 'react-document-title';
class Wrapper extends Component{
	state = {
		Comp: null
	};
	render(){
		let { Comp } = this.state;
		let props = this.props;
		if(!Comp) return null;
		return <DocumentTitle title={props.title}><Comp {...props}/></DocumentTitle>;
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