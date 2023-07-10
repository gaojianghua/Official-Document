import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import type { ColumnsType } from 'antd/es/table';
import { useStore } from '@/store';
import MSearch from 'C/mSearch';
import clsx from 'clsx';
import styles from './index.module.scss';
import { cardDel, getAdminCardList, getAdminUserCardList, userCardDel } from '@/service/api';
import { getSession, isWindow } from '@/utils';
import AdminTable from 'C/Admin/AdminTable';
import { Mark, Paging } from '@/types/res';
import { message } from 'antd';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';

interface DataType {
    key: React.Key;
    name: string;
    src: string;
    logo: string;
    bg: string;
}

const AdminCard: NextPage = () => {
    const store = useStore();
    const router = useRouter()
    const { success } = store.mark.markData
    const [total, setTotal] = useState(0)
    const [search, setSearch] = useState('')
    const [paging, setPaging] = useState<Paging>({
        page_num: 1,
        page_size: 20,
        search: ''
    })
    const [current, setCurrent] = useState(1);
    const [tableCurrent, setTableCurrent] = useState(1);
    const [dataSource, setDataSource] = useState([]);
    const currentOne: ColumnsType<DataType> = [
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
            width: '300px',
        },
        {
            title: '一级分类',
            dataIndex: 'one_type',
            key: 'one_type',
            width: '150px'
        },
        {
            title: '二级分类',
            dataIndex: 'two_type',
            key: 'two_type',
            width: '150px'
        }
    ]
    const currentTwo: ColumnsType<DataType> = [
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
            width: '300px',
        }
    ]
    const common: ColumnsType<DataType> = [
        {
            title: 'LOGO',
            dataIndex: 'logo',
            key: 'logo',
            width: '150px',
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
    ]
    const columns: ColumnsType<DataType> = current == 1 ? [...currentOne, ...common]:
        [...currentTwo, ...common];

    useEffect(() => {
        if (store.public.publicData.adminToken && store.public.publicData.isAdminPages) {
            if (isWindow()) {
                getCardData({
                    ...paging,
                    page_num: tableCurrent,
                    search
                });
            }
        }
    }, [current, success, store.mark.markData.refresh]);
    // 打开编辑弹框
    const openEditor = (record: any) => {
        store.mark.setTmpMark(record);
        store.public.setMaskComponentId(2);
        store.public.setIsAddAndEditor(2);
        store.public.setMaskShow(true);
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
        if (!getSession('adminToken')) {
            store.public.setIsAdminPages(false)
            router.push('/home')
            return
        }
        let res: any;
        if (current == 1) {
            res = await cardDel({ id: String(item.id) });
        } else if (current == 2) {
            res = await userCardDel({ id: String(item.id) });
        }
        if (res.code == 200) {
            getCardData({
                ...paging,
                page_num: tableCurrent,
                search
            });
            store.public.setMaskShow(false);
            message.success('删除成功');
        }
    };

    const getCardData = async (query:Paging) => {
        if (!getSession('adminToken')) {
            store.public.setIsAdminPages(false)
            router.push('/home')
            return
        }
        let res: any;
        if (current == 1) {
            res = await getAdminCardList(query);
        } else if (current == 2) {
            res = await getAdminUserCardList(query);
        }
        if (res.code == 200) {
            setTotal(res.data.total)
            setDataSource(res.data.list);
            store.mark.setSuccess(false)
        }
    };
    // 切换
    const selectCurrent = (e: number) => {
        setCurrent(() => e)
        setTableCurrent(() => 1)
        e == 1 ? store.public.setIsUpdateCard(true) : store.public.setIsUpdateCard(false)
    };
    // 搜索
    const inputSubmit = (e: string) => {
        if (!e) {
            message.warning("请输入印记名称")
            return
        }
        setSearch(e)
        let obj = {
            ...paging,
            search: e
        }
        getCardData(obj)
    };
    const inputChange = (e:string) => {
        setSearch(e)
        if (!e) {
            let obj = {
                ...paging,
                search: e
            }
            getCardData(obj)
        }
    }
    // 新增
    const addCard = () => {
        store.public.setIsUpdateCard(true)
        store.public.setMaskComponentId(2);
        store.public.setIsAddAndEditor(1);
        store.mark.setTmpMark({})
        store.public.setMaskShow(true);
    }
    const tableChange = (e:any) => {
        setTableCurrent(()=>e.current)
        let obj = {
            ...paging,
            page_num: e.current,
            search
        }
        getCardData(obj)
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
            <MSearch inputChange={inputChange} placeholder="请输入名称" inputSubmit={inputSubmit} name={'搜索'}></MSearch>
            {
                current == 1 ?
                    <div className={clsx(styles.switch, styles.add, 'dflex', 'acenter', 'cur', 'jcenter', 'mlauto')}
                         onClick={addCard}>
                        新增
                    </div> : <></>
            }
        </div>
        <AdminTable current={tableCurrent} tableChange={tableChange} total={total} pageSize={paging.page_size} columns={columns} dataSource={dataSource}></AdminTable>
    </div>);
};

export default observer(AdminCard);
