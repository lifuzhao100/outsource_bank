import { observable, computed } from 'mobx';
class Store {
	@observable selectSex = [];
	// @observable origin_bank_list = [];
	@observable bank_list = [];
	@observable selected_bank = [];
	@observable origin_service_type_list = [];
	@observable service_type_list = [];
	@observable service_type = [];
	@observable service_content_list = [];
	@observable service_content = [];
	@observable showMoney = false;
	@observable date = null;
	@observable name;
	@observable inputPhone;
	@observable identity;
	@observable money;
	@computed get phone(){
		return this.inputPhone && this.inputPhone.split(' ').join('');
	}
	@computed get sex(){
		return this.selectSex && this.selectSex[0];
	}
	@computed get bank_id(){
		return this.selected_bank && this.selected_bank[0];
	}
	@computed get service(){
		return this.service_type && this.service_type[0];
	}
	@computed get service_item(){
		return this.service_content && this.service_content[0];
	}
	@computed get day (){
		if(this.date) return moment(this.date).format('YYYY-MM-DD HH:mm');
		return null;
	}
	@computed get disableBtn(){
		return !this.name || !this.phone || !this.identity || !this.sex || !this.bank_id || !this.service || !this.service_item || !this.day || (this.showMoney && !this.money);
	}
}
export default new Store();