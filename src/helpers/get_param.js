let getParam = () => {
	let search = location.href.split('?')[1];
	search = search.split('#')[0];//去除hash的干扰
	if(search){
		let paramsArr = search.split('&');
		let paramsObj = {};
		paramsArr.forEach(p => {
			let paramArr = p.split('=');
			if(paramArr.length === 2){
				let key = paramArr[0];
				let value = paramArr[1];
				if(paramsObj[key]){
					paramsObj[key] = [value].concat(paramsObj[key]);
				}else{
					paramsObj[key] = value;
				}
			}
		});
		return paramsObj;
	}
	return {};
};
export default getParam;