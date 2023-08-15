/*
 * @Author       : 高江华 g598670138@163.com
 * @Date         : 2023-07-07 11:19:33
 * @LastEditors  : 高江华 g598670138@163.com
 * @LastEditTime : 2023-08-15 17:20:32
 * @FilePath     : /Official-Document/config/index.ts
 * @Description  : 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
export const config = {
    baseURL: 'https://gaojianghua.cn:8888', //生产环境
    // baseURL: 'http://localhost:8888',  //本地环境
}

export const uploadUrl = config.baseURL + '/api/image_upload'

export const imageType = {
    business: 'avatar',
    logo: 'https://gaojianghua.oss-cn-hangzhou.aliyuncs.com/wolffyPink.png',
    ico: 'https://gaojianghua.oss-cn-hangzhou.aliyuncs.com/wolffyPink.ico'
}
