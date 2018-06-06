import React, { Component } from 'react';
import { WingBlank, Grid } from 'antd-mobile';
import banner from '../../imgs/banner.png';
import head from '../../imgs/head.png';
import bottom from '../../imgs/bottom.png';
import styles from '../../less/index.mobile.less';
import multipleClass from '../../helpers/multiple_class';
import { observer } from 'mobx-react';
import store from '../../stores/index_index';
import axios from 'axios';
import getWxToken from '../../helpers/fresh_token';
@observer
class Index extends Component{
	render(){
		let list = Array.from(store.index_list);
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
							data={list}
							renderItem={dataItem => (
								<a href={dataItem.url}>
									<img src={dataItem.logo} style={{width: '100%'}}/>
								</a>
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
		this.getIndexList();
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
	};
	getIndexList = () => {
		axios.get('/api/v1/wx/navs')
			.then(res => {
				let resData = res.data;
				// store.index_list = resData;
				store.index_list = [{
					logo: 'http://img.zcool.cn/community/01690955496f930000019ae92f3a4e.jpg@2o.jpg',
					url: 'index.html#/appointment/list'
				}, {
					logo: 'http://img.zcool.cn/community/01690955496f930000019ae92f3a4e.jpg@2o.jpg',
					url: 'index.html#/appointment/list'
				}, {
					logo: 'http://img.zcool.cn/community/01690955496f930000019ae92f3a4e.jpg@2o.jpg',
					url: 'index.html#/appointment/list'
				},{
					logo: 'http://img.zcool.cn/community/01690955496f930000019ae92f3a4e.jpg@2o.jpg',
					url: 'index.html#/appointment/list'
				}];
			})
			.catch(res => {

			})
	}
}
export default Index;