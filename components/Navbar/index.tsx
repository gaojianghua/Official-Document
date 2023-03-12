import { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/store';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { Avatar, Button, Form, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { MAvatar } from 'components';
import styles from './index.module.scss';
import { removeSession } from '@/utils';
import { logout } from '@/service/api';


const Navbar: NextPage = () => {
    const store = useStore();
    const { isManagement, token } = store.public.publicData;
    const { pathname } = useRouter();
    const [managementText, setManagementText] = useState('管理印记');
    const [isShowMenu, setIsShowMenu] = useState(false);

    useEffect(() => {
        if (isManagement) {
            setManagementText('保存修改');
        } else {
            setManagementText('管理印记');
        }
    }, [isManagement]);
    // 打开编辑印记
    const openManagement = () => {
        if (!token) return
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
        store.public.setMaskComponentId(5);
        store.public.setMaskShow(true);
    };
    // 退出登录
    const openLogout = async () => {
        let res: any = await logout()
        if (res.code == 200) {
            store.public.setToken('')
            store.user.setUserInfo({})
            removeSession('token')
            removeSession('userInfo')
            message.success('退出登录成功')
        }
    };
    return (
        <div className={styles.navbar}>
            <MAvatar className={clsx(styles.avatar, 'flexshrink')} />
            <section className={clsx(styles.logoArea, 'cur')}>Wolffy</section>
            <section className={styles.linkArea}>
                {store.public.publicData.menu?.map((nav) => (
                    <Link key={nav?.id} href={nav?.router}>
                        <div
                            className={clsx('flexshrink dflex acenter', pathname === nav.router ? styles.active : styles.menu)}>
                            {nav?.class_name}
                        </div>
                    </Link>
                ))}
            </section>
            <section className={styles.operationArea}>
                {
                    pathname === '/' && token ? (
                            <Form>
                                <Form.Item className={clsx(styles.formItem)}>
                                    <Button className={clsx(styles.btn, styles.tabBtn)}  type='primary' onClick={openManagement}>
                                        {managementText}
                                    </Button>
                                </Form.Item>
                            </Form>
                    ) : <></>
                }
                {
                    store.public.publicData.token ? <div className={clsx('positionrelative', 'ml2', 'cur')}>
                            <Avatar src={store.user.userInfo.avatar} icon={store.user.userInfo.avatar ? '' : <UserOutlined />}
                                 size={50} onClick={() => setIsShowMenu(!isShowMenu)} />
                            {
                                isShowMenu ?
                                    <div className={clsx(styles.userMenu, 'positionabsolute', 'dflex', 'flexcolumn', 'acenter')}>
                                        <Avatar icon={store.user.userInfo.avatar ? '' : <UserOutlined />}
                                                src={store.user.userInfo.avatar} size={80} />
                                        <div className={clsx('mt1', 'mainColor')}>
                                            {store.user.userInfo.name}
                                        </div>
                                        <div className={clsx('mt1', 'mainColor', 'textcenter')}>
                                            {store.user.userInfo.signature}
                                        </div>
                                    <Form>
                                        <Form.Item className={clsx(styles.formItem, styles.menuItem, 'mt1')}>
                                            <Button className={clsx(styles.btn)} type='primary' onClick={updateInfo}>
                                                修改资料
                                            </Button>
                                        </Form.Item>
                                        <Form.Item className={clsx(styles.formItem, styles.menuItem, 'mt1')}>
                                            <Button className={clsx(styles.btn)} type='primary' onClick={apply}>
                                                投稿申请
                                            </Button>
                                        </Form.Item>
                                        <Form.Item className={clsx(styles.formItem,styles.menuItem, 'mt1')}>
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
                                <Form.Item className={clsx(styles.formItem, 'wauto' , 'ml2')}>
                                    <Button className={clsx(styles.btn,styles.tabBtn)} type='primary' onClick={openLogin}>
                                        登录
                                    </Button>
                                </Form.Item>
                                <Form.Item className={clsx(styles.formItem, 'wauto', 'ml2')}>
                                    <Button className={clsx(styles.btn,styles.tabBtn)} type='primary' onClick={openRegister}>
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
