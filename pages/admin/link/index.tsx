import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import type { ColumnsType } from 'antd/es/table';
import { useStore } from '@/store';
import MSearch from 'C/mSearch';
import clsx from 'clsx';
import styles from './index.module.scss';
import { getAdminUserLinkList, getLinkList } from '@/service/api';
import { isWindow } from '@/utils';
import AdminTable from 'C/Admin/AdminTable';


interface DataType {
    link_name: string;
    src: string;
    id: number
}

const columns: ColumnsType<DataType> = [
    {
        title: '名称',
        dataIndex: 'link_name',
        width: '300px',
    },
    {
        title: '地址',
        dataIndex: 'src',
    },
    {
        title: '操作',
        dataIndex: '',
        key: 'x',
        render: () => <div className={clsx('dflex')}>
            <div className={clsx(styles.editor, 'cur')}>
                编辑
            </div>
            <div className={clsx(styles.delete, 'cur')}>
                移除
            </div>
        </div>,
    },
];

const AdminLink: NextPage = () => {
    const store = useStore();
    const [current, setCurrent] = useState(1);
    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        // @ts-ignore
        current == 2 ? columns[0].dataIndex = 'user_link_name' : columns[0].dataIndex = 'link_name';
        if (store.public.publicData.adminToken && store.public.publicData.isAdminPages) {
            if (isWindow()) {
                getLinkData();
            }
        }
    }, [current]);


    const getLinkData = async () => {
        let res: any
        if(current == 1) {
            res = await getLinkList()
        }else if (current == 2) {
            res = await getAdminUserLinkList()
        }
        if(res.code == 200) {
            setDataSource(res.data)
        }
    };
    const selectCurrent = (e: number) => {
        setCurrent(() => e)
    };
    const inputSubmit = (e: string) => {

    };
    const addCard = () => {

    }
    return (
        <div className={styles.page}>
            <div className={clsx(styles.pageTitle, 'dflex', 'acenter')}>
                <div className={clsx(styles.switch, 'dflex', 'acenter', 'cur', 'jcenter', current == 1 ? styles.active : '')} onClick={()=>selectCurrent(1)}>
                    系统链接
                </div>
                <div className={clsx(styles.switch, 'dflex', 'acenter', 'cur', 'jcenter', 'mx1', current == 2 ? styles.active : '')}
                     onClick={()=>selectCurrent(2)}>
                    用户链接
                </div>
                <MSearch inputSubmit={inputSubmit} name={'搜索'}></MSearch>
                <div className={clsx(styles.switch, styles.add, 'dflex', 'acenter', 'cur', 'jcenter', 'mlauto')}
                     onClick={addCard}>
                    新增
                </div>
            </div>
            <AdminTable columns={columns} dataSource={dataSource}></AdminTable>
        </div>
    );
};

export default AdminLink;