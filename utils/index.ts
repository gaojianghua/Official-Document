import { RcFile } from 'antd/es/upload/interface';
import { message } from 'antd';

export const getSession = (key: string) => {
    if (!key) {
        return
    }
    const isBrowser: boolean = ((): boolean => typeof window !== 'undefined')();
    return isBrowser ? window['localStorage'].getItem(key): '';
};
export const setSession = (key: string, value: any) => {
    if (!key) {
        return
    }
    const isBrowser: boolean = ((): boolean => typeof window !== 'undefined')();
    if (isBrowser) {
        Object.prototype.toString.call(value) === '[object Object]' ?
        window['localStorage'].setItem(key, JSON.stringify(value)) :
            window['localStorage'].setItem(key, value)
    }
};
export const removeSession = (key: string) => {
    const isBrowser: boolean = ((): boolean => typeof window !== 'undefined')();
    if (isBrowser) {
        window['localStorage'].removeItem(key)
    }
};

export const isWindow = (key: any) => {
    const isBrowser: boolean = ((): boolean => typeof window !== 'undefined')();
    if (isBrowser) {
        return key
    }
};

export const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type
    // const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    // if (!isJpgOrPng) {、、
    //     message.error('You can only upload JPG/PNG file!');
    // }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};

//获取指定大小区间的随机数
export const getRandomNum = (min:number, max:number) => {
    return Math.floor(Math.random() * (max - min)) + min
}