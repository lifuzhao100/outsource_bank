import { observable } from 'mobx';
class Store {
	@observable sex = [];
	@observable serveTypeList = [];
	@observable serveContentList = [];
}
export default new Store();