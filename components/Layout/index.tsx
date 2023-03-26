import type { NextPage } from 'next';
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';
import MainBox from 'components/MainBox';
import { Mask } from 'components/index';
import styles from './index.module.scss';
import { useEffect } from 'react';
import {useStore} from '@/store';
import { getSession } from '@/utils';
import Meteor from 'C/meteor';
import { observer } from 'mobx-react-lite';
import AdminMain from 'C/Admin/AdminMain';
import AdminHeader from 'C/Admin/AdminHeader';
import AdminMenu from 'C/Admin/AdminMenu';
import clsx from 'clsx';

interface Props {
    children: any;
}

const Layout: NextPage<Props> = ({ children }) => {
    const store = useStore()
    useEffect(() => {
        store.public.setToken(getSession('token')!)
        store.public.setAdminToken(getSession('adminToken')!)
        store.user.setUserInfo( JSON.parse(getSession('userInfo')!) || {})
        init()
    }, []);
    const init = () => {
        if (store.public.publicData.adminToken) {
            store.public.setIsAdminPages(true)
        }
    }
    return (
        <>
            {
                store.public.publicData.isAdminPages ?
                    <div className={styles.all}>
                        <Meteor />
                        <div className={clsx('positionabsolute', 'w100', 'h100', 'index3', 'dflex', 'p1')}>
                            <AdminMenu/>
                            <div className={clsx(styles.right, 'dflex', 'flexcolumn')}>
                                <AdminHeader/>
                                <AdminMain>{children}</AdminMain>
                            </div>
                        </div>
                    </div>
                    :
                    <div className={styles.all}>
                        <Meteor />
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
