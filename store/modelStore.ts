
export interface IModel {
    tmpData: any,
    children: any,
    title: string,
    cancel: () => void,
    confirm: () => void,
    success: boolean,
    isCardOrLink: boolean
}

export interface IModelStore {
    modelData: IModel,
    setTmpData: (value: any) => void,
    setChildren: (value: any) => void,
    setTitle: (value: any) => void,
    setCancel: (value: ()=>void) => void,
    setConfirm: (value: ()=>void) => void,
    setSuccess: (value: boolean) => void,
    setIsCardOrLink: (value: boolean) => void,
}

const modelStore = (): IModelStore => {
    return {
        modelData: {
            tmpData: {},
            children: '',
            title: '提示',
            cancel: () => {},
            confirm: () => {},
            success: false,
            isCardOrLink: false
        },
        setTmpData: function(value) {
            this.modelData.tmpData = value;
        },
        setChildren: function(value) {
            this.modelData.children = value;
        },
        setTitle: function(value) {
            this.modelData.title = value;
        },
        setCancel: function(value) {
            this.modelData.cancel = value;
        },
        setConfirm: function(value) {
            this.modelData.confirm = value;
        },
        setSuccess: function(value) {
            this.modelData.success = value;
        },
        setIsCardOrLink: function(value) {
            this.modelData.isCardOrLink = value;
        }
    };
};

export default modelStore;