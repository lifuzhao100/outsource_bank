import { observable, computed } from 'mobx';
class Store {
	@observable indexList = [];
	@observable visible = false;
	@observable logo;
	@observable modalLoading = false;
	@observable selectItem = {};
	@observable tableLoading = false;
	@computed get editType(){
		return !!this.selectItem.id ? 'edit' : 'add';
	}
}
export default new Store();