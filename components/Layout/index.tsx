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

interface Props {
    children: any;
}

const Layout: NextPage<Props> = ({ children }) => {
    const store = useStore()
    useEffect(() => {
        store.public.setToken(getSession('token')!)
        store.user.setUserInfo( JSON.parse(getSession('userInfo')!) || {})
    }, []);
    return (
        <div className={styles.all}>
            <Meteor />
            <Navbar />
            <MainBox>{children}</MainBox>
            <Footer />
            <Mask />
        </div>
    );
};


export default Layout;
