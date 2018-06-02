import React, { Component } from 'react';
class Wrapper extends Component{
	state = {
		Comp: null
	};
	render(){
		let { Comp } = this.state;
		let props = this.props;
		if(!Comp) return Comp;
		return <Comp {...props}/>
	}
	componentDidMount(){
		let { component } = this.props;
		this.load(component);
	}
	componentWillReceiveProps(nextProps){
		let { component } = nextProps;
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