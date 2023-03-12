import axios from "axios";
import { getSession, removeSession } from '@/utils';
import { message } from 'antd';
import { config } from '@/config';

const request = axios.create({
    baseURL: config.baseURL
})


request.interceptors.request.use(config => {
    config.headers!.Authorization = 'Bearer ' +  getSession('token')
    return config
}, error => Promise.reject(error))
request.interceptors.response.use(response => {
    if (response?.status === 200) {
        if (response?.data.code === 40100) {
            removeSession('token')
            removeSession('userInfo')
            message.success(response?.data.message);
            let time = setTimeout(()=> {
                location.reload()
                clearTimeout(time)
            }, 1000)
        }else if (response?.data.code !== 200) {
            message.success(response?.data.message);
        }
        return response?.data
    } else {
        return {
            code: -1,
            message: '未知错误',
            data: null
        }
    }
}, error => Promise.reject(error))


export default request