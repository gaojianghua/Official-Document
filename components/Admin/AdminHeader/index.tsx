import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useStore } from '@/store';
import styles from './index.module.scss';
import { observer } from 'mobx-react-lite';
import clsx from 'clsx';
import { LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, SyncOutlined } from '@ant-design/icons';
import { removeSession } from '@/utils';
import { useState } from 'react';

interface IProps {
    updateSwitch: any,
    isSwitch: boolean
}

const AdminHeader: NextPage<IProps> = ({ updateSwitch, isSwitch }) => {
    const router = useRouter();
    const store = useStore();
    const [rotate, setRotate] = useState(false);
    // 左侧菜单栏开关
    const chooseSwitch = () => {
        updateSwitch(isSwitch);
    };
    // 刷新
    const refresh = () => {
        setRotate(true);
        switch (router.pathname) {
            case '/admin/home':
                store.public.setRefresh(!store.public.publicData.refresh);
                break;
            case '/admin/user':
                store.user.setRefresh(!store.user.userData.refresh);
                break;
            case '/admin/class':
                store.class.setRefresh(!store.class.classData.refresh);
                break;
            case '/admin/card':
                store.mark.setRefresh(!store.mark.markData.refresh);
                break;
            case '/admin/link':
                store.link.setRefresh(!store.link.linkData.refresh);
                break;
            case '/admin/apply':
                store.model.setRefresh(!store.model.modelData.refresh);
                break;
        }
        let time = setTimeout(() => {
            setRotate(false);
            clearTimeout(time)
        }, 1500);
    };
    // 退出管理员登录
    const logoutAdmin = () => {
        removeSession('adminToken');
        store.public.setIsAdminPages(false);
        router.push('/home');
    };
    return (
        <div className={clsx(styles.header, 'dflex', 'acenter')}>
            <div className={clsx(styles.switch, 'dflex', 'acenter', 'cur', 'jcenter', isSwitch ? '' : styles.unflod)}
                 onClick={chooseSwitch}>
                {
                    isSwitch ? <MenuFoldOutlined className={styles.icon} /> :
                        <MenuUnfoldOutlined className={styles.icon} />
                }
            </div>
            <div className={clsx(styles.switch, 'dflex', 'acenter', 'cur', 'jcenter', 'ml1')} onClick={refresh}>
                <SyncOutlined className={clsx(styles.icon, rotate ? styles.rotate : '')} />
            </div>
            <div className={clsx(styles.switch, 'dflex', 'acenter', 'cur', 'jcenter', 'mlauto')} onClick={logoutAdmin}>
                <LogoutOutlined className={styles.icon} />
            </div>
        </div>
    );
};

export default observer(AdminHeader);
