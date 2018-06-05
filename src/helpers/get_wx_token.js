import axios from 'axios';
let token;
let getWxToken = () => {
	return new Promise(resolve => {
		if(token){
			resolve(token);
		}else{
			axios.get('/api/v1/token/user')
				.then(res => {
					alert(res.data);
				})
		}
	});
};
export default getWxToken;