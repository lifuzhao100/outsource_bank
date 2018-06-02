import React, { Component } from 'react';
import { WingBlank, Grid } from 'antd-mobile';
import { Link } from 'react-router-dom';
import banner from '../../imgs/banner.png';
import head from '../../imgs/head.png';
import bottom from '../../imgs/bottom.png';
import styles from '../../less/index.mobile.less';
import multipleClass from '../../helpers/multiple_class';
import panel1 from '../../imgs/panel-1.png'
import panel2 from '../../imgs/panel-2.png'
import panel3 from '../../imgs/panel-3.png'
import panel4 from '../../imgs/panel-4.png'
import panel5 from '../../imgs/panel-5.png'
import panel6 from '../../imgs/panel-6.png'
const data = [{
	img: panel1,
	to: '/appointment/new'
}, {
	img: panel2,
	to: '/appointment/new'
}, {
	img: panel3,
	to: '/appointment/new'
}, {
	img: panel4,
	to: '/appointment/new'
}, {
	img: panel5,
	to: '/appointment/new'
}, {
	img: panel6,
	to: '/appointment/new'
}];
class Index extends Component{
	render(){
		return (
			<div className={multipleClass(styles, 'index')}>
				<WingBlank>
					<div>
						<img src={banner} style={{width: '100%'}}/>
					</div>
					<section className={multipleClass(styles, 'grid-section')}>
						<h3>
							<img src={head} style={{width: '100%'}}/>
						</h3>
						<Grid
							columnNum={3}
							data={data}
							renderItem={dataItem => (
								<Link to={dataItem.to}>
									<img src={dataItem.img} style={{width: '100%'}}/>
								</Link>
							)}
						/>
					</section>
					<div className={multipleClass(styles,'map-container')}>
						<div id='container' >
							<img src={bottom} className={multipleClass(styles, 'img')}/>
						</div>
					</div>
				</WingBlank>
			</div>
		)
	}
	componentDidMount(){
		this.loadScript();
	}
	loadScript = () => {
		window.init = this.initMap;
		let script = document.createElement("script");
		script.type = "text/javascript";
		script.src = "http://map.qq.com/api/js?v=2.exp&callback=init";
		document.body.appendChild(script);
	};
	initMap = () => {
		let mapContainer = document.getElementById('container');
		mapContainer.style.height = '220px';
		let myLatlng = new qq.maps.LatLng(-34.397, 150.644);
		let myOptions = {
			zoom: 8,
			center: myLatlng,
			mapTypeId: qq.maps.MapTypeId.ROADMAP
		};
		let map = new qq.maps.Map(mapContainer, myOptions);
	}
}
export default Index;