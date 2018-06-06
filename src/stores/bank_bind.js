import { observable } from 'mobx';
class Store {
	@observable user_list = [];
	@observable key = '';
	@observable total = 0;
}
export default new Store();