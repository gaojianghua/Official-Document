import type { NextPage } from 'next'
import React, { useState } from 'react';
import styles from './index.module.scss'
import { observer } from 'mobx-react-lite';
import { Radio, Table } from 'antd';

interface IProps {
    columns: any[],
    dataSource: any[]
}

const AdminTable: NextPage<IProps> = ({columns, dataSource}) => {
    const [bottom, setBottom] = useState('bottomRight');
    return (
        <div className={styles.page}>
            <Table
                dataSource={dataSource}
                columns={columns}
                rowKey={'id'}
                key={'table'}
                scroll={{y: '387px'}}
            />
            <Radio.Group
                style={{ marginBottom: 10 }}
                value={bottom}
                onChange={e => {
                    setBottom(e.target.value);
                }}
            />
        </div>
    )
}

export default observer(AdminTable)