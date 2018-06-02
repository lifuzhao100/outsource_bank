import { observable } from 'mobx';
class Store {
	@observable date ;
	@observable visible = false;
}
export default new Store();