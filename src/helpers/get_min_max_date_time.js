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
		maxDate: moment().add(2,'d').hour(23).minute(59).toDate(),
		// minTime: 
	}
};

let getMinMaxTime = (date, time_begin, time_end) => {
	let now = moment(),
		nowString = now.format('YYYY-MM-DD'),
		dateString = moment(date).format('YYYY-MM-DD'),
		minTime,
		maxTime,
		startHour = time_begin.hour(),
		startMinute = time_begin.minute(),
		endHour = time_end.hour(),
		endMinute = time_end.minute();
	if(dateString === nowString){
		if(now.hour() < startHour ){
			minTime = time_begin;
		}else{
			if(moment().minute() > 30){
				minTime = moment().add(1, 'h').minute(0);
			}else{
				minTime = moment().minute(30);
			}
		}
		// maxTime = moment().add(2, 'd').hour(14).minute(30);
	}else{
		// if(moment().minute() > 30){
		// 	minTime = moment().add(1, 'h').minute(0);
		// }else{
		// 	minTime = moment().minute(30);
		// }
		// minTime = moment('08:00', 'HH:mm');
		minTime = time_begin;
	}
	maxTime = time_end;
	return {
		minDate: minTime.toDate(),
		maxDate: maxTime.toDate(),
		defaultDate: minTime.toDate()
	}
}
let getMinMaxDate = (time_begin, time_end) => {
	let now = moment(),
		minDate,
		maxDate,
		addIndex = 0;
	let endHour = time_end.hour(),
		endMinute = time_end.minute();
	let startHour = time_begin.hour(),
		startMinute = time_begin.minute();
	if(now.hour() > endHour || (now.hour() === endHour && now.minute() > endMinute)){
		addIndex += 1;
		minDate = moment().add(addIndex, 'd').hour(startHour).minute(startMinute);
	}else{
		minDate = moment().minute(0);
	}
	maxDate = moment().add(addIndex + 2, 'd').hour(endHour).minute(endMinute);
	return {
		minDate: minDate.toDate(),
		maxDate: maxDate.toDate()
	}
}
export {
	getMinMaxTime,
	getMinMaxDate
}
export default getMinMaxDateTime;