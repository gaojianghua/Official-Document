import type { NextPage } from 'next';
import clsx from 'clsx';
import styles from './index.module.scss';
// import * as ANTD_ICONS from '@ant-design/icons'
import { Card } from 'components';
import { IColumnProps } from 'types/global';

const Column: NextPage<IColumnProps> = ({ data }) => {
    return (
        <>
            {
                data?.list ? (
                    <div className={clsx(styles.column)}>
                        <div className={clsx(styles.columnTitle, 'dflex')}>
                            {/*{(ANTD_ICONS as any)[data?.column_Icon]?.render()}*/}
                            <div className={clsx(styles.columnTitle)}>
                                {data?.class_name}
                            </div>
                        </div>
                        <div className={clsx('dflex', 'flexwrap', 'overscr', 'mt2')}>
                            {
                                data?.list?.map(item => (
                                    <Card key={item.id} item={item}></Card>
                                ))
                            }
                        </div>
                    </div>
                ) : <></>
            }
        </>
    );
};

export default Column;