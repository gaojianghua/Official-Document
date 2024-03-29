import type { NextPage } from 'next';
import React, { useCallback, useEffect, useState } from 'react';
import { useStore } from '@/store';
import { contributeDelete, getContributeList } from '@/service/api';
import styles from './index.module.scss';
import clsx from 'clsx';
import MSearch from 'C/mSearch';
import AdminTable from 'C/Admin/AdminTable';
import { ColumnsType } from 'antd/es/table';
import { message } from 'antd';
import { observer } from 'mobx-react-lite';
import { FireOutlined, LinkOutlined } from '@ant-design/icons';
import { Paging } from '@/types/res';
import { getSession } from '@/utils';
import { useRouter } from 'next/router';

interface DataType {
    link_name: string;
    src: string;
    link_desc: string,
    id: number
}

const AdminApply: NextPage = () => {
    const store = useStore();
    const router = useRouter();
    const { success } = store.model.modelData;
    const [total, setTotal] = useState(0);
    const [search, setSearch] = useState('');
    const [tableCurrent, setTableCurrent] = useState(1);
    const [paging, setPaging] = useState<Paging>({
        page_num: 1,
        page_size: 20,
        search: '',
    });
    const [dataSource, setDataSource] = useState([]);
    const columns: ColumnsType<DataType> = [
        {
            title: '名称',
            dataIndex: 'link_name',
            width: '200px',
        },
        {
            title: '地址',
            dataIndex: 'src',
        },
        {
            title: '描述',
            dataIndex: 'link_desc',
            width: '200px',
        },
        {
            title: '操作',
            dataIndex: '',
            key: 'x',
            width: '360px',
            render: (_, record) => <div className={clsx('dflex')}>
                <div className={clsx(styles.add, styles.btn, 'cur')} onClick={() => openAdd(record)}>
                    添加
                </div>
                <div className={clsx(styles.editor, styles.btn, 'cur', 'ml1')} onClick={() => openEditor(record)}>
                    编辑
                </div>
                <div className={clsx(styles.delete, styles.btn, 'cur', 'ml1')} onClick={() => openDelete(record)}>
                    移除
                </div>
            </div>,
        },
    ];
    const getContributeData = useCallback(async (query: Paging) => {
        if (!getSession('adminToken')) {
            store.public.setIsAdminPages(false);
            router.push('/home');
            return;
        }
        let res: any = await getContributeList(query);
        if (res.code == 200) {
            setTotal(res.data.total);
            setDataSource(res.data.list);
            store.model.setSuccess(false);
        }
    },[store.public, router, store.model])
    useEffect(() => {
        getContributeData({
            ...paging,
            page_num: tableCurrent,
            search,
        });
    }, [getContributeData, success, paging, search, tableCurrent, store.model.modelData.refresh]);

    // 打开添加弹框
    const openAdd = (record: any) => {
        store.public.setMaskComponentId(7);
        store.model.setTitle('选择添加类型');
        store.model.setChildren(
            <div className={clsx('dflex', 'jsa', 'acenter', 'textwhite')}>
                <div className={clsx(styles.typebtn, 'dflex', 'acenter', 'jcenter', 'cur')}
                     onClick={() => chooseCurrent(1, record)}>
                    <FireOutlined className={styles.icon} />
                </div>
                <div className={clsx(styles.typebtn, 'dflex', 'acenter', 'jcenter', 'cur')}
                     onClick={() => chooseCurrent(2, record)}>
                    <LinkOutlined className={styles.icon} />
                </div>
            </div>,
        );
        store.model.setIsCardOrLink(true);
        store.model.setCancel(() => {
            store.public.setMaskShow(false);
        });
        store.public.setMaskShow(true);
    };

    // 切换
    const chooseCurrent = (i: number, record: any) => {
        if (i == 1) {
            store.public.setMaskComponentId(2);
            store.public.setIsAddAndEditor(1);
            store.mark.setTmpMark({
                name: record.link_name,
                src: record.src,
            });
            store.public.setMaskShow(true);
        } else if (i == 2) {
            store.public.setMaskComponentId(4);
            store.public.setIsAddOrEdit(1);
            store.link.setTmpLink({
                link_name: record.link_name,
                src: record.src,
            });
            store.public.setMaskShow(true);
        }
        store.model.setIsCardOrLink(false);
    };

    // 打开编辑弹框
    const openEditor = (record: any) => {
        store.public.setMaskComponentId(5);
        store.model.setTmpData(record);
        store.public.setMaskShow(true);
    };

    // 打开确定删除弹框
    const openDelete = (item: DataType) => {
        store.public.setMaskComponentId(7);
        store.model.setTitle('移除投稿');
        store.model.setChildren(<div className={clsx('dflex', 'jcenter', 'acenter', 'textwhite')}>
            确定移除 {item.link_name} 吗？
        </div>);
        store.model.setConfirm(() => {
            deleteLink(item);
        });
        store.model.setCancel(() => {
            store.public.setMaskShow(false);
        });
        store.public.setMaskShow(true);
    };

    // 删除用户
    const deleteLink = async (item: DataType) => {
        if (!getSession('adminToken')) {
            store.public.setIsAdminPages(false);
            router.push('/home');
            return;
        }
        let res: any = await contributeDelete({ id: String(item.id) });
        if (res.code == 200) {
            getContributeData({
                ...paging,
                page_num: tableCurrent,
                search,
            });
            store.public.setMaskShow(false);
            message.success('删除成功');
        }
    };
    const inputSubmit = (e: string) => {
        if (!e) {
            message.warning('请输入投稿名称');
            return;
        }
        setSearch(e);
        let obj = {
            ...paging,
            search: e,
        };
        getContributeData(obj);
    };
    const inputChange = (e: string) => {
        setSearch(e);
        if (!e) {
            let obj = {
                ...paging,
                search: e,
            };
            getContributeData(obj);
        }
    };
    const tableChange = (e: any) => {
        setTableCurrent(() => e.current);
        let obj = {
            ...paging,
            page_num: e.current,
            search,
        };
        getContributeData(obj);
    };
    return (<div className={styles.page}>
        <div className={clsx(styles.pageTitle, 'dflex', 'acenter')}>
            <MSearch inputChange={inputChange} placeholder='请输入名称' inputSubmit={inputSubmit}
                     name={'搜索'}></MSearch>
        </div>
        <AdminTable current={tableCurrent} tableChange={tableChange} total={total} pageSize={paging.page_size}
                    columns={columns} dataSource={dataSource}></AdminTable>
    </div>);
};

export default observer(AdminApply);
