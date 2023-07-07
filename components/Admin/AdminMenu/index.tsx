import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import styles from './index.module.scss';
import { observer } from 'mobx-react-lite';
import { MenuList } from '@/config/aminMenu';
import clsx from 'clsx';
import Link from 'next/link';
import * as ANTD_ICONS from '@ant-design/icons';
import { Avatar } from 'antd';
import { imageType } from '@/config';

interface IProps {
    isSwitch: boolean;
}

const AdminMenu: NextPage<IProps> = ({ isSwitch }) => {
    const { pathname } = useRouter();

    return (
        <div className={clsx(styles.menu, 'p1', isSwitch ? '' : styles.unflod)}>
            <div className={clsx('dflex', 'acenter', 'mb2')}>
                <div className={clsx(styles.logo, 'dflex', 'flexshrink', 'acenter', 'jcenter')}>
                    <Avatar src={imageType.logo} size={70} />
                </div>
                <h1 className={clsx(styles.logoText)}>
                    Wolffy
                </h1>
            </div>

            {
                MenuList.map((item, index) => (
                    <div key={index} className={clsx(styles.menuItem, item.path == pathname ? styles.menuActive : '')}>
                        <Link key={index} href={item?.path!}
                              className={clsx('w100', 'h100', 'dflex', 'cur', 'acenter', 'jcenter')}>
                            <div
                                className={clsx(styles.menuText, 'dflex', 'cur', 'acenter', item.path == pathname ? styles.active : '')}>
                                <div className={clsx('fontsm','flexshrink', styles.icon)}>{(ANTD_ICONS as any)[item?.icon]?.render()}</div>
                                <div className={clsx(styles.text)}>{item?.name}</div>
                            </div>
                        </Link>
                    </div>
                ))
            }
        </div>
    );
};

export default observer(AdminMenu);
