import axios from 'axios';
let token;
let getWxToken = () => {
	return new Promise(resolve => {
		if(token){
			resolve(token);
		}else{
			axios.get('/api/v1/token/user')
				.then(res => {
					console.log(res.data);
					alert(res.data);
				})
				.catch(res => {
					console.log('error');
					console.log(res.data);
				})
		}
	});
};
export default getWxToken;