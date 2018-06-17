import VConsole from 'vconsole';
window.vConsole = new VConsole();
import axios from 'axios';
axios.get('/api/v1/current_location')
.then(res => {
	console.log(res.data);
})
.catch(res => {

});