/*
 * @Author       : 15257184434 g598670138@163.com
 * @Date         : 2023-02-06 16:06:53
 * @LastEditors  : 15257184434 g598670138@163.com
 * @LastEditTime : 2023-02-07 17:18:12
 * @FilePath     : \Official-Document\components\mavatar\index.tsx
 * @Description  :
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import type { NextPage } from 'next';
import clsx from 'clsx';
import Image from 'next/image'
import styles from './index.module.scss'
import { IAvatarProps } from 'types/global';
import { imageType } from '@/config';

const MAvatar: NextPage<IAvatarProps> = ({className}) => {
    return (<div className={clsx(className, 'dflex', 'acenter', 'jcenter')}>
        <Image
            width={50}
            height={50}
            className={clsx(styles.image)}
            alt={'avatar'}
            src={imageType.logo}
        />
    </div>);
};

export default MAvatar;
