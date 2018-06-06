import { observable } from 'mobx';
class Store {
	@observable appointment_list = [];
	@observable bank_list = [];
	@observable total = 0;
}
export default new Store();