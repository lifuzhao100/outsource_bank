import moment from "moment";

let getMinMaxDateTime = () => {
	let now = moment();
	let minDateTime;
	if(now.minute() > 30){
		minDateTime = now.add(1, 'h').minute(0);
	}else {
		minDateTime = now.minute(30);
	}
	return {
		minDate: minDateTime.toDate(),
		maxDate: moment().add(2,'d').hour(23).minute(59).toDate()
	}
};
export default getMinMaxDateTime;