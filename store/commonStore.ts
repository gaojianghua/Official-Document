
export interface ICommon {
    logsRefresh: boolean
    rootRefresh: boolean
}

export interface ICommonStore {
    commonData: ICommon,
    setLogsRefresh: (value: boolean) => void,
    setRootRefresh: (value: boolean) => void,
}

const commonStore = (): ICommonStore => {
    return {
        commonData: {
            logsRefresh: false,
            rootRefresh: false,
        },
        setLogsRefresh: function(value) {
            this.commonData.logsRefresh = value;
        },
        setRootRefresh: function(value) {
            this.commonData.rootRefresh = value;
        }
    };
};

export default commonStore;
