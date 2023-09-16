/*
 * @Author: 高江华 g598670138@163.com
 * @Date: 2023-06-14 14:48:28
 * @LastEditors: 高江华
 * @LastEditTime: 2023-09-16 14:42:07
 * @Description: file content
 */
import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { observer } from 'mobx-react-lite';
import { Table } from 'antd';
import { getTableScroll } from '@/utils';

interface IProps {
    columns: any[];
    dataSource: any[];
    total: number;
    pageSize: number;
    tableChange: (val: any) => void;
    current: number;
}

const AdminTable: NextPage<IProps> = ({
    columns,
    dataSource,
    total,
    pageSize,
    tableChange,
    current,
}) => {
    const [scrollY, setScrollY] = useState();

    useEffect(() => {
        // @ts-ignore
        setScrollY(getTableScroll());
    }, []);
    return (
        <div className={styles.page}>
            <Table
                dataSource={dataSource}
                columns={columns}
                rowKey={'id'}
                key={'table'}
                onChange={tableChange}
                pagination={{
                    defaultPageSize: pageSize,
                    total: total,
                    current,
                    defaultCurrent: 1,
                    locale: {
                        items_per_page: '条/页',
                        jump_to: '跳至',
                        page: '页',
                        prev_page: '上一页',
                        next_page: '下一页'
                    }
                }}
                scroll={{ y: scrollY }}
            />
        </div>
    );
};

export default observer(AdminTable);
