let getParam = (param) => {
	let reg = new RegExp(`(^|&)${param}=([^&]*)(&|$)`);
	let result = location.search.substr(1).match(reg);
	if (result != null) return decodeURIComponent(result[2]);
	return null;
};
export default getParam;