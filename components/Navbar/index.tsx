import { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import { observer } from 'mobx-react-lite';
import { useStore } from 'store/index';
import { useRouter } from 'next/router';
import clsx from 'clsx'
import { Button, Image } from 'antd';
import { Avatar } from 'components'
import { navs } from './config';
import styles from './index.module.scss';
import request from 'service/fetch';

const Navbar: NextPage = () => {
    const store = useStore();
    const { isManagement } = store.public.publicData
    const { pathname } = useRouter();
    const [ managementText, setManagementText ] = useState('管理印记')

    useEffect(() => {
        if (isManagement) {
            setManagementText('保存修改')
        } else {
            setManagementText('管理印记')
        }
    }, [isManagement])
    // 打开编辑印记
    const openManagement = () => {
        store.public.setIsManagement(!isManagement)
    }
    // 打开登录弹框
    const openLogin = () => {
        store.public.setMaskComponentId(1)
        store.public.setMaskShow(true)
    }
    return (
        <div className={styles.navbar}>
            <Avatar className={styles.avatar} />
            <section className={clsx(styles.logoArea, 'cur')}>Wolffy</section>
            <section className={styles.linkArea}>
                {navs?.map((nav) => (
                    <Link key={nav?.label} href={nav?.value}>
                        <div className={clsx('flexshrink')}>
                            <a
                                className={
                                    pathname === nav?.value ? styles.active : styles.menu
                                }
                            >
                                {nav?.label}
                            </a>
                        </div>
                    </Link>
                ))}
            </section>
            <section className={styles.operationArea}>
                {
                    pathname === '/' ? (
                        <Button type="primary" onClick={openManagement}>
                            {managementText}
                        </Button>
                    ): <></>
                }
                <Button type="primary" onClick={openLogin}>
                    登录
                </Button>
            </section>
        </div>
    );
};

export default observer(Navbar);
