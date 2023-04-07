
export interface IUserInfo {
    id?: string,
    name?: string,
    avatar?: string,
    signature?: string,
    mobile?: string,
    province?: string,
    city?: string,
    rectangle?: string
}

export interface IUser {
    userInfo: IUserInfo
    tmpUser: IUserInfo
    isShowMenu: boolean
}

export interface IUserStore {
    userData: IUser,
    setUserInfo: (value: IUserInfo) => void
    setTmpUser: (value: IUserInfo) => void
    setIsShowMenu: (value: boolean) => void
}

const userStore = (): IUserStore => {
    return {
        userData: {
            userInfo: {},
            tmpUser: {},
            isShowMenu: false
        },
        setUserInfo: function (value) {
            this.userData.userInfo = value
        },
        setTmpUser: function (value) {
            this.userData.tmpUser = value
        },
        setIsShowMenu: function (value) {
            this.userData.isShowMenu = value
        }
    }
}

export default userStore