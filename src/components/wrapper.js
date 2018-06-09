import React, { Component } from 'react';
import { Spin } from 'antd';
import DocumentTitle from 'react-document-title';
class Wrapper extends Component{
	state = {
		Comp: null
	};
	render(){
		let { Comp } = this.state;
		let props = this.props;
		if(!Comp) return <div style={{width: '100%', height: '100%', textAlign: 'center'}}><Spin/></div>;
		return (
			<DocumentTitle title={props.title}>
				<Comp {...props}/>
			</DocumentTitle>
		)
	}
	componentDidMount(){
		let { component } = this.props;
		this.load(component);
	}
	load = (component) => {
		component().then(file => {
			this.setState({
				Comp: file.default
			})
		})
	}
}
export default Wrapper;