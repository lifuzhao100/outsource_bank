import { observable, computed } from 'mobx';
class Store {
	@observable indexList = [];
	@observable visible = false;
	@observable base64 ;
	@observable url = '';
	@observable loading = false;
	@observable selectItem = {};
}
export default new Store();