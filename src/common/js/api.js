import axios from 'axios';
const instance = axios.create({});

instance.interceptors.response.use(function(response){
	if(response.data.code == 0){
		return response.data.data;
	}
})

export default instance;