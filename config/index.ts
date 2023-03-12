export const config = {
    baseURL: 'http://gaojianghua.cn:8888', //生产环境
    // baseURL: 'http://localhost:8888',  //本地环境
}

export const uploadUrl = config.baseURL + '/api/image_upload'

export const imageType = {
    business: 'avatar',
}