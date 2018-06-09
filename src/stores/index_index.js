import { observable } from 'mobx';
class Store {
	@observable index_list = [];
	@observable carousel_list = [];
	@observable distance_list = [];
	@observable pois = [];
	@observable open = false;
	@observable latLng;
	@observable locationFail = false;
}
export default new Store();