import clsx from 'clsx';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from './index.module.scss'

interface Props {
    children: any;
}

const MainBox: NextPage<Props> = ({children}) => {
    return (<div className={styles.container}>
        <Head>
            <title>Wolffy印记</title>
            <meta data-n-head="ssr" name="description" content="next app vue react uniapp taro" />
            <meta data-n-head="ssr" name="description" content="官网印记 灰太狼" />
            <link rel="icon" href="/Wolffy.ico" />
        </Head>
        <div className={clsx(styles.content)}>
            <div className={clsx(styles.list, 'dflex', 'flexwrap', 'overscr')}>
                {children}
            </div>
        </div>
    </div>);
};

export default MainBox;