import { RcFile } from 'antd/es/upload/interface';
import { message } from 'antd';
import CryptoJS from "crypto-js";
import * as forge from "node-forge";
import { PRIVATE_KEY } from '@/constant'

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

export const isWindow = () => {
    const isBrowser: boolean = ((): boolean => typeof window !== 'undefined')();
    if (isBrowser) {
        return true
    }else {
        return false
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

// 生成加密的key
export const getKey = () => {
    let random = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let str = "";
    for (let i = 0; i < 16; i++) {
        str = str + random.charAt(Math.random() * random.length);
    }
    return str;
};

/**
 * AES加密数据
 * @param {String} data 要加密的数据
 * @param {String} key AES加密密钥
 * @param {String} iv AES加密iv
 */
export const aesEncryteData = (data:string, key:string, iv:string) => {
    // 加密选项
    let CBCOptions = {
        iv: CryptoJS.enc.Utf8.parse(iv),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    };
    let encrypted = CryptoJS.AES.encrypt(
        CryptoJS.enc.Utf8.parse(data),
        CryptoJS.enc.Utf8.parse(key),
        CBCOptions
    );
    return encrypted.toString();
};


//前端做RSA加签，字符过长，node-forge不支持，请使用其他库
export const signPri = (signData: string) => {
    const priAForrmat = PRIVATE_KEY
    let privateKey = forge.pki.privateKeyFromPem(priAForrmat);
    const md = forge.md.sha256.create();
    md.update(signData, "utf8");
    let decrypttext = privateKey.sign(md);
    let baseText = forge.util.encode64(decrypttext);
    return baseText;
};

//加密
export const encryte = (str:string, pubKey:string) => {
    const pub = forge.pki.publicKeyFromPem(pubKey);
    let byteData = str;
    let encrypted = pub.encrypt(byteData);
    let encryptText = forge.util.encode64(encrypted);
    return encryptText;
};

// 对数据进行加密
export const setDataEncryte = (data: string, rsa_public_key:string) => {
    let iv = getKey()
    let aes_key = getKey()
    let aesData = aesEncryteData(data!, aes_key, iv)
    let serverRsaData = encryte(aesData, rsa_public_key)
    return {
        serverRsaData,
        aes_key,
        iv
    }
}

// 计算table高度
export const getTableScroll = (extraHeight: number = 0, id:string = '' ) => {
    if (extraHeight == 0) {
        //  默认底部分页64 + 边距10
        extraHeight = 74
    }
    let tHeader = null
    if (id) {
        tHeader = document.getElementById(id) ? document!.getElementById(id)!.getElementsByClassName("ant-table-thead")[0] : null
    } else {
        tHeader = document.getElementsByClassName("ant-table-thead")[0]
    }
    //表格内容距离顶部的距离
    let tHeaderBottom = 0
    if (tHeader) {
        tHeaderBottom = tHeader.getBoundingClientRect().bottom
    }
    //窗体高度-表格内容顶部的高度-表格内容底部的高度
    // let height = document.body.clientHeight - tHeaderBottom - extraHeight
    let height = `calc(100vh - ${tHeaderBottom + extraHeight}px)`
    return height
}