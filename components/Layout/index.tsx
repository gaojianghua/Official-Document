import type { NextPage } from 'next';
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';
import MainBox from 'components/MainBox';
import { Mask } from 'components/index';
import styles from './index.module.scss';

interface Props {
    children: any;
}

const Layout: NextPage<Props> = ({ children }) => {
    return (
        <div className={styles.all}>
            <Navbar />
            <MainBox>{children}</MainBox>
            <Footer />
            <Mask />
        </div>
    );
};

export default Layout;
