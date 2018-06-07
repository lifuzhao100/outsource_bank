import { observable } from 'mobx';
class Store {
	@observable index_list = [];
	@observable latLng;
	@observable locationFail = false;
}
export default new Store();