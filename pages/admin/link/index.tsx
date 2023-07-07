import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import type { ColumnsType } from 'antd/es/table';
import { useStore } from '@/store';
import MSearch from 'C/mSearch';
import clsx from 'clsx';
import styles from './index.module.scss';
import { getAdminUserLinkList, getLinkList, linkDel, userLinkDel } from '@/service/api';
import { getSession, isWindow } from '@/utils';
import AdminTable from 'C/Admin/AdminTable';
import { message } from 'antd';
import { observer } from 'mobx-react-lite';
import { Paging } from '@/types/res';
import { useRouter } from 'next/router';


interface DataType {
    link_name?: string;
    user_link_name?: string;
    src: string;
    id: number;
}

const AdminLink: NextPage = () => {
    const store = useStore();
    const router = useRouter()
    const { success } = store.link.linkData
    const [search, setSearch] = useState('')
    const [current, setCurrent] = useState(1);
    const [total, setTotal] = useState(0)
    const [tableCurrent, setTableCurrent] = useState(1);
    const [paging, setPaging] = useState<Paging>({
        page_num: 1,
        page_size: 20,
        search: ''
    })
    const [dataSource, setDataSource] = useState([]);
    const columns: ColumnsType<DataType> = [
        {
            title: '名称',
            dataIndex: current == 1 ? 'link_name' : 'user_link_name',
            width: '200px',
        },
        {
            title: '地址',
            dataIndex: 'src',
            key: 'src',
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
                getLinkData({
                    ...paging,
                    page_num: tableCurrent
                });
            }
        }
    }, [current, success, store.link.linkData.refresh]);
    // 打开编辑弹框
    const openEditor = (record: any) => {
        store.public.setMaskComponentId(4);
        store.public.setIsAddOrEdit(2);
        store.link.setTmpLink(record);
        store.public.setMaskShow(true);
    };

    // 打开确定删除弹框
    const openDelete = (item: DataType) => {
        store.public.setMaskComponentId(7);
        store.model.setTitle('移除印记');
        store.model.setChildren(<div className={clsx('dflex', 'jcenter', 'acenter', 'textwhite')}>
            确定移除 {item.link_name || item.user_link_name} 吗？
        </div>);
        store.model.setConfirm(() => {
            deleteLink(item);
        });
        store.model.setCancel(() => {
            store.public.setMaskShow(false);
        });
        store.public.setMaskShow(true);
    };
    // 删除link
    const deleteLink = async (item: DataType) => {
        if (!getSession('adminToken')) {
            store.public.setIsAdminPages(false)
            router.push('/home')
            return
        }
        let res: any;
        if (current == 1) {
            res = await linkDel({ id: String(item.id) });
        } else if (current == 2) {
            res = await userLinkDel({ id: String(item.id) });
        }
        if (res.code == 200) {
            getLinkData({
                ...paging,
                page_num: tableCurrent
            });
            store.public.setMaskShow(false);
            message.success('删除成功');
        }
    };

    const getLinkData = async (query:Paging) => {
        if (!getSession('adminToken')) {
            store.public.setIsAdminPages(false)
            router.push('/home')
            return
        }
        let res: any;
        if (current == 1) {
            res = await getLinkList(query);
        } else if (current == 2) {
            res = await getAdminUserLinkList(query);
        }
        if (res.code == 200) {
            setDataSource(res.data.list);
            setTotal(res.data.total)
            store.link.setSuccess(false)
        }
    };
    // 切换
    const selectCurrent = (e: number) => {
        setCurrent(() => e)
        setTableCurrent(() => 1)
        e == 1 ? store.public.setIsUpdateLink(true) : store.public.setIsUpdateLink(false)
    };
    // 搜索
    const inputSubmit = (e: string) => {
        setSearch(e)
        let obj = {
            ...paging,
            search: e
        }
        getLinkData(obj)
    };
    // 新增
    const addCard = () => {
        store.public.setMaskComponentId(4);
        store.public.setIsAddOrEdit(1);
        store.link.setTmpLink({})
        store.public.setMaskShow(true);
    }
    const tableChange = (e:any) => {
        setTableCurrent(()=> e.current)
        let obj = {
            ...paging,
            page_num: e.current,
            search
        }
        getLinkData(obj)
    }
    return (
        <div className={styles.page}>
            <div className={clsx(styles.pageTitle, 'dflex', 'acenter')}>
                <div
                    className={clsx(styles.switch, 'dflex', 'acenter', 'cur', 'jcenter', current == 1 ? styles.active : '')}
                    onClick={() => selectCurrent(1)}>
                    系统链接
                </div>
                <div
                    className={clsx(styles.switch, 'dflex', 'acenter', 'cur', 'jcenter', 'mx1', current == 2 ? styles.active : '')}
                    onClick={() => selectCurrent(2)}>
                    用户链接
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
            <AdminTable current={tableCurrent} tableChange={tableChange} total={total} pageSize={paging.page_size} columns={columns} dataSource={dataSource}></AdminTable>
        </div>
    );
};

export default observer(AdminLink);
