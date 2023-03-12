import type { NextPage } from 'next';
import styles from './index.module.scss';
import clsx from 'clsx';
import { observer } from 'mobx-react-lite';
import { SLink } from '@/types/res';
import Link from 'next/link';

interface CLinkProps {
    item: SLink
}

const LinkBtn: NextPage<CLinkProps> = (props) => {
    const { item } = props
    return (
        <div className={clsx(styles.linkBtn)}>
            <Link className={clsx('textwhite', 'w100', 'h100', 'dflex', 'jcenter', 'acenter')} target={'_blank'} href={item?.src!}>
                {item.link_name}
            </Link>
        </div>
    );
};

export default observer(LinkBtn);