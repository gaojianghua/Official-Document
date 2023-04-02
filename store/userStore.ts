
export interface IUserInfo {
    id?: string,
    name?: string,
    avatar?: string,
    signature?: string,
    mobile?: string,
}

export interface IUser {
    userInfo: IUserInfo
    tmpUser: IUserInfo
}

export interface IUserStore {
    userData: IUser,
    setUserInfo: (value: IUserInfo) => void
    setTmpUser: (value: IUserInfo) => void
}

const userStore = (): IUserStore => {
    return {
        userData: {
            userInfo: {},
            tmpUser: {}
        },
        setUserInfo: function (value) {
            this.userData.userInfo = value
        },
        setTmpUser: function (value) {
            this.userData.tmpUser = value
        }
    }
}

export default userStore