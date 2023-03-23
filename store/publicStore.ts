import { Menu } from '@/types/res';

export interface IPublic {
    isManagement: boolean,
    maskShow: boolean,
    maskComponentId: number, // 1login, 2mark
    isAddAndEditor: number, // 1add, 2editor
    isAddOrEdit: number, // 1add, 2editor
    token: string,
    adminToken: string,
    menu: Menu[],
    isAdministrator: boolean,
    publicKey: string
}

export interface IPublicStore {
    publicData: IPublic,
    setIsManagement: (value: boolean) => void,
    setMaskShow: (value: boolean) => void,
    setMaskComponentId: (value: number) => void,
    setIsAddAndEditor: (value: number) => void,
    setIsAddOrEdit: (value: number) => void,
    setToken: (value: string) => void,
    setAdminToken: (value: string) => void,
    setMenu: (value: Menu[]) => void,
    setIsAdministrator: (value: boolean) => void
}

const publicStore = (): IPublicStore => {
    return {
        publicData: {
            maskShow: false,
            isManagement: false,
            maskComponentId: 0,
            isAddAndEditor: 0,
            isAddOrEdit: 0,
            token: '',
            adminToken: '',
            menu: [],
            isAdministrator: false,
            publicKey: ''
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
        setToken: function(value) {
            this.publicData.token = value;
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
    };
};

export default publicStore;