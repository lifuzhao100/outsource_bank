import { observable } from 'mobx';
class Store {
	@observable index_list = [];
	@observable e_bank_list = [];//电子银行业务
	@observable bank_book_list = [];//银行预约业务
	@observable company_list = [];//公司业务
	@observable carousel_list = [];
	@observable distance_list = [];
	@observable pois = [];
	@observable open = false;
	@observable latLng;
	@observable locationFail = false;
}
export default new Store();