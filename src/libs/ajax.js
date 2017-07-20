import axios from 'axios';
import Util from './util';
import Config from '../config/config';
import vue from '../main'

let ajax = axios.create({
    baseURL: Config.apiBaseUrl
});

ajax.defaults.timeout = 20000
ajax.defaults.headers.post['Content-Type'] = 'application/json'
ajax.defaults.withCredentials = true  //CORS
// POST传参序列化
ajax.interceptors.request.use((config) => {
    vue.$Loading.start();
    return config;
}, (error) => {
    return Promise.reject(error);
})


ajax.interceptors.response.use((res) => {
    vue.$Loading.finish();
    return res;
}, (error) => {
    vue.$Loading.error();
    // auth处理
    if ((error.response.status == 403 || error.response.status == 401) && error.response.config.url != Config.apiBaseUrl + '/cmdb/account/login/') {
        vue.$Message.error('权限检验失败：未登录或者会话失效');
        Util.redirectToLogin();
        
    } else {
        vue.$Message.error('服务异常：' + error.response.data.detail||error.response.data);
    }
    return Promise.reject(error);
})

export default ajax;
