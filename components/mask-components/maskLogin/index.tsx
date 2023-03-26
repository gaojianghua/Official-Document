import type { NextPage } from 'next';
import clsx from 'clsx';
import { useStore } from '@/store';
import { Form, Input, Button, message, Spin } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import styles from './index.module.scss';
import { MAvatar } from 'components';
import { adminLogin, login } from '@/service/api';
import { useState } from 'react';
import { aesEncryteData, encryte, getKey, setSession } from '@/utils';
import { observer } from 'mobx-react-lite';
import { getRandomNum } from '@/utils'
import RealPersonVerification from 'C/mask-components/maskLogin/real-person-verification';
import { useRouter } from 'next/router'

interface UserLogin {
    mobile: string,
    password: string
}

const MaskLogin: NextPage = () => {
    const store = useStore();
    const router = useRouter()
    const arr = ['＋', '－', '＊']
    const [isCodeOrPassword, setIsCodeOrPassword] = useState(true);
    const [loading, setLoading] = useState(false);
    const [isRealPerson, setIsRealPerson] = useState(0);
    const [numberOne, setNumberOne] = useState(0);
    const [numberTwo, setNumberTwo] = useState(0);
    const [char, setChar] = useState('');
    const [formData, setFormData] = useState<UserLogin>();
    const onFinish = async (e: UserLogin) => {
        if (!e.mobile) return message.warning('请输入手机号')
        if (!/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(e.mobile)) return message.warning('请输入正确的手机号')
        if (!e.password) return message.warning('请输入密码')
        setFormData(e)
        setCalculationNumber()
    };
    // 设置计算值
    const setCalculationNumber = () => {
        let num = getRandomNum(0, 3)
        let numberOne = getRandomNum(3, 100)
        setNumberOne(numberOne)
        setChar(arr[num])
        num == 1 ? setNumberTwo(getRandomNum(0, numberOne)) : setNumberTwo(getRandomNum(0, 100))
        setLoading(true)
        setIsRealPerson(1)
    }
    // 真人验证
    const reslPerson = (e: number) => {
        let intger: number = 0
        let index: number = arr.map(item => item).indexOf(char)
        switch (index) {
            case 0:
                intger = numberOne + numberTwo
                break;
            case 1:
                intger = numberOne - numberTwo
                break;
            case 2:
                intger = numberOne * numberTwo
                break;
        }
        if (intger == e) {
            store.public.publicData.isAdministrator ? _adminLogin() : _userLogin()
            setLoading(false)
        }else {
            message.warning('答案错误')
        }
    }
    // 管理员登录
    const _adminLogin = async () => {
        let data = formData?.password
        let aes_key = getKey()
        let aesData = aesEncryteData(data!, aes_key)
        let serverRsaData = encryte(aesData, store.public.publicData.serverPublicKey)
        let form = {
            ...formData,
            password: serverRsaData,
            aes_key,
            iv: aes_key.substring(0, 16)
        }
        let res: any = await adminLogin(form);
        if (res.code == 200) {
            store.public.setAdminToken(res.data.crypto_data);
            setSession('adminToken', res.data.crypto_data)
            closeMaskLogin()
            message.success('登录成功')
            await router.push('/admin/home')
            store.public.setIsAdminPages(true)
        }
    }
    // 用户登录
    const _userLogin = async () => {
        let data = formData?.password
        let aes_key = getKey()
        let aesData = aesEncryteData(data!, aes_key)
        let serverRsaData = encryte(aesData, store.public.publicData.serverPublicKey)
        let form = {
            ...formData,
            password: serverRsaData,
            aes_key,
            iv: aes_key.substring(0, 16)
        }
        let res: any = await login(form);
        if (res.code == 200) {
            store.public.setToken(res.data.access_token);
            store.user.setUserInfo(res.data.userInfo);
            setSession('token', res.data.access_token)
            setSession('userInfo', res.data.userInfo)
            closeMaskLogin()
            message.success('登录成功')
        }
    }
    // 获取验证码
    const getCode = () => {

    };
    // 关闭登录框
    const closeMaskLogin = () => {
        store.public.setIsAdministrator(false)
        store.public.setMaskShow(false);
    };
    // 关闭验证框
    const closeVerCode = () => {
        setIsRealPerson(2)
        setLoading(false)
    }
    return (
        <div className={clsx(styles.login)}>
            <MAvatar className={styles.avatar} />
            <div className={clsx(styles.title, 'mb2', 'dflex', 'jsb', 'acenter')}>
                <div className={clsx(styles.titleText)}>{store.public.publicData.isAdministrator ? '管理员登录' : '用户登录'}</div>
                <CloseCircleOutlined className={clsx('cur')} onClick={closeMaskLogin} />
            </div>
            <Form
                name='login'
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete='off'
            >
                <Form.Item
                    className={clsx(styles.formItem)}
                    name='mobile'
                >
                    <Input type={'number'} maxLength={11} placeholder='请输入手机号!' className={clsx(styles.input, 'w100')} />
                </Form.Item>
                {
                    isCodeOrPassword ? <Form.Item
                            className={clsx(styles.formItem)}
                            name='password'
                        >
                            <Input type={'password'} placeholder='请输入密码!' className={clsx(styles.input, 'w100')} />
                        </Form.Item> :
                        <Form.Item
                            className={clsx(styles.formItem, 'w100')}
                            name='code'
                        >
                            <Input.Group className={clsx(styles.group, 'dflex')} compact>
                                <Input placeholder='请输入验证码!' className={clsx(styles.input, 'w100')} />
                                <Button type='primary' className={clsx(styles.btn)} onClick={getCode}>获取验证码</Button>
                            </Input.Group>
                        </Form.Item>
                }
                {/*<Form.Item className={clsx(styles.formItem, 'dflex', 'jcenter')}>*/}
                {/*    <Button className={clsx(styles.btn, styles.orBtn)} type='primary'*/}
                {/*            onClick={() => setIsCodeOrPassword(!isCodeOrPassword)}>*/}
                {/*        {isCodeOrPassword ? '验证码登录' : '密码登录'}*/}
                {/*    </Button>*/}
                {/*</Form.Item>*/}
                <Form.Item className={clsx(styles.formItem, 'w100', 'mt2')}>
                    <Button className={clsx(styles.btn, styles.loginBtn)} type='primary' htmlType='submit'>
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
                    ):
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
            <div className={clsx(styles.realPerson, isRealPerson == 1 ? styles.show : isRealPerson == 2 ? styles.hide : '')}>
                <RealPersonVerification closeVerCode={closeVerCode} numberOne={numberOne} numberTwo={numberTwo} char={char} reslPerson={reslPerson}></RealPersonVerification>
            </div>
        </div>
    );
};

export default observer(MaskLogin);
