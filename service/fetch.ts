import axios from "axios";
import { getSession } from '@/utils';

const request = axios.create({
    baseURL: 'http://gaojianghua.cn:8888'
})


request.interceptors.request.use(config => {
    config.headers!['Authorization'] = `Bearer ${getSession('token')}`;
    return config
}, error => Promise.reject(error))
request.interceptors.response.use(response => {
    if (response?.status === 200) {
        return response?.data
    } else {
        return {
            code: -1,
            msg: '未知错误',
            data: null
        }
    }
}, error => Promise.reject(error))


export default request