import type { NextPage } from 'next'
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useStore } from '@/store';
import styles from './index.module.scss'
import { observer } from 'mobx-react-lite';
import clsx from 'clsx';
import { LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { removeSession } from '@/utils';

interface IProps {
    updateSwitch: any,
    isSwitch: boolean
}

const AdminHeader: NextPage<IProps> = ({updateSwitch, isSwitch}) => {
    const [urlList, setUrlList] = useState([])

    const router = useRouter();
    const store = useStore()
    // 左侧菜单栏开关
    const chooseSwitch = () => {
        updateSwitch(isSwitch)
    }
    // 退出管理员登录
    const logoutAdmin = () => {
        removeSession('adminToken')
        store.public.setIsAdminPages(false)
        router.push('/')
    }
    return (
        <div className={clsx(styles.header, 'dflex', 'acenter')}>
            <div className={clsx(styles.switch, 'dflex', 'acenter', 'cur', 'jcenter', isSwitch ? '' : styles.unflod)} onClick={chooseSwitch}>
                {
                    isSwitch ? <MenuFoldOutlined className={styles.icon} /> : <MenuUnfoldOutlined className={styles.icon} />
                }
            </div>
            <div className={clsx(styles.switch, 'dflex', 'acenter', 'cur', 'jcenter', 'mlauto')} onClick={logoutAdmin}>
                <LogoutOutlined className={styles.icon} />
            </div>
        </div>
    )
}

export default observer(AdminHeader)