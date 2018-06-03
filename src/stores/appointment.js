import { observable, computed, action } from 'mobx';
class Store {
	@observable bank_list = [];
	@observable bank_id = '0';
	@observable key = '';
	@observable dates = [];
	@observable page = 1;
	@observable size = 10;
	@observable total = 20;
	@observable data = [];
	@computed get time_begin(){
		return this.dates[0] && this.dates[0].format('YYYY-MM-DD');
	}
	@computed get time_end(){
		return this.dates[1] && this.dates[1].format('YYYY-MM-DD');
	}
	@action setData(data){
		this.data = data;
	}
}
export default new Store();