import type { NextPage } from 'next'
import styles from './index.module.scss'
import { Image } from 'antd'
import { urls } from '../data'
import clsx from 'clsx';
import { Card } from 'components';

const Other: NextPage = () => {
    return (<>
        {
            urls?.map(item => (
                <Card key={item.id} item={item}></Card>
            ))
        }
    </>)
}

export default Other