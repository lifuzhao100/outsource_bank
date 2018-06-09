import React, { Component } from 'react';
import { WingBlank, Grid, Carousel, Drawer, List } from 'antd-mobile';
import banner from '../../imgs/banner.png';
import head from '../../imgs/head.png';
import styles from '../../less/index.mobile.less';
import multipleClass from '../../helpers/multiple_class';
import { observer } from 'mobx-react';
import store from '../../stores/index_index';
import axios from 'axios';
import { getWxToken } from '../../helpers/fresh_token';
import bottomImg from '../../imgs/bottom.png';
@observer
class Index extends Component{
	constructor(props){
		super(props);
		store.carousel_list = [];//轮播图
		store.index_list = [];//首页模块图
		store.distance_list = [];
		store.open = false;
	}
	render(){
		let { locationFail, distance_list,carousel_list, open } = store;
		let list = Array.from(store.index_list);
		let carouselList = Array.from(carousel_list);
		let distanceList = Array.from(distance_list);
		const sidebar = (<List className={multipleClass(styles, 'bank-list')}>
			{distanceList.map((distance, index) => {
				return (
					<List.Item key={index} thumb={<span>{index + 1}</span>}>
						<h4 className={multipleClass(styles, 'bank-name')}>{distance.name}</h4>
						<p className={multipleClass(styles, 'bank-address')}>{distance.address}</p>
						<p className={multipleClass(styles, 'bank-distance')}>驾车距离: <span>{distance.distance}</span></p>
					</List.Item>
				);
			})}
		</List>);
		return (
			<div className={multipleClass(styles, 'index')}>
				<WingBlank style={{boxShadow: '0 2px 8px rgba(0,0,0,.09)', height: '100%'}}>
					<Carousel style={{width: '100%', height: '100%'}} infinite autoplay={true}>
						{carouselList.map((carousel, index) => (
							<a key={'carousel-' + index} href={carousel.url} className={multipleClass(styles, 'carousel-link')}>
								<img src={carousel.logo} className={multipleClass(styles, 'carousel-img')}/>
							</a>
						))}
					</Carousel>
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
					<div className={multipleClass(styles,'map-container')} onClick={() => this.showBankPanel(true)}>
						<div style={{position: 'absolute', width: '100%', height: '100%'}}>
							<div id='container' className={multipleClass(styles, 'container')}>
								{locationFail ? <img src={bottomImg} style={{width: '100%'}}/> : null}
							</div>
						</div>
					</div>
					<Drawer
						onOpenChange={this.showBankPanel}
						style={{ minHeight: document.documentElement.clientHeight, zIndex: open ? 100 : -1, position: 'fixed'}}
						contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 42 }}
						sidebarStyle={{ border: '1px solid #ddd' }}
						sidebar={sidebar}
						open={open}
						position='bottom'
					/>
				</WingBlank>
			</div>
		)
	}
	componentDidMount(){
		this.getCarouselList();
		this.getIndexList();
		this.getUserLocation();
	}
	getUserLocation = () => {
		axios.get('/api/v1/location')
			.then(res => {
				let latLng = res.data[0];
				store.latLng = latLng;
				if(latLng){
					this.loadScript();
				}else{
					store.locationFail = true;
				}
			})
			.then(res => {
				let resData = res.data;
				if (!resData) {
					let promise = getWxToken();
					promise.then(res => {
						this.getUserLocation();
					})
				} else if (resData.error_code === 10001 || resData.errorCode === 10001) {
					let promise = getWxToken();
					promise.then(res => {
						this.getUserLocation();
					})
				}else{
					store.locationFail = true;
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
		let that = this;
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
			panControl: false,
			//地图缩放控件，若为false则不显示缩放控件
			zoomControl: false,

			//地图比例尺控件，若为false则不显示比例尺控件
			scaleControl: false,
		};
		let map = new qq.maps.Map(mapContainer, myOptions);
		let markers = [];
		//调用Poi检索类
		let searchService = new qq.maps.SearchService({
			complete : function(results){
				let pois = results.detail.pois;
				store.pois = pois;
				for(let i = 0,l = pois.length;i < l; i++){
					let poi = pois[i];
					let marker = new qq.maps.Marker({
						map:map,
						position: poi.latLng
					});
					marker.setTitle(i+1);
					markers.push(marker);
				}
				that.getDistance(latitude+',' + longitude, pois);
			}
		});
		searchService.setPageCapacity(20);
		searchService.searchNearBy('农商行', myLatlng, 2000);
	};
	getDistance = (from, pois) => {
		//单起点到多终点
		let latLngs = pois.map(poi => {
			return poi.latLng.lat + ',' + poi.latLng.lng;
		});
		window.resDistance = this.resDistance;
		let script = document.createElement('script');
		//默认以开车的方式
		script.src = `http://apis.map.qq.com/ws/distance/v1/?from=${from}&to=${latLngs.join(';')}&key=GW2BZ-TQNE6-KTASK-E7CO3-22Z37-6IBXA&output=jsonp&callback=resDistance`;
		document.body.appendChild(script);
	};
	resDistance = (res) => {
		let distanceList = [];
		let { pois } = store;
		if(res.status === 0){
			let results = res.result.elements;
			let mergeResults = results.map((result, index) => {
				let poi = pois[index];
				let bankItem = {
					...poi,
					...result
				};
				return bankItem;
			});
			distanceList = mergeResults.sort((a, b) => {//排序
				return a.distance - b.distance;
			});
		}else{
			distanceList.push({
				name: '获取银行位置失败',
				address: '-',
				distance: 0
			});
		}
		store.distance_list = distanceList;
	};
	//获取轮播图
	getCarouselList = () => {
		axios.get('/api/v1/wx/navs', {
			params: {
				type: 1
			}
		})
			.then(res => {
				let resData = res.data;
				store.carousel_list = resData;
			})
			.catch(res => {
				let resData = res.data;
				if (!resData) {
					let promise = getWxToken();
					promise.then(res => {
						this.getCarouselList();
					})
				} else if (resData.error_code === 10001 || resData.errorCode === 10001) {
					let promise = getWxToken();
					promise.then(res => {
						this.getCarouselList();
					})
				}
			})
	};
	//获取首页模块图
	getIndexList = () => {
		axios.get('/api/v1/wx/navs', {
			params: {
				type: 2
			}
		})
			.then(res => {
				let resData = res.data;
				store.index_list = resData;
			})
			.catch(res => {
				let resData = res.data;
				if (!resData) {
					let promise = getWxToken();
					promise.then(res => {
						this.getIndexList();
					})
				} else if (resData.error_code === 10001 || resData.errorCode === 10001) {
					let promise = getWxToken();
					promise.then(res => {
						this.getIndexList();
					})
				}
			})
	};
	showBankPanel = (bool) => {
		console.log(123);
		store.open = bool;
	}
}
export default Index;