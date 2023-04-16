import { Mark } from '@/types/res';

export interface IMark {
    tmpMark: Mark,
    success: boolean, //新增或编辑是否成功
    refresh: boolean
}

export interface IMarkStore {
    markData: IMark,
    setTmpMark: (value: Mark) => void,
    setSuccess: (value: boolean) => void,
    setRefresh: (value: boolean) => void,
}

const markStore = (): IMarkStore => {
    return {
        markData: {
            tmpMark: {},
            success: false,
            refresh: false
        },
        setTmpMark: function(value) {
            this.markData.tmpMark = value;
        },
        setSuccess: function(value) {
            this.markData.success = value;
        },
        setRefresh: function(value) {
            this.markData.refresh = value;
        }
    };
};

export default markStore;