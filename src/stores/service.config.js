import { observable, computed } from 'mobx';
import moment from 'moment';
class Store {
	@observable visible = false;
	@observable service_list = [];
	@observable total = 0;
	@observable editItem = {};
	@observable modalLoading = false;
	@observable time_begin = moment('08:00', 'mm:ss');
	@observable time_end = moment('15:00', 'mm:ss');
	@computed get editType(){
		return this.editItem.id ? 'edit' : 'add';
	}
}
export default new Store();