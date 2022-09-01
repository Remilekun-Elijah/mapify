import axios from 'axios';
import Alert from './alert';
import config from './config'
import Storage from './storage'

const API = axios.create({
 baseURL: config.backendUrl,
 timeout: 100000
});


API.defaults.headers.common['Authorization'] = `Bearer ${Storage.get('authToken')}`;

const handleSessionExpired = (error) => {
 const isNotAuth = ['authorization', 'auth', 'authorized', 'access forbidden'].find(msg=> error?.response?.data?.error?.toLowerCase().includes(msg)
 )
 const cb = () => setTimeout( _ => window.location.href = '/', 2000),
 message = 'Session expired, please login again.';

 if ([403].includes(error?.response?.status) && isNotAuth) {
  Storage.remove('authToken');
  Storage.remove('user');
  Alert({type: 'error', message, cb});
 }
 else {
  return Promise.reject(error?.response?.data);
 }
};

const handleSuccess = (response) => {
 return response;
};

API.interceptors.response.use(handleSuccess, handleSessionExpired)

API.interceptors.request.use(config => {
 const cb = () => setTimeout( _ => window.location.href ='/', 2000),
 message = 'You are not authorized, please login again';

 if(Storage.get('authToken') === null && window.location.pathname !== '/') {
  Alert({type: 'error', message, cb});
 }

 return config;
}
, error => {
 return Promise.reject(error);
});


export default API;