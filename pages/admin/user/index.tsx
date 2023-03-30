import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react';
import { useStore } from '@/store';
import { getAdminUserList } from '@/service/api';
import clsx from 'clsx';
import styles from './index.module.scss';
import MSearch from 'C/mSearch';
import { isWindow } from '@/utils';
import AdminTable from 'C/Admin/AdminTable';
import { ColumnsType } from 'antd/es/table';


interface DataType {
    name: string;
    avatar: string;
    mobile: number,
    signature: string
}

const columns: ColumnsType<DataType> = [
    {
        title: '昵称',
        dataIndex: 'name',
        width: '300px',
    },
    {
        title: '头像',
        dataIndex: 'avatar',
        render: (e)=> <img className={clsx(styles.imgs)} src={e} />
    },
    {
        title: '手机号',
        dataIndex: 'mobile',
    },
    {
        title: '个性签名',
        dataIndex: 'signature',
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

const AdminUser: NextPage = () => {
    const store = useStore();
    const [dataSource, setDataSource] = useState([]);

    useEffect(()=> {
        if (store.public.publicData.adminToken && store.public.publicData.isAdminPages) {
            if (isWindow()) {
                getUserList();
            }
        }
    }, [])


    const getUserList = async () => {
        // @ts-ignore
        const res: any = await getAdminUserList()
        if(res.code == 200) {
            setDataSource(res.data)
        }
    }
    const inputSubmit = (e:string) => {

    };
    return (<div className={styles.page}>
        <div className={clsx(styles.pageTitle, 'dflex', 'acenter')}>
            <MSearch inputSubmit={inputSubmit} name={'搜索'}></MSearch>
        </div>
        <AdminTable columns={columns} dataSource={dataSource}></AdminTable>
    </div>)
}

export default AdminUser