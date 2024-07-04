import type { NextPage } from 'next';
import clsx from 'clsx';
import { useStore } from '@/store';
import { Form, Input, Button, message, Spin } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import styles from './index.module.scss';
import {
    adminLoginCode, adminLoginEmail,
    adminLoginPassword, getEmailCode,
    getSmsCode,
    loginCode, loginEmail,
    loginPassword,
} from '@/service/api';
import { ChangeEvent, useState } from 'react';
import { setDataEncryte, setSession } from '@/utils';
import { observer } from 'mobx-react-lite';
import RealPersonVerification from 'C/mask-components/maskLogin/real-person-verification';
import { useRouter } from 'next/router';

interface UserLogin {
    mobile?: number,
    password?: string,
    code?: string,
    email?: string
}

const MaskLogin: NextPage = () => {
    const store = useStore();
    const router = useRouter();
    const [isCodeOrPassword, setIsCodeOrPassword] = useState(true);
    const [loading, setLoading] = useState(false);
    const [isRealPerson, setIsRealPerson] = useState(0);
    const [isTypeCode, setIsTypeCode] = useState(0);
    const [calculation, setCalculation] = useState(true);
    const [isGetSms, setIsGetSms] = useState(true);
    const [smsText, setSmsText] = useState(59);
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [formData, setFormData] = useState<UserLogin>();
    const onFinish = async (e: any) => {
        if (isTypeCode === 0) {
            if (!e.mobile) return message.warning('请输入手机号');
            if (!/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(e.mobile)) return message.warning('请输入正确的手机号');
        } else {
            if (!e.email) return message.warning('请输入邮箱');
            if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email)) return message.warning('请输入正确的邮箱');
        }
        if (isCodeOrPassword) {
            if (!e.password) return message.warning('请输入密码');
        } else {
            if (!e.code) return message.warning(isTypeCode === 0 ? '请输入短信验证码' : '请输入邮箱验证码');
        }
        setFormData(e);
        setCalculationNumber();
    };
    // 控制验证计算值
    const setCalculationNumber = () => {
        setCalculation(!calculation);
        setLoading(true);
        setIsRealPerson(1);
    };
    // 真人验证
    const reslPerson = (e: boolean, jsonObj: string) => {
        if (e) {
            store.public.publicData.isAdministrator ? _adminLogin(jsonObj) : _userLogin(jsonObj);
        } else {
            message.warning('答案错误');
        }
    };
    // 管理员登录
    const _adminLogin = async (jsonObj: string) => {
        let res: any;
        let form: any = {};
        let jsonObjEncryteData = setDataEncryte(jsonObj, store.public.publicData.serverPublicKey);
        if (isCodeOrPassword) {
            let data = formData?.password!;
            let encryteData = setDataEncryte(data, store.public.publicData.serverPublicKey);
            form = {
                ...formData,
                mobile: Number(formData?.mobile),
                password: encryteData.serverRsaData,
                aes_key: encryteData.aes_key,
                iv: encryteData.iv,
                json_obj_data: jsonObjEncryteData.serverRsaData,
                json_obj_aes: jsonObjEncryteData.aes_key,
                json_obj_iv: jsonObjEncryteData.iv,
            };
            res = await adminLoginPassword(form);
        } else {
            if (isTypeCode === 0) {
                form = {
                    ...formData,
                    mobile: Number(formData?.mobile),
                    json_obj_data: jsonObjEncryteData.serverRsaData,
                    json_obj_aes: jsonObjEncryteData.aes_key,
                    json_obj_iv: jsonObjEncryteData.iv,
                };
                res = await adminLoginCode(form);
            } else {
                form = {
                    ...formData,
                    json_obj_data: jsonObjEncryteData.serverRsaData,
                    json_obj_aes: jsonObjEncryteData.aes_key,
                    json_obj_iv: jsonObjEncryteData.iv,
                };
                res = await adminLoginEmail(form);
            }
        }
        if (res.code == 200) {
            store.public.setAdminToken(res.data.crypto_data);
            setSession('adminToken', res.data.crypto_data);
            setLoading(false);
            closeMaskLogin();
            message.success('登录成功');
            await router.push('/admin/home');
            store.public.setIsAdminPages(true);
        }
    };
    // 用户登录
    const _userLogin = async (jsonObj: string) => {
        let res: any;
        let form: any = {};
        let jsonObjEncryteData = setDataEncryte(jsonObj, store.public.publicData.serverPublicKey);
        if (isCodeOrPassword) {
            let data = formData?.password!;
            let encryteData = setDataEncryte(data, store.public.publicData.serverPublicKey);
            form = {
                ...formData,
                mobile: Number(formData?.mobile),
                password: encryteData.serverRsaData,
                aes_key: encryteData.aes_key,
                iv: encryteData.iv,
                json_obj_data: jsonObjEncryteData.serverRsaData,
                json_obj_aes: jsonObjEncryteData.aes_key,
                json_obj_iv: jsonObjEncryteData.iv,
            };
            res = await loginPassword(form);
        } else {
            if (isTypeCode === 0) {
                form = {
                    ...formData,
                    mobile: Number(formData?.mobile),
                    json_obj_data: jsonObjEncryteData.serverRsaData,
                    json_obj_aes: jsonObjEncryteData.aes_key,
                    json_obj_iv: jsonObjEncryteData.iv,
                };
                res = await loginCode(form);
            } else {
                form = {
                    ...formData,
                    json_obj_data: jsonObjEncryteData.serverRsaData,
                    json_obj_aes: jsonObjEncryteData.aes_key,
                    json_obj_iv: jsonObjEncryteData.iv,
                };
                res = await loginEmail(form);
            }
        }
        if (res.code == 200) {
            store.public.setAccessToken(res.data.access_token);
            store.public.setRefreshToken(res.data.refresh_token);
            store.user.setUserInfo(res.data.userInfo);
            setSession('accessToken', res.data.access_token);
            setSession('refreshToken', res.data.refresh_token);
            setSession('userInfo', res.data.userInfo);
            setLoading(false);
            closeMaskLogin();
            message.success('登录成功');
        }
    };
    // 手机号输入框变化
    const phoneOrEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        isTypeCode === 0 ? setPhone(e.target.value) : setEmail(e.target.value)
    };
    // 获取验证码
    const getCode = async () => {
        if (!isGetSms) return;
        let res: any
        if (isTypeCode === 0) {
            if (!phone) return message.warning('请输入手机号');
            if (!/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(phone)) return message.warning('请输入正确的手机号');
            res = await getSmsCode({
                mobile: Number(phone),
            });
        } else {
            if (!email) return message.warning('请输入邮箱');
            if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email)) return message.warning('请输入正确的邮箱');
            res = await getEmailCode({
                email
            });
        }
        if (res.code == 200) {
            let num = 59;
            setIsGetSms(false);
            let time = setInterval(() => {
                num--;
                if (num == -1) {
                    setIsGetSms(true);
                    num = 59;
                    clearInterval(time);
                }
                setSmsText(num);
            }, 1000);
            message.success('验证码发送成功');
        }
    };
    // 关闭登录框
    const closeMaskLogin = () => {
        store.public.setIsAdministrator(false);
        store.public.setMaskShow(false);
    };
    // 关闭验证框
    const closeVerCode = () => {
        setIsRealPerson(2);
        setLoading(false);
    };
    // 切换密码或验证码
    const switchCodeOrPassword = () => {
        setIsCodeOrPassword(!isCodeOrPassword)
        setIsTypeCode(0)
    };
    return (
        <div className={clsx(styles.login)}>
            <div className={clsx(styles.title, 'mb2', 'dflex', 'jsb', 'acenter')}>
                <div
                    className={clsx(styles.titleText)}>{store.public.publicData.isAdministrator ? '管理员登录' : '用户登录'}</div>
                <CloseCircleOutlined className={clsx('cur')} onClick={closeMaskLogin} />
            </div>
            <Form
                name='login'
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete='off'
            >
                <Form.Item name='username' hidden>
                    <Input autoComplete='username' />
                </Form.Item>
                <Form.Item
                    className={clsx(styles.formItem)}
                    name={isTypeCode === 0 ? 'mobile' : 'email'}
                >
                    <div className={clsx(styles.group, 'dflex')}>
                        <Input type={isTypeCode === 0 ? 'number' : 'email'} maxLength={isTypeCode === 0 ? 11 : 50} placeholder={isTypeCode === 0 ? '请输入手机号!' : '请输入邮箱'}
                            className={clsx(styles.input, 'w100')} onChange={phoneOrEmailChange} />
                        {
                            !isCodeOrPassword ?
                                <div className={clsx('dflex')}>
                                    <Button type='primary' className={clsx(styles.codel, 'index10', isTypeCode === 0 ? styles.activeCode : '')}
                                        onClick={() => setIsTypeCode(0)}>手机</Button>
                                    <Button type='primary' className={clsx(styles.coder, 'index10', isTypeCode === 1 ? styles.activeCode : '')}
                                        onClick={() => setIsTypeCode(1)}>邮箱</Button>
                                </div> : <></>
                        }
                    </div>
                </Form.Item>
                <Form.Item
                    className={clsx(styles.formItem, isCodeOrPassword ? 'dblock' : 'dflexNone')}
                    name='password'
                >
                    <Input type='password' placeholder='请输入密码!' className={clsx(styles.input, 'w100')}
                        autoComplete='new-password' />
                </Form.Item>
                <Form.Item
                    className={clsx(styles.formItem, !isCodeOrPassword ? 'dblock' : 'dflexNone')}
                    name='code'
                >
                    <div className={clsx(styles.group, 'dflex')}>
                        <Input type={'number'} maxLength={6} placeholder='请输入验证码!'
                            className={clsx(styles.input, 'w100')} />
                        <Button type='primary' className={clsx(styles.btn, 'index10')}
                            onClick={getCode}>{isGetSms ? '获取验证码' : smsText + ' S'}</Button>
                    </div>
                </Form.Item>
                <Form.Item className={clsx(styles.formItem, 'dflex', 'jcenter')}>
                    <Button className={clsx(styles.btn, styles.orBtn)} type='primary'
                        onClick={switchCodeOrPassword}>
                        {isCodeOrPassword ? '验证码登录' : '密码登录'}
                    </Button>
                </Form.Item>
                <Form.Item className={clsx(styles.formItem, 'w100')}>
                    <Button className={clsx(styles.btn, styles.loginBtn)} type='primary' htmlType='submit'
                        onMouseDown={e => e.preventDefault()}>
                        {loading ?
                            <div className={clsx('dflex', 'acenter', 'jcenter')}>
                                <p>刷新计算</p>
                                <p className={clsx(styles.loading)}>登录中...</p>
                                <Spin className={clsx(styles.spin)} />
                            </div>
                            :
                            '立即登录'
                        }
                    </Button>
                </Form.Item>
            </Form>
            {
                store.public.publicData.isAdministrator ?
                    (
                        <div className={clsx(styles.agreement, 'dflex', 'acenter', 'jcenter', 'mt2', 'textdanger')}>
                            <span>警告：该登录系统只允许管理员登录</span>
                        </div>
                    ) :
                    (
                        <div className={clsx(styles.agreement, 'dflex', 'acenter', 'jcenter', 'mt2')}>
                            <span>注册登录即表示同意</span>
                            <span className={clsx('ml1', 'cur')}><a rel='noreferrer' className={clsx(styles.agreChild)}
                                target='_blank' href='#'>用户协议</a></span>
                            <span className={clsx('ml1', 'cur')}><a rel='noreferrer' className={clsx(styles.agreChild)}
                                target='_blank' href='#'>隐私政策</a></span>
                        </div>
                    )
            }
            <div
                className={clsx(styles.realPerson, isRealPerson == 1 ? styles.show : isRealPerson == 2 ? styles.hide : '')}>
                <RealPersonVerification calculation={calculation} closeVerCode={closeVerCode}
                    reslPerson={reslPerson}></RealPersonVerification>
            </div>
        </div>
    );
};

export default observer(MaskLogin);
