import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react';
import styles from './index.module.scss'
import { observer } from 'mobx-react-lite';
import { Table } from 'antd';
import { getTableScroll } from '@/utils';

interface IProps {
    columns: any[],
    dataSource: any[],
    total: number,
    pageSize: number,
    tableChange: (val: any) => void,
    current: number
}

const AdminTable: NextPage<IProps> = ({columns, dataSource,total,pageSize, tableChange, current}) => {
    const [scrollY, setScrollY] = useState();

    useEffect(() => {
        // @ts-ignore
        setScrollY(getTableScroll())
    }, [])
    return (
        <div className={styles.page}>
            <Table
                dataSource={dataSource}
                columns={columns}
                rowKey={'id'}
                key={'table'}
                onChange={tableChange}
                pagination={{defaultPageSize: pageSize, total: total, current, defaultCurrent: 1}}
                scroll={{y: scrollY}}
            />
        </div>
    )
}

export default observer(AdminTable)