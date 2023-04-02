
export interface IModel {
    tmpData: any,
    children: any,
    title: string,
    cancel: () => void,
    confirm: (v:number) => void
}

export interface IModelStore {
    modelData: IModel,
    setTmpData: (value: any) => void,
    setChildren: (value: any) => void,
    setTitle: (value: any) => void,
    setCancel: (value: ()=>void) => void,
    setConfirm: (value: ()=>void) => void,
}

const modelStore = (): IModelStore => {
    return {
        modelData: {
            tmpData: {},
            children: '',
            title: '提示',
            cancel: () => {},
            confirm: (v:number) => {}
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
        }
    };
};

export default modelStore;