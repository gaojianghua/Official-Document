import request from '@/service/fetch';

export const register = (params: any, config = {}) => request.post('/api/user/register', params, config)
export const login = (params: any, config = {}) => request.post('/api/user/login', params, config)
export const logout = (params: any = {}, config = {}) => request.post('/api/user/logout', params, config)
export const userUpdate = (params: any = {}, config = {}) => request.post('/api/user/update', params, config)
export const getLinks = (params: any = {}, config = {}) => request.post('/api/link/list', params, config)
export const getCards = (params: any = {}, config = {}) => request.post('/api/card/list', params, config)
export const getUserLinks = (params: any = {}, config = {}) => request.post('/api/user/link/list', params, config)
export const getCardLinks = (params: any = {}, config = {}) => request.post('/api/user/card/list', params, config)
export const getClassList = (params: any = {}, config = {}) => request.post('/api/class/list', params, config)
export const linkDel = (params: any = {}, config = {}) => request.post('/api/link/del', params, config)
export const linkAdd = (params: any = {}, config = {}) => request.post('/api/link/add', params, config)
export const linkUpdate = (params: any = {}, config = {}) => request.post('/api/link/update', params, config)
export const cardDel = (params: any = {}, config = {}) => request.post('/api/card/del', params, config)
export const cardAdd = (params: any = {}, config = {}) => request.post('/api/card/add', params, config)
export const cardUpdate = (params: any = {}, config = {}) => request.post('/api/card/update', params, config)
export const userLinkDel = (params: any = {}, config = {}) => request.post('/api/user/link/del', params, config)
export const userLinkAdd = (params: any = {}, config = {}) => request.post('/api/user/link/add', params, config)
export const userLinkUpdate = (params: any = {}, config = {}) => request.post('/api/user/link/update', params, config)
export const userCardDel = (params: any = {}, config = {}) => request.post('/api/user/card/del', params, config)
export const userCardAdd = (params: any = {}, config = {}) => request.post('/api/user/card/add', params, config)
export const userCardUpdate = (params: any = {}, config = {}) => request.post('/api/user/card/update', params, config)
export const applyContribute = (params: any = {}, config = {}) => request.post('/api/contribute/apply', params, config)
export const adminLogin = (params: any = {}, config = {}) => request.post('/api/user/verify', params, config)
