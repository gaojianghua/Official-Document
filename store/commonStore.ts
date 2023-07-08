
export interface ICommon {
    logsRefresh: boolean
    rootRefresh: boolean
    meteorShowerSwitch: boolean
}

export interface ICommonStore {
    commonData: ICommon,
    setLogsRefresh: (value: boolean) => void,
    setRootRefresh: (value: boolean) => void,
    setMeteorShowerSwitch: (value: boolean) => void,
}

const commonStore = (): ICommonStore => {
    return {
        commonData: {
            logsRefresh: false,
            rootRefresh: false,
            meteorShowerSwitch: true
        },
        setLogsRefresh: function(value) {
            this.commonData.logsRefresh = value;
        },
        setRootRefresh: function(value) {
            this.commonData.rootRefresh = value;
        },
        setMeteorShowerSwitch: function(value) {
            this.commonData.meteorShowerSwitch = value;
        }
    };
};

export default commonStore;
