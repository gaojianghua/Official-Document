
export interface IUserInfo {
    id?: string
    name?: string
    avatar?: string
    signature?: string
    mobile?: number
    email?: string
    province?: string
    city?: string
    rectangle?: string
    code?: string
    is_admin?: number
}

export interface IUser {
    userInfo: IUserInfo
    tmpUser: IUserInfo
    isShowMenu: boolean
    refresh: boolean
}

export interface IUserStore {
    userData: IUser
    setUserInfo: (value: IUserInfo) => void
    setTmpUser: (value: IUserInfo) => void
    setIsShowMenu: (value: boolean) => void
    setRefresh: (value: boolean) => void
}

const userStore = (): IUserStore => {
    return {
        userData: {
            userInfo: {},
            tmpUser: {},
            isShowMenu: false,
            refresh: false
        },
        setUserInfo: function (value) {
            this.userData.userInfo = value
        },
        setTmpUser: function (value) {
            this.userData.tmpUser = value
        },
        setIsShowMenu: function (value) {
            this.userData.isShowMenu = value
        },
        setRefresh: function(value) {
            this.userData.refresh = value;
        }
    }
}

export default userStore
