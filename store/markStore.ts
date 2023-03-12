import { Mark } from '@/types/res';

export interface IMark {
    tmpMark: Mark,
    success: boolean, //新增或编辑是否成功
}

export interface IMarkStore {
    markData: IMark,
    setTmpMark: (value: Mark) => void,
    setSuccess: (value: boolean) => void,
}

const markStore = (): IMarkStore => {
    return {
        markData: {
            tmpMark: {},
            success: false
        },
        setTmpMark: function(value) {
            this.markData.tmpMark = value;
        },
        setSuccess: function(value) {
            this.markData.success = value;
        }
    };
};

export default markStore;