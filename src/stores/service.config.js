import { observable } from 'mobx';
class Store {
	@observable visible = false;
}
export default new Store();