import { observable } from 'mobx';
class Store {
	@observable username = sessionStorage.getItem('username');
	@observable token = sessionStorage.getItem('token');
	@observable u_id = sessionStorage.getItem('u_id');
}
export default new Store();