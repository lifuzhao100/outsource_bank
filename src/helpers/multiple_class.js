let multipleClass = (styleObj, classStr) => {
	return classStr.trim().split(/\s+/).map(key => styleObj[key]).join(' ');
};
export default multipleClass;