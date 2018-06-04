import { observable } from 'mobx';
class Store {
	@observable visible = false;
	@observable bank_list = [];
	@observable total = 0;
}
export default new Store();