import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/store';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { Avatar, Button, Form, message } from 'antd';
import { EnvironmentOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { MAvatar } from 'components';
import styles from './index.module.scss';
import { removeSession } from '@/utils';
import { logout } from '@/service/api';


const Navbar: NextPage = () => {
    const store = useStore();
    const { isManagement, accessToken } = store.public.publicData;
    const [isSet, setIsSet] = useState(false);
    const { pathname } = useRouter();
    const [managementText, setManagementText] = useState('管理印记');
    const { isShowMenu } = store.user.userData

    useEffect(() => {
        if (isManagement) {
            setManagementText('保存修改');
        } else {
            setManagementText('管理印记');
        }
    }, [isManagement]);

    useEffect(() => {
        if (store.public.publicData.maskComponentId == 10 && !store.public.publicData.maskShow) {
            setIsSet(false)
        }
    }, [store.public.publicData.maskShow, store.public.publicData.maskComponentId])
    // 打开编辑印记
    const openManagement = () => {
        if (!accessToken) return
        store.public.setIsManagement(!isManagement);
    };
    // 打开登录弹框
    const openLogin = () => {
        store.public.setMaskComponentId(1);
        store.public.setMaskShow(true);
    };
    // 打开注册弹框
    const openRegister = () => {
        store.public.setMaskComponentId(3);
        store.public.setMaskShow(true);
    };
    // 修改资料
    const updateInfo = () => {
        store.public.setMaskComponentId(6);
        store.public.setMaskShow(true);
    };
    // 申请投稿
    const apply = () => {
        if (store.user.userData.userInfo.is_admin === 1) {
            store.public.setIsAdministrator(true)
            store.public.setMaskComponentId(1);
            store.public.setMaskShow(true);
        } else {
            store.public.setMaskComponentId(5);
            store.public.setMaskShow(true);
        }
    };
    // 退出登录
    const openLogout = async () => {
        let res: any = await logout()
        if (res.code == 200) {
            store.public.setAccessToken('')
            store.public.setRefreshToken('')
            store.user.setUserInfo({})
            removeSession('accessToken')
            removeSession('refreshToken')
            removeSession('userInfo')
            message.success('退出登录成功')
        }
    };
    // 打开定位地图
    const openMap = () => {
        if (!store.user.userData.userInfo.city) return
        store.public.setMaskComponentId(8);
        store.public.setMaskShow(true);
    }
    // 头像信息开关
    const showHide = (e: any) => {
        e.stopPropagation()
        store.user.setIsShowMenu(!isShowMenu)
    }
    // 设置按钮
    const openSet = () => {
        store.public.setMaskComponentId(10)
        store.public.setMaskShow(true)
        setIsSet(true)
    }
    return (
        <div className={styles.navbar}>
            <MAvatar className={clsx(styles.avatar, 'flexshrink')} />
            <section className={clsx(styles.logoArea, 'cur')}>Wolffy</section>
            <section className={styles.linkArea}>
                {store.public.publicData.menu?.map((nav) => (
                    <Link key={nav?.id} href={nav?.router!}>
                        <div
                            className={clsx(styles.item, 'flexshrink dflex acenter', pathname === nav.router ? styles.active : styles.menu)}>
                            {nav?.class_name}
                        </div>
                    </Link>
                ))}
            </section>
            <section className={styles.operationArea}>
                {
                    pathname === '/home' && accessToken ? (
                        <Form>
                            <Form.Item className={clsx(styles.formItem)}>
                                <Button className={clsx(styles.btn, styles.tabBtn)} type='primary' onClick={openManagement}>
                                    {managementText}
                                </Button>
                            </Form.Item>
                        </Form>
                    ) : <></>
                }
                <div className={clsx(styles.switch, 'dflex', 'acenter', 'cur', 'jcenter', 'ml2', !isSet ? '' : styles.unflod)} onClick={openSet}>
                    <SettingOutlined className={styles.icon} />
                </div>
                {
                    store.public.publicData.accessToken ? <div className={clsx('positionrelative', 'ml2', 'cur')}>
                        <div onClick={showHide}>
                            <Avatar className={styles.avBorder1} src={store.user.userData.userInfo.avatar} icon={store.user.userData.userInfo.avatar ? '' : <UserOutlined />}
                                size={50} /></div>
                        {
                            isShowMenu ?
                                <div className={clsx(styles.userMenu, 'positionabsolute', 'dflex', 'flexcolumn', 'acenter')}>
                                    <Avatar className={styles.avBorder2} icon={store.user.userData.userInfo.avatar ? '' : <UserOutlined />}
                                        src={store.user.userData.userInfo.avatar} size={80} />
                                    <div className={clsx('mt1', 'mainColor', 'fontdr')}>
                                        {store.user.userData.userInfo.name}
                                    </div>
                                    <div className={clsx('mt1', 'textmuted', 'textcenter')}>
                                        {store.user.userData.userInfo.signature}
                                    </div>
                                    <div className={clsx('mt1', 'dflex', 'jsb', 'acenter')} onClick={openMap}>
                                        <EnvironmentOutlined className={clsx('fontdr', 'mr1')} />
                                        {store.user.userData.userInfo.city ?
                                            <span>{store.user.userData.userInfo.province} - {store.user.userData.userInfo.city}</span> : <span>- - -</span>
                                        }
                                    </div>
                                    <Form>
                                        <Form.Item className={clsx(styles.formItem, styles.menuItem, 'mt1')}>
                                            <Button className={clsx(styles.btn)} type='primary' onClick={updateInfo}>
                                                修改资料
                                            </Button>
                                        </Form.Item>
                                        <Form.Item className={clsx(styles.formItem, styles.menuItem, 'mt1')}>
                                            <Button className={clsx(styles.btn)} type='primary' onClick={apply}>
                                                {store.user.userData.userInfo.is_admin === 1 ? '系统管理' : '投稿申请'}
                                            </Button>
                                        </Form.Item>
                                        <Form.Item className={clsx(styles.formItem, styles.menuItem, 'mt1')}>
                                            <Button className={clsx(styles.btn)} type='primary' onClick={openLogout}>
                                                退出登录
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </div>
                                : <></>
                        }
                    </div>
                        : <>
                            <Form className={clsx('dflex')}>
                                <Form.Item className={clsx(styles.formItem, 'wauto', 'ml2')}>
                                    <Button className={clsx(styles.btn, styles.tabBtn)} type='primary' onClick={openLogin}>
                                        登录
                                    </Button>
                                </Form.Item>
                                <Form.Item className={clsx(styles.formItem, 'wauto', 'ml2')}>
                                    <Button className={clsx(styles.btn, styles.tabBtn)} type='primary' onClick={openRegister}>
                                        注册
                                    </Button>
                                </Form.Item>
                            </Form>
                        </>
                }
            </section>
        </div>
    );
};

export default observer(Navbar);
