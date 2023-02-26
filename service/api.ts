import request from '@/service/fetch';

export const register = (params: any, config = {}) => request.post('/api/user/register', params, config)
export const login = (params: any, config = {}) => request.post('/api/user/login', params, config)
export const logout = (params: any = {}, config = {}) => request.post('/api/user/logout', params, config)