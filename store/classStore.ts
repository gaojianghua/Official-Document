import { Menu } from '@/types/res';

export interface IClass {
    tmpClass: Menu,
    isOneOrTwo: number, //1一级 2二级
    isAddOrEdit: number, //1新增 2编辑
    success: boolean, //新增或编辑是否成功
}

export interface IClassStore {
    classData: IClass,
    setTmpClass: (value: Menu) => void,
    setIsOneOrTwo: (value: number) => void,
    setSuccess: (value: boolean) => void,
    setIsAddOrEdit: (value: number) => void,
}

const classStore = (): IClassStore => {
    return {
        classData: {
            tmpClass: {},
            isOneOrTwo: 1,
            success: false,
            isAddOrEdit: 1
        },
        setTmpClass: function(value) {
            this.classData.tmpClass = value;
        },
        setIsOneOrTwo: function(value) {
            this.classData.isOneOrTwo = value;
        },
        setSuccess: function(value) {
            this.classData.success = value;
        },
        setIsAddOrEdit: function(value) {
            this.classData.isAddOrEdit = value;
        }
    };
};

export default classStore;