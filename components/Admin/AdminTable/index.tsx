import type { NextPage } from 'next'
import React, { useState } from 'react';
import styles from './index.module.scss'
import { observer } from 'mobx-react-lite';
import { Radio, Table } from 'antd';

interface IProps {
    columns: any[],
    dataSource: any[]
}

type TablePaginationPosition =
    | 'topLeft'
    | 'topCenter'
    | 'topRight'
    | 'bottomLeft'
    | 'bottomCenter'
    | 'bottomRight';
const bottomOptions = [
    { label: 'bottomLeft', value: 'bottomLeft' },
    { label: 'bottomCenter', value: 'bottomCenter' },
    { label: 'bottomRight', value: 'bottomRight' },
    { label: 'none', value: 'none' },
];

const AdminTable: NextPage<IProps> = ({columns, dataSource}) => {
    const [bottom, setBottom] = useState<TablePaginationPosition>('bottomRight');
    return (
        <div className={styles.page}>
            <Table
                dataSource={dataSource}
                columns={columns}
                scroll={{y: '400px'}}
            />
            <Radio.Group
                style={{ marginBottom: 10 }}
                options={bottomOptions}
                value={bottom}
                onChange={e => {
                    setBottom(e.target.value);
                }}
            />
        </div>
    )
}

export default observer(AdminTable)