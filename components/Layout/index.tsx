import type { NextPage } from 'next';
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';
import MainBox from 'components/MainBox';
import { Mask } from 'components/index';
import styles from './index.module.scss';
import { useEffect, useState } from 'react';
import {useStore} from '@/store';
import { getSession, setSession } from '@/utils';
import Meteor from 'C/meteor';
import { observer } from 'mobx-react-lite';
import AdminMain from 'C/Admin/AdminMain';
import AdminHeader from 'C/Admin/AdminHeader';
import AdminMenu from 'C/Admin/AdminMenu';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { imageType } from '@/config';
import Head from 'next/head';

interface Props {
    children: any;
}

const Layout: NextPage<Props> = ({ children }) => {
    const store = useStore()
    const router = useRouter()
    const [isSwitch, setIsSwitch] = useState(true)
    useEffect(() => {
        store.public.setToken(getSession('token')!)
        store.public.setAdminToken(getSession('adminToken')!)
        store.user.setUserInfo( JSON.parse(getSession('userInfo')!) || {})
        init()
    }, []);
    const init = () => {
        document.onclick = (e) => {
            store.user.setIsShowMenu(false)
        }
        if (store.public.publicData.menu.length != 0) {
            let arr = JSON.stringify(store.public.publicData.menu)
            setSession('menu', arr)
        }else{
            let menu = JSON.parse(getSession('menu')!)
            store.public.setMenu(menu)
        }
        if (store.public.publicData.adminToken) {
            store.public.setIsAdminPages(true)
            store.public.setIsUpdateCard(true)
            store.public.setIsUpdateLink(true)
        }else {
            store.public.setIsAdminPages(false)
            if (router.pathname.includes('admin')) {
                router.push('/home')
            }
        }
    }
    const updateSwitch = () => {
        setIsSwitch(() => !isSwitch)
        return isSwitch
    }
    return (
        <>
            <Head>
                <title>Wolffy印记</title>
                <meta data-n-head='ssr' name='description' content='next app vue react uniapp taro' />
                <meta data-n-head='ssr' name='description' content='官网印记 灰太狼' />
                <link rel='icon' href={imageType.ico} />
                <link rel="preconnect" href="https://gaojianghua.cn" crossOrigin={'true'} />
                <link rel="dns-prefetch" href="https://gaojianghua.cn" />
                <link rel="preconnect" href="https://wolffy.gaojianghua.cn" crossOrigin={'true'} />
                <link rel="dns-prefetch" href="https://wolffy.gaojianghua.cn" />
                <link rel="preload" href="../styles/main.css" as="style" />
                <link rel="preload" href="../styles/globals.css" as="style" />
                <link rel="preload" href="../service/api" as="script" />
                <link rel="preload" href="../service/fetch" as="script" />
            </Head>
            {
                store.public.publicData.isAdminPages ?
                    <div className={styles.all}>
                        {store.common.commonData.meteorShowerSwitch ? <Meteor /> : <></>}
                        <div className={clsx('positionabsolute', 'w100', 'h100', 'index3', 'dflex', 'p1')}>
                            <AdminMenu isSwitch={isSwitch}/>
                            <div className={clsx(styles.right, 'dflex', 'flexcolumn')}>
                                <AdminHeader updateSwitch={updateSwitch} isSwitch={isSwitch} />
                                <AdminMain>{children}</AdminMain>
                            </div>
                        </div>
                        <Mask />
                    </div>
                    :
                    <div className={styles.all}>
                        {store.common.commonData.meteorShowerSwitch ? <Meteor /> : <></>}
                        <Navbar />
                        <MainBox>{children}</MainBox>
                        <Footer />
                        <Mask />
                    </div>
            }
        </>
    );
};


export default observer(Layout);
