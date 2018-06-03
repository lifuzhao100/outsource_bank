import history from '../history';
let getToken = () => {
	let token = sessionStorage.getItem('token');
	if(!token){
		history.push('/login');
		return false;
	}
	return token;
};
export default getToken