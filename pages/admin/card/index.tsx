import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import type { ColumnsType } from 'antd/es/table';
import { useStore } from '@/store';
import MSearch from 'C/mSearch';
import clsx from 'clsx';
import styles from './index.module.scss';
import { cardDel, getAdminCardList, getAdminUserCardList, userCardDel } from '@/service/api';
import { isWindow } from '@/utils';
import AdminTable from 'C/Admin/AdminTable';
import { Mark } from '@/types/res';
import { message } from 'antd';

interface DataType {
    key: React.Key;
    name: string;
    src: string;
    logo: string;
    bg: string;
}

const AdminCard: NextPage = () => {
    const store = useStore();
    const [current, setCurrent] = useState(1);
    const [dataSource, setDataSource] = useState([]);
    const columns: ColumnsType<DataType> = [
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
            width: '120px',
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
            render: (e) => <img className={clsx(styles.imgs)} src={e} />,
        },
        {
            title: '背景',
            dataIndex: 'image_bg',
            key: 'image_bg',
            render: (e) => <img className={clsx(styles.bgs)} src={e} />,
        },
        {
            title: '操作',
            dataIndex: 'x',
            key: 'x',
            render: (_, record) => <div className={clsx('dflex')}>
                <div className={clsx(styles.editor, 'cur')} onClick={() => openEditor(record)}>
                    编辑
                </div>
                <div className={clsx(styles.delete, 'cur')} onClick={() => openDelete(record)}>
                    移除
                </div>
            </div>,
        },
    ];

    useEffect(() => {
        if (store.public.publicData.adminToken && store.public.publicData.isAdminPages) {
            if (isWindow()) {
                store.public.setIsUpdateCard(true)
                getCardData();
            }
        }
    }, [current]);
    // 打开编辑弹框
    const openEditor = (record: any) => {
        store.mark.setTmpMark(record);
        store.public.setMaskShow(true);
        store.public.setMaskComponentId(2);
        store.public.setIsAddAndEditor(2);
    };

    // 打开确定删除弹框
    const openDelete = (item: Mark) => {
        store.public.setMaskComponentId(7);
        store.model.setTitle('移除印记');
        store.model.setChildren(<div className={clsx('dflex', 'jcenter', 'acenter', 'textwhite')}>
            确定移除 {item.name} 吗？
        </div>);
        store.model.setConfirm(() => {
            deleteCard(item);
        });
        store.model.setCancel(() => {
            store.public.setMaskShow(false);
        });
        store.public.setMaskShow(true);
    };
    // 删除card
    const deleteCard = async (item: Mark) => {
        let res: any;
        if (current == 1) {
            res = await cardDel({ id: String(item.id) });
        } else if (current == 2) {
            res = await userCardDel({ id: String(item.id) });
        }
        if (res.code == 200) {
            getCardData();
            store.public.setMaskShow(false);
            message.success('删除成功');
        }
    };

    const getCardData = async () => {
        let res: any;
        if (current == 1) {
            res = await getAdminCardList();
        } else if (current == 2) {
            res = await getAdminUserCardList();
        }
        if (res.code == 200) {
            setDataSource(res.data);
        }
    };
    const selectCurrent = (e: number) => {
        e == 1 ? store.public.setIsUpdateCard(true) : store.public.setIsUpdateCard(false)
        setCurrent(() => e)
    };
    const inputSubmit = (e: string) => {

    };
    const addCard = () => {

    }
    return (<div className={styles.page}>
        <div className={clsx(styles.pageTitle, 'dflex', 'acenter')}>
            <div
                className={clsx(styles.switch, 'dflex', 'acenter', 'cur', 'jcenter', current == 1 ? styles.active : '')}
                onClick={() => selectCurrent(1)}>
                系统印记
            </div>
            <div
                className={clsx(styles.switch, 'dflex', 'acenter', 'cur', 'jcenter', 'mx1', current == 2 ? styles.active : '')}
                onClick={() => selectCurrent(2)}>
                用户印记
            </div>
            <MSearch inputSubmit={inputSubmit} name={'搜索'}></MSearch>
            {
                current == 1 ?
                    <div className={clsx(styles.switch, styles.add, 'dflex', 'acenter', 'cur', 'jcenter', 'mlauto')}
                         onClick={addCard}>
                        新增
                    </div> : <></>
            }
        </div>
        <AdminTable columns={columns} dataSource={dataSource}></AdminTable>
    </div>);
};

export default AdminCard;