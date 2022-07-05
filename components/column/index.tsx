import type { NextPage } from 'next';
import clsx from 'clsx';
import styles from './index.module.scss'
import * as ANTD_ICONS from '@ant-design/icons'
import { Card } from 'components';
import { IColumnProps } from 'types/global';

const Column: NextPage<IColumnProps> = ({ data }) => {
    return (<div className={clsx(styles.column)}>
        <div className={clsx(styles.columnTitle, 'dflex', 'acenter')}>
            {(ANTD_ICONS as any)[data?.column_Icon]?.render()}
            <div className={clsx(styles.columnTitle, 'ml1')}>
                {data?.column_Name}
            </div>
        </div>
        <div className={clsx('dflex', 'flexwrap', 'overscr', 'mt2')}>
            {
                data?.column_Data?.map(item => (
                    <Card key={item.id} item={item}></Card>
                ))
            }
        </div>
    </div>);
};

export default Column;