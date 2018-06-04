import { observable } from 'mobx';
class Store {
	@observable visible = false;
	@observable serviceList = [];
}
export default new Store();