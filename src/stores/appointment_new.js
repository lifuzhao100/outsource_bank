import { observable, computed } from 'mobx';
import moment from 'moment';
class Store {
	@observable money_type_list = [{
		checked: false,
		value: '5角'
	}, {
		checked: false,
		value: '1元'
	}, {
		checked: false,
		value: '5元'
	}, {
		checked: false,
		value: '10元'
	}, {
		checked: false,
		value: '20元'
	}];
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
	@observable showMoneyType = false;
	@observable date = null;
	@observable time = null;
	@observable name;
	@observable inputPhone;
	@observable identity;
	@observable money;
	@observable remark = '';
	@observable name_sub;
	@observable time_begin = moment('08:00', 'HH:mm');
	@observable time_end = moment('15:00', 'HH:mm');
	@observable minMaxDate = {};
	@observable minMaxTime = {};
	@computed get init(){
		if(this.service_type.length > 0 && this.service_type[0].indexOf('对公') !== -1){//含有对公两个字即为对公
			return {
				type: '对公',//分为个人和对公账户
			}
		}
		return {
			type: '个人',//分为个人和对公账户
		}
	}
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
		if(this.date && this.time) {
			let date = moment(this.date).format('YYYY-MM-DD'),
				time = moment(this.time).format('HH:mm');
			return moment(date + ' ' + time, 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm');
		}
		return null;
	}
	@computed get disableBtn(){
		if(this.init.type === '对公'){
			if(!this.name_sub) return true;
		}
		if(this.showMoneyType){
			if(!Array.from(this.money_type_list).some(moneyType => !!moneyType.checked)) return true;
		}
		return !this.name || !this.phone || !this.identity || !this.sex || !this.bank_id || !this.service || !this.service_item || !this.day || (this.showMoney && !this.money);
	}
}
export default new Store();