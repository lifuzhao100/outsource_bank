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
import { getWxToken } from '../../helpers/fresh_token';
let getUserLocation = () => {
	axios.get('/api/v1/location')
		.then(res => {
			let {appId, timestamp, nonceStr, signature} = res.data;
			wx.config({
				debug: true,
				appId,
				timestamp,
				nonceStr,
				signature,
				jsApiList: ['getLocation']
			});
		});
};

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
						<div id='container' className={multipleClass(styles, 'container')}></div>
					</div>
				</WingBlank>
			</div>
		)
	}
	componentDidMount(){
		this.getIndexList();
		this.getUserLocation();
	}
	getUserLocation = () => {
		axios.get('/api/v1/location')
			.then(res => {
				let latLng = res.data[0] || {};
				store.latLng = latLng;
				this.loadScript();
			})
			.then(res => {
				let resData = res.data;
				if(resData.error_code === 10001 || resData.errorCode === 10001){
					let promise = getWxToken();
					promise.then(res => {
						this.getUserLocation();
					})
				}
			})
	};
	loadScript = () => {
		window.init = this.initMap;
		let script = document.createElement("script");
		script.type = "text/javascript";
		script.src = "http://map.qq.com/api/js?v=2.exp&callback=init";
		document.body.appendChild(script);
	};
	initMap = () => {
		let { latLng } = store;
		let { latitude, longitude } = latLng;
		let mapContainer = document.getElementById('container');
		mapContainer.style.height = '220px';
		let myLatlng = new qq.maps.LatLng(latitude, longitude);
		let myOptions = {
			zoom: 13,
			center: myLatlng,
			//如果为 true，在初始化地图时不会清除地图容器内的内容
			noClear: true,
			mapTypeId: qq.maps.MapTypeId.ROADMAP,
			//若为false则禁止拖拽
			draggable: false,
			//若为false则禁止滑轮滚动缩放
			scrollwheel: false,
			//若为true则禁止双击放大
			disableDoubleClickZoom: true,
			//若为false则禁止键盘控制地图
			keyboardShortcuts: false,
			//地图平移控件，若为false则不显示平移控件
			panControl: true,
			//地图缩放控件，若为false则不显示缩放控件
			zoomControl: false,

			//地图比例尺控件，若为false则不显示比例尺控件
			scaleControl: false,
		};
		let map = new qq.maps.Map(mapContainer, myOptions);
		let markers = [];
		let latLngBounds = new qq.maps.LatLngBounds();
		//调用Poi检索类
		let searchService = new qq.maps.SearchService({
			complete : function(results){
				let pois = results.detail.pois;
				for(let i = 0,l = pois.length;i < l; i++){
					let poi = pois[i];
					latLngBounds.extend(poi.latLng);
					let marker = new qq.maps.Marker({
						map:map,
						position: poi.latLng
					});
					marker.setTitle(i+1);
					markers.push(marker);
				}
				map.fitBounds(latLngBounds);
			}
		});
		searchService.setPageCapacity(50);
		searchService.searchNearBy('银行', myLatlng, 20000000000);
	};
	getIndexList = () => {
		axios.get('/api/v1/wx/navs')
			.then(res => {
				let resData = res.data;
				store.index_list = resData;
			})
			.catch(res => {
				console.log(res);
				let resData = res.data;
				if(resData.error_code === 10001 || resData.errorCode === 10001){
					let promise = getWxToken();
					promise.then(res => {
						this.getIndexList();
					})
				}
			})
	}
}
export default Index;