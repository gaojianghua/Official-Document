import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useStore } from '@/store';
import styles from './index.module.scss';
import { observer } from 'mobx-react-lite';
import clsx from 'clsx';
import {
    LogoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    SyncOutlined,
    FullscreenOutlined,
    FullscreenExitOutlined,
    SettingOutlined
} from '@ant-design/icons';
import { removeSession } from '@/utils';
import React, { useEffect, useState } from 'react';

interface IProps {
    updateSwitch: any,
    isSwitch: boolean
}

const AdminHeader: NextPage<IProps> = ({ updateSwitch, isSwitch }) => {
    const router = useRouter();
    const store = useStore();
    const [rotate, setRotate] = useState(false);
    const [isSet, setIsSet] = useState(false);
    const [fullscreen, setFullscreen] = useState(false);
    useEffect(()=> {
        if (store.public.publicData.maskComponentId == 10 && !store.public.publicData.maskShow) {
            setIsSet(false)
        }
    }, [store.public.publicData.maskShow, store.public.publicData.maskComponentId])
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
            case '/admin/logs':
                store.common.setLogsRefresh(!store.common.commonData.logsRefresh);
                break;
            case '/admin/root':
                store.common.setRootRefresh(!store.common.commonData.rootRefresh);
                break;
        }
        let time = setTimeout(() => {
            setRotate(false);
            clearTimeout(time);
        }, 1500);
    };
    // 全屏开关
    const openFullscreen = () => {
        if (fullscreen) {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if ((document as any).mozCancelFullScreen) { /* Firefox */
                (document as any).mozCancelFullScreen();
            } else if ((document as any).webkitExitFullscreen) { /* Chrome, Safari and Opera */
                (document as any).webkitExitFullscreen();
            } else if ((document as any).msExitFullscreen) { /* IE/Edge */
                (document as any).msExitFullscreen();
            }
        } else {
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if ((document.documentElement as any).mozRequestFullScreen) { /* Firefox */
                (document.documentElement as any).mozRequestFullScreen();
            } else if ((document.documentElement as any).webkitRequestFullscreen) { /* Chrome, Safari and Opera */
                (document.documentElement as any).webkitRequestFullscreen();
            } else if ((document.documentElement as any).msRequestFullscreen) { /* IE/Edge */
                (document.documentElement as any).msRequestFullscreen();
            }
        }
        setFullscreen(() => !fullscreen);
    };
    // 打开设置菜单
    const openSet = () => {
        store.public.setMaskComponentId(10)
        store.public.setMaskShow(true)
        setIsSet(true)
    }
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
            <div className={clsx(styles.switch, 'dflex', 'acenter', 'cur', 'jcenter', 'ml1')} onClick={openFullscreen}>
                {
                    fullscreen ? <FullscreenExitOutlined className={clsx(styles.icon)} /> :
                        <FullscreenOutlined className={clsx(styles.icon)} />
                }
            </div>

            <div className={clsx(styles.switch, 'dflex', 'acenter', 'cur', 'jcenter', 'mlauto', !isSet ? '' : styles.unflod)} onClick={openSet}>
                <SettingOutlined className={styles.icon} />
            </div>
            <div className={clsx(styles.switch, 'dflex', 'acenter', 'cur', 'jcenter', 'ml1')} onClick={logoutAdmin}>
                <LogoutOutlined className={styles.icon} />
            </div>
        </div>
    );
};

export default observer(AdminHeader);
