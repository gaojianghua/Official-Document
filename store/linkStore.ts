import { ULink, SLink } from '@/types/res';

export interface ILink {
    tmpLink: ULink & SLink,
    isLOrR: number, //1工具栏 2便捷栏
    success: boolean, //新增或编辑是否成功
    refresh: boolean
}

export interface ILinkStore {
    linkData: ILink,
    setTmpLink: (value: ULink & SLink) => void,
    setIsLOrR: (value: number) => void,
    setSuccess: (value: boolean) => void,
    setRefresh: (value: boolean) => void,
}

const linkStore = (): ILinkStore => {
    return {
        linkData: {
            tmpLink: {},
            isLOrR: 0,
            success: false,
            refresh: false,
        },
        setTmpLink: function(value) {
            this.linkData.tmpLink = value;
        },
        setIsLOrR: function(value) {
            this.linkData.isLOrR = value;
        },
        setSuccess: function(value) {
            this.linkData.success = value;
        },
        setRefresh: function(value) {
            this.linkData.refresh = value;
        }
    };
};

export default linkStore;