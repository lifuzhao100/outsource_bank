import { observable, computed } from 'mobx';
class Store {
	@observable visible = false;
	@observable service_list = [];
	@observable total = 0;
	@observable editItem = {};
	@observable modalLoading = false;
	@computed get editType(){
		return this.editItem.id ? 'edit' : 'add';
	}
}
export default new Store();