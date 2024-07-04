import { Menu } from '@/types/res';

export interface IPublic {
    isManagement: boolean,
    maskShow: boolean,
    maskComponentId: number, // 1login, 2mark
    isAddAndEditor: number, // 1add, 2editor
    isAddOrEdit: number, // 1add, 2editor
    isAddUseEdit: number, // 1add, 2editor
    accessToken: string,
    refreshToken: string,
    adminToken: string,
    menu: Menu[],
    isAdministrator: boolean,
    serverPublicKey: string,
    isAdminPages: boolean,
    isUpdateCard: boolean,
    isUpdateLink: boolean,
    refresh: boolean,
    isInit: boolean
}

export interface IPublicStore {
    publicData: IPublic,
    setIsManagement: (value: boolean) => void,
    setMaskShow: (value: boolean) => void,
    setMaskComponentId: (value: number) => void,
    setIsAddAndEditor: (value: number) => void,
    setIsAddOrEdit: (value: number) => void,
    setIsAddUseEdit: (value: number) => void,
    setAccessToken: (value: string) => void,
    setRefreshToken: (value: string) => void,
    setAdminToken: (value: string) => void,
    setMenu: (value: Menu[]) => void,
    setIsAdministrator: (value: boolean) => void,
    setIsAdminPages: (value: boolean) => void,
    setIsUpdateCard: (value: boolean) => void,
    setIsUpdateLink: (value: boolean) => void,
    setRefresh: (value: boolean) => void,
    setIsInit: (value: boolean) => void,
}

const publicStore = (): IPublicStore => {
    return {
        publicData: {
            maskShow: false,
            isManagement: false,
            maskComponentId: 0,
            isAddAndEditor: 0,
            isAddOrEdit: 0,
            isAddUseEdit: 0,
            accessToken: '',
            refreshToken: '',
            adminToken: '',
            menu: [],
            isAdministrator: false,
            serverPublicKey: '',
            isAdminPages: false,
            isUpdateCard: true,
            isUpdateLink: true,
            refresh: false,
            isInit: false,
        },
        setIsManagement: function(value) {
            this.publicData.isManagement = value;
        },
        setMaskShow: function(value) {
            this.publicData.maskShow = value;
        },
        setMaskComponentId: function(value) {
            this.publicData.maskComponentId = value;
        },
        setIsAddAndEditor: function(value) {
            this.publicData.isAddAndEditor = value;
        },
        setIsAddOrEdit: function(value) {
            this.publicData.isAddOrEdit = value;
        },
        setIsAddUseEdit: function(value) {
            this.publicData.isAddUseEdit = value;
        },
        setAccessToken: function(value) {
            this.publicData.accessToken = value;
        },
        setRefreshToken: function(value) {
            this.publicData.refreshToken = value;
        },
        setAdminToken: function(value) {
            this.publicData.adminToken = value;
        },
        setMenu: function(value) {
            this.publicData.menu = value;
        },
        setIsAdministrator: function(value) {
            this.publicData.isAdministrator = value;
        },
        setIsAdminPages: function(value) {
            this.publicData.isAdminPages = value;
        },
        setIsUpdateCard: function(value) {
            this.publicData.isUpdateCard = value;
        },
        setIsUpdateLink: function(value) {
            this.publicData.isUpdateLink = value;
        },
        setRefresh: function(value) {
            this.publicData.refresh = value;
        },
        setIsInit: function(value) {
            this.publicData.isInit = value;
        },
    };
};

export default publicStore;