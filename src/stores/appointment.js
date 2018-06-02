import { observable, computed } from 'mobx';
class Store {
	@observable keyword = '';
	@observable dates = [];
	@computed get date_begin(){
		return this.dates[0] && this.dates[0].format('YYYY-MM-DD');
	}
	@computed get date_end(){
		return this.dates[1] && this.dates[1].format('YYYY-MM-DD');
	}
}
export default new Store();