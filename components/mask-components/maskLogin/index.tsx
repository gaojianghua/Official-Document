import type { NextPage } from 'next';
import clsx from 'clsx';
import { useStore } from '@/store';
import { Form, Input, Button, message } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import styles from './index.module.scss';
import { MAvatar } from 'components';
import { adminLogin, login } from '@/service/api';
import { useState } from 'react';
import { setSession } from '@/utils';
import { observer } from 'mobx-react-lite';
import RealPersonVerification from 'C/mask-components/maskLogin/real-person-verification';

interface UserLogin {
    mobile: string,
    password: string
}

const MaskLogin: NextPage = () => {
    const store = useStore();
    const [isCodeOrPassword, setIsCodeOrPassword] = useState(true);
    const [isRealPerson, setIsRealPerson] = useState(0);
    const onFinish = async (e: UserLogin) => {
        if (!e.mobile) return message.warning('请输入手机号')
        if (!/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(e.mobile)) return message.warning('请输入正确的手机号')
        if (!e.password) return message.warning('请输入密码')
        setIsRealPerson(1)
        // store.public.publicData.isAdministrator ? await _adminLogin(e) : await _userLogin(e)
    };
    // 真人验证
    const reslPerson = (e: number) => {
        console.log(e)
    }
    // 管理员登录
    const _adminLogin = async (e: UserLogin) => {
        let res: any = await adminLogin(e);
        if (res.code == 200) {
            store.public.setAdminToken(res.data.admin_token);
            setSession('adminToken', res.data.admin_token)
            closeMaskLogin()
            message.success('登录成功')
        }
    }
    // 用户登录
    const _userLogin = async (e: UserLogin) => {
        let res: any = await login(e);
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
                        立即登录
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
                <RealPersonVerification reslPerson={reslPerson}></RealPersonVerification>
            </div>
        </div>
    );
};

export default observer(MaskLogin);
