import { observable, computed } from 'mobx';
import moment from 'moment';
class Store {
	@observable date = moment().toDate();
	@observable visible = false;
	@observable appointment_list = [];
	@observable dataSource ;
	@observable user_type;
	@observable loading = false;
	@computed get day(){
		return moment(this.date).format('YYYY-MM-DD');
	}
}
export default new Store();