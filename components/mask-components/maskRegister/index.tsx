import type { NextPage } from 'next';
import clsx from 'clsx';
import { useStore } from '@/store';
import { Form, Input, Button, message, Spin } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import styles from './index.module.scss';
import { getSmsCode, register } from '@/service/api';
import { ChangeEvent, useState } from 'react';
import RealPersonVerification from 'C/mask-components/maskLogin/real-person-verification';
import { setDataEncryte } from '@/utils';

interface UserRegister {
    mobile: number,
    password: string
    name: string
    more_password: string,
    code: string
}

const MaskRegister: NextPage = () => {
    const store = useStore();
    const [loading, setLoading] = useState(false);
    const [isRealPerson, setIsRealPerson] = useState(0);
    const [calculation, setCalculation] = useState(true);
    const [isGetSms, setIsGetSms] = useState(true);
    const [smsText, setSmsText] = useState(59);
    const [phone, setPhone] = useState('');
    const [formData, setFormData] = useState<UserRegister>();

    const onFinish = async (e: UserRegister) => {
        if (!e.mobile) return message.warning('请输入手机号');
        if (!/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(String(e.mobile))) return message.warning('请输入正确的手机号');
        if (!e.password) return message.warning('请输入密码');
        if (!e.more_password) return message.warning('请再次输入密码');
        if (e.password != e.more_password) return message.warning('两次密码不一致');
        if (!e.name) return message.warning('请输入昵称');
        if (!e.code) return message.warning('请输入短信验证码');
        setFormData(e)
        setCalculationNumber()
    };
    // 控制验证计算值
    const setCalculationNumber = () => {
        setCalculation(!calculation)
        setLoading(true)
        setIsRealPerson(1)
    }
    // 真人验证
    const reslPerson = (e: boolean, jsonObj: string) => {
        if (e) {
            _register(jsonObj)
        }else {
            message.warning('答案错误')
        }
    }
    // 用户注册
    const _register = async (jsonObj:string) => {
        let data = formData?.password!
        let more_data = formData?.more_password!
        let encryteData = setDataEncryte(data, store.public.publicData.serverPublicKey)
        let moreEncryteData = setDataEncryte(more_data, store.public.publicData.serverPublicKey)
        let jsonObjEncryteData = setDataEncryte(jsonObj, store.public.publicData.serverPublicKey)
        let form = {
            ...formData,
            mobile: Number(formData?.mobile),
            password: encryteData.serverRsaData,
            aes_key: encryteData.aes_key,
            iv: encryteData.iv,
            more_password: moreEncryteData.serverRsaData,
            more_aes_key: moreEncryteData.aes_key,
            more_iv: moreEncryteData.iv,
            json_obj_data: jsonObjEncryteData.serverRsaData,
            json_obj_aes: jsonObjEncryteData.aes_key,
            json_obj_iv: jsonObjEncryteData.iv
        }
        let res: any = await register(form);
        if (res.code == 200) {
            store.public.setMaskShow(false);
            setLoading(false)
            message.success('注册成功');
        }
    }
    // 关闭注册框
    const closeMaskRegister = () => {
        store.public.setMaskShow(false);
    };
    // 关闭验证框
    const closeVerCode = () => {
        setIsRealPerson(2)
        setLoading(false)
    }
    // 手机号输入框变化
    const phoneChange = (e:ChangeEvent<HTMLInputElement>) => {
        setPhone(e.target.value)
    }
    // 获取验证码
    const getCode = async () => {
        if (!isGetSms) return;
        if (!phone) return message.warning('请输入手机号');
        if (!/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(phone)) return message.warning('请输入正确的手机号');
        let res: any = await getSmsCode({
            mobile: Number(phone)
        });
        if (res.code == 200) {
            let num = 59
            setIsGetSms(false)
            let time = setInterval(() => {
                num--;
                if (num == -1) {
                    setIsGetSms(true);
                    num = 59
                    clearInterval(time);
                }
                setSmsText(num);
            }, 1000);
            message.success('验证码发送成功');
        }
    };
    return (
        <div className={clsx(styles.register)}>
            <div className={clsx(styles.title, 'mb2', 'dflex', 'jsb', 'acenter')}>
                <div className={clsx(styles.titleText)}>用户注册</div>
                <CloseCircleOutlined className={clsx('cur')} onClick={closeMaskRegister} />
            </div>
            <Form
                name='register'
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete='off'
            >
                <Form.Item name="username" hidden>
                    <Input autoComplete="username" />
                </Form.Item>
                <Form.Item
                    className={clsx(styles.formItem)}
                    name='mobile'
                >
                    <Input type={'number'} maxLength={11} placeholder='请输入手机号!'
                           className={clsx(styles.input, 'w100')} onChange={phoneChange} />
                </Form.Item>
                <Form.Item
                    className={clsx(styles.formItem, 'w100')}
                    name='password'
                >
                    <Input type={'password'} placeholder='请输入密码!' className={clsx(styles.input, 'w100')} autoComplete="new-password" />
                </Form.Item>
                <Form.Item
                    className={clsx(styles.formItem, 'w100')}
                    name='more_password'
                >
                    <Input type={'password'} placeholder='请再次输入密码!' className={clsx(styles.input, 'w100')} autoComplete="new-password" />
                </Form.Item>
                <Form.Item
                    className={clsx(styles.formItem, 'w100')}
                    name='name'
                >
                    <Input type={'text'} placeholder='请输入昵称!' className={clsx(styles.input, 'w100')} />
                </Form.Item>
                <Form.Item
                    className={clsx(styles.formItem, 'w100')}
                    name='code'
                >
                    <div className={clsx(styles.group, 'dflex')}>
                        <Input placeholder='请输入验证码!' className={clsx(styles.input, 'w100')} />
                        <Button type='primary' className={clsx(styles.btn, 'index10')} onClick={getCode}>{isGetSms ? '获取验证码' : smsText + ' S'}</Button>
                    </div>
                </Form.Item>
                <Form.Item className={clsx(styles.formItem, 'w100', 'mt2')}>
                    <Button className={clsx(styles.btn, styles.loginBtn)} type='primary' htmlType='submit'>
                        {loading ?
                            <div className={clsx('dflex', 'acenter', 'jcenter')}>
                                <p>刷新计算</p>
                                <p className={clsx(styles.loading)}>注册中...</p>
                                <Spin className={clsx(styles.spin)} />
                            </div>
                            :
                            '立即注册'
                        }
                    </Button>
                </Form.Item>
            </Form>
            <div className={clsx(styles.agreement, 'dflex', 'acenter', 'jcenter', 'mt2')}>
                <span>注册登录即表示同意</span>
                <span className={clsx('ml1', 'cur')}><a rel='noreferrer' className={clsx(styles.agreChild)}
                                                        target='_blank' href='#'>用户协议</a></span>
                <span className={clsx('ml1', 'cur')}><a rel='noreferrer' className={clsx(styles.agreChild)}
                                                        target='_blank' href='#'>隐私政策</a></span>
            </div>
            <div className={clsx(styles.realPerson, isRealPerson == 1 ? styles.show : isRealPerson == 2 ? styles.hide : '')}>
                <RealPersonVerification calculation={calculation} closeVerCode={closeVerCode} reslPerson={reslPerson}></RealPersonVerification>
            </div>
        </div>
    );
};

export default MaskRegister;
