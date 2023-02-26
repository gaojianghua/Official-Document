
export interface IPublic {
    isManagement: boolean,
    maskShow: boolean,
    maskComponentId: number, // 1login, 2mark
    isAddAndEditor: number, // 1add, 2editor
    token: string,
}

export interface IPublicStore {
    publicData: IPublic,
    setIsManagement: (value: boolean) => void,
    setMaskShow: (value: boolean) => void,
    setMaskComponentId: (value: number) => void,
    setIsAddAndEditor: (value: number) => void,
    setToken: (value: string) => void,
}

const publicStore = (): IPublicStore => {
    return {
        publicData: {
            maskShow: false,
            isManagement: false,
            maskComponentId: 0,
            isAddAndEditor: 0,
            token: ''
        },
        setIsManagement: function (value) {
            this.publicData.isManagement = value
        },
        setMaskShow: function (value) {
            this.publicData.maskShow = value
        },
        setMaskComponentId: function (value) {
            this.publicData.maskComponentId = value
        },
        setIsAddAndEditor: function (value) {
            this.publicData.isAddAndEditor = value
        },
        setToken: function (value) {
            this.publicData.token = value
        }
    }
}

export default publicStore