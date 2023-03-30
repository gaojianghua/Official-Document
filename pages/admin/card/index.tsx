import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import type { ColumnsType } from 'antd/es/table';
import { useStore } from '@/store';
import MSearch from 'C/mSearch';
import clsx from 'clsx';
import styles from './index.module.scss';
import { getAdminCardList, getAdminUserCardList } from '@/service/api';
import { isWindow } from '@/utils';
import AdminTable from 'C/Admin/AdminTable';

interface DataType {
    key: string;
    name: string;
    src: string;
    logo: string;
    bg: string
}

const columns: ColumnsType<DataType> = [
    {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
        width: '120px'
    },
    {
        title: '地址',
        dataIndex: 'src',
        key: 'src',
    },
    {
        title: '标志',
        dataIndex: 'logo',
        key: 'logo',
        width: '100px',
        render: (e) => <img className={clsx(styles.imgs)} src={e}/>
    },
    {
        title: '背景',
        dataIndex: 'image_bg',
        key: 'image_bg',
        render: (e) => <img className={clsx(styles.bgs)} src={e}/>
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
    }
];
const AdminCard: NextPage = () => {
    const store = useStore();
    const [current, setCurrent] = useState(1);
    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        if (store.public.publicData.adminToken && store.public.publicData.isAdminPages) {
            if (isWindow()) {
                getCardData();
            }
        }
    }, [current]);


    const getCardData = async () => {
        let res: any
        if(current == 1) {
            res = await getAdminCardList()
        }else if (current == 2) {
            res = await getAdminUserCardList()
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
    return (<div className={styles.page}>
        <div className={clsx(styles.pageTitle, 'dflex', 'acenter')}>
            <div className={clsx(styles.switch, 'dflex', 'acenter', 'cur', 'jcenter', current == 1 ? styles.active : '')} onClick={() =>selectCurrent(1)}>
                系统印记
            </div>
            <div className={clsx(styles.switch, 'dflex', 'acenter', 'cur', 'jcenter', 'mx1', current == 2 ? styles.active : '')}
                 onClick={() =>selectCurrent(2)}>
                用户印记
            </div>
            <MSearch inputSubmit={inputSubmit} name={'搜索'}></MSearch>
            <div className={clsx(styles.switch, styles.add, 'dflex', 'acenter', 'cur', 'jcenter', 'mlauto')}
                 onClick={addCard}>
                新增
            </div>
        </div>
        <AdminTable columns={columns} dataSource={dataSource}></AdminTable>
    </div>);
};

export default AdminCard;