import type { NextPage } from 'next';
import clsx from 'clsx';
import { Image } from 'antd'
import styles from './index.module.scss'
import { IAvatarProps } from 'types/global';

const Avatar: NextPage<IAvatarProps> = ({className}) => {
    return (<div className={clsx(className, 'dflex', 'acenter', 'jcenter')}>
        <Image
            rootClassName={clsx(styles.image)}
            preview={false}
            src="https://gaojianghua.oss-cn-hangzhou.aliyuncs.com/home/gaojianghua.jpg"
        />
    </div>);
};

export default Avatar;