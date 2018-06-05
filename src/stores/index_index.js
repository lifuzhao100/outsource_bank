import { observable } from 'mobx';
class Store {
	@observable index_list = [];
}
export default new Store();