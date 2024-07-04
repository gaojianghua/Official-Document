/*
 * @Author: 高江华 g598670138@163.com
 * @Date: 2023-07-07 11:19:36
 * @LastEditors: 高江华
 * @LastEditTime: 2024-07-04 12:12:47
 * @Description: file content
 */
import axios from "axios";
import { getSession, removeSession, setSession } from '@/utils';
import { message } from 'antd';
import { config } from '@/config';

const request = axios.create({
    baseURL: config.baseURL
})


request.interceptors.request.use(config => {
    config.headers!['Access-Token'] = 'Bearer ' +  getSession('accessToken');
    config.headers!['Refresh-Token'] = 'Bearer ' +  getSession('refreshToken');
    config.headers!.AdminToken = getSession('adminToken')!;
    return config
}, error => Promise.reject(error))
request.interceptors.response.use(response => {
    if (response?.status === 200) {
        if (response?.headers!['new-token']) {
            setSession('accessToken', response?.headers!['new-token']);
        }
        if (response?.data.code === 40100) {
            removeSession('accessToken')
            removeSession('refreshToken')
            removeSession('userInfo')
            removeSession('adminToken')
            message.warning(response?.data.message);
            let time = setTimeout(()=> {
                location.reload()
                clearTimeout(time)
            }, 1000)
        }else if (response?.data.code !== 200) {
            message.warning(response?.data.message);
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
