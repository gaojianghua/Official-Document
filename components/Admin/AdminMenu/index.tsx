import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useStore } from '@/store';
import styles from './index.module.scss'
import { getCards } from '@/service/api';
import { observer } from 'mobx-react-lite';
import { MenuList } from '@/config/aminMenu'
import clsx from 'clsx';
import Link from 'next/link';
import * as ANTD_ICONS from '@ant-design/icons'
import { Avatar } from 'antd';

const AdminMenu: NextPage = () => {
    const [urlList, setUrlList] = useState([])
    const { pathname } = useRouter();
    const store = useStore()


    return (
        <div className={clsx(styles.menu, 'p1')}>
            <div className={clsx('dflex', 'acenter', 'jsa', 'mb2')}>
                <div className={clsx(styles.logo, 'dflex', 'flexshrink', 'acenter', 'jcenter')}>
                    <Avatar src="/Wolffy.png" size={80} />
                </div>
                <h1 className={styles.logoText}>
                    Wolffy
                </h1>
            </div>

            {
                MenuList.map((item, index) => (
                    <div key={index} className={clsx(styles.menuItem)}>
                        <Link key={index} href={item?.path!} className={clsx('w100', 'h100', 'dflex', 'cur', 'acenter', 'jcenter')}>
                            <div className={clsx(styles.menuText, 'dflex', 'cur', 'flexshrink', 'abase', 'jcenter', item.path == pathname ? styles.active : '')}>
                                <p className={clsx('fontsm')}>{(ANTD_ICONS as any)[item?.icon]?.render()}</p>
                                <p className={clsx('ml1')}>{item?.name}</p>
                            </div>
                        </Link>
                    </div>
                ))
            }
        </div>
    )
}

export default observer(AdminMenu)