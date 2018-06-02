import { observable } from 'mobx';
class Store {
	@observable visible = true;
}
export default new Store();