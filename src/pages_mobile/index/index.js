import React, { Component } from 'react';
import { WingBlank, Grid, Carousel, Drawer, List } from 'antd-mobile';
import styles from '../../less/index.mobile.less';
import multipleClass from '../../helpers/multiple_class';
import { observer } from 'mobx-react';
import store from '../../stores/index_index';
import axios from 'axios';
import { getWxToken } from '../../helpers/fresh_token';
import bottomImg from '../../imgs/bottom.png';
import eBankImg from '../../imgs/e_bank.png';
import bankBookImg from '../../imgs/bank_book.png';
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
		let { locationFail, distance_list,carousel_list, open, e_bank_list, bank_book_list, company_list } = store;
		let carouselList = Array.from(carousel_list);
		let distanceList = Array.from(distance_list);
		const eBankList = Array.from(e_bank_list),
			bankBookList = Array.from(bank_book_list),
			companyList = Array.from(company_list);
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
							<img src={eBankImg} style={{width: '100%'}}/>
						</h3>
						<Grid
							columnNum={3}
							data={eBankList}
							square={false}
							renderItem={dataItem => (
								<a href={dataItem.url}>
									<img src={dataItem.logo} style={{width: '100%'}}/>
								</a>
							)}
						/>
					</section>
					<section className={multipleClass(styles, 'grid-section')}>
						<h3>
							<img src={bankBookImg} style={{width: '100%'}}/>
						</h3>
						<Grid
							columnNum={3}
							data={bankBookList}
							square={false}
							renderItem={dataItem => (
								<a href={dataItem.url}>
									<img src={dataItem.logo} style={{width: '100%'}}/>
								</a>
							)}
						/>
					</section>
				</WingBlank>
			</div>
		)
	}
	componentDidMount(){
		this.getCarouselList();
		this.getIndexList();
	}
	
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
				let eBankList = [],
					bankBookList = [],
					companyList = [];
				resData.forEach(item => {
					if(item.index_type === 1){
						eBankList.push(item);
					}else if(item.index_type === 2){
						bankBookList.push(item);
					}else if(item.index_type === 3){
						companyList.push(item);
					}
				});
				store.e_bank_list = eBankList;
				store.bank_book_list = bankBookList;
				store.company_list = companyList;
				// store.index_list = resData;
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
}
export default Index;