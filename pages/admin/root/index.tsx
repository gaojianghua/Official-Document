import type { NextPage } from 'next'
import React, { useCallback, useEffect, useState } from 'react';
import { useStore } from '@/store';
import { getAdminList, getAdminPermissionList, getAdminRoleList, userDelete } from '@/service/api';
import clsx from 'clsx';
import styles from './index.module.scss';
import MSearch from 'C/mSearch';
import { getSession, isWindow } from '@/utils';
import AdminTable from 'C/Admin/AdminTable';
import { ColumnsType } from 'antd/es/table';
import { message } from 'antd';
import { IAdmin, Paging } from '@/types/res';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react-lite';

const AdminRoot: NextPage = () => {
    const store = useStore();
    const router = useRouter()
    const [dataSource, setDataSource] = useState([]);
    const [current, setCurrent] = useState(1);
    const [total, setTotal] = useState(0)
    const [search, setSearch] = useState('')
    const [tableCurrent, setTableCurrent] = useState(1);
    const [paging, setPaging] = useState<Paging>({
        page_num: 1,
        page_size: 20,
        search: ''
    })
    const columns: ColumnsType<IAdmin> = [
        {
            title: 'IP地址',
            dataIndex: 'ip',
            width: '180px',
        },
        {
            title: '账户',
            dataIndex: 'account'
        },
        {
            title: '手机号',
            dataIndex: 'mobile',
        },
        {
            title: '邮箱',
            dataIndex: 'email',
        },
        {
            title: '超级管理员',
            dataIndex: 'is_super',
            width: '120px',
            render: (_, record) => <div>{record.is_super == 1 ? '是' : '否'}</div>
        },
        {
            title: '角色',
            dataIndex: 'role_id',
            width: '100px',
        },
        {
            title: '操作',
            dataIndex: '',
            key: 'x',
            render: (_, record) => <div className={clsx('dflex')}>
                <div className={clsx(styles.editor, 'cur')} onClick={()=>openEditor(record)}>
                    编辑
                </div>
                <div className={clsx(styles.delete, 'cur')} onClick={()=>openDelete(record)}>
                    移除
                </div>
            </div>,
        },
    ];
    // 获取管理员数据
    const getAdminListData = useCallback(async (query:Paging) => {
        if (!getSession('adminToken')) {
            store.public.setIsAdminPages(false)
            router.push('/home')
            return
        }
        const res: any = await getAdminList(query)
        if(res.code == 200) {
            setDataSource(res.data.list)
            setTotal(res.data.total)
        }
    },[router, store.public])
    // 获取角色数据
    const getAdminRoleListData = useCallback(async (query:Paging) => {
        if (!getSession('adminToken')) {
            store.public.setIsAdminPages(false)
            router.push('/home')
            return
        }
        const res: any = await getAdminRoleList(query)
        if(res.code == 200) {
            setDataSource(res.data.list)
            setTotal(res.data.total)
        }
    },[router, store.public])
    // 获取权限数据
    const getAdminPermissionListData = useCallback(async (query:Paging) => {
        if (!getSession('adminToken')) {
            store.public.setIsAdminPages(false)
            router.push('/home')
            return
        }
        const res: any = await getAdminPermissionList(query)
        if(res.code == 200) {
            setDataSource(res.data.list)
            setTotal(res.data.total)
        }
    },[router, store.public])
    useEffect(()=> {
        if (store.public.publicData.adminToken && store.public.publicData.isAdminPages) {
            if (isWindow()) {
                if(current == 1) {
                    getAdminListData({
                        ...paging,
                        page_num: tableCurrent,
                        search
                    })
                }else if (current == 2) {
                    getAdminRoleListData({
                        ...paging,
                        page_num: tableCurrent,
                        search
                    })
                }else {
                    getAdminPermissionListData({
                        ...paging,
                        page_num: tableCurrent,
                        search
                    })
                }
            }
        }
    }, [getAdminListData, getAdminRoleListData, getAdminPermissionListData,paging, tableCurrent ,search,store.public.publicData.adminToken , store.public.publicData.isAdminPages, store.common.commonData.rootRefresh, current])

    // 打开编辑弹框
    const openEditor = (record:IAdmin) => {
        // store.user.setTmpUser(record)
        store.public.setMaskComponentId(6);
        store.public.setMaskShow(true);
    }

    // 打开确定删除弹框
    const openDelete = (item: IAdmin) => {
        store.public.setMaskComponentId(7);
        store.model.setTitle('移除印记');
        store.model.setChildren(<div className={clsx('dflex', 'jcenter', 'acenter', 'textwhite')}>
            {/*确定移除 {item.name} 吗？*/}
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
    const deleteLink = async (item:IAdmin) => {
        if (!getSession('adminToken')) {
            store.public.setIsAdminPages(false)
            router.push('/home')
            return
        }
        let res: any = await userDelete({ mobile: String(item.mobile) });
        if (res.code == 200) {
            getAdminListData({
                ...paging,
                page_num: tableCurrent,
                search
            });
            store.public.setMaskShow(false);
            message.success('删除成功');
        }
    }
    const inputSubmit = (e:string) => {
        setSearch(e)
        _requestData(e)
    };
    const inputChange = (e:string) => {
        setSearch(e)
        if (!e) {
            _requestData(e)
        }
    }
    const _requestData = (e:string) => {
        let obj = {
            ...paging,
            search: e
        }
        if(current == 1) {
            getAdminListData(obj)
        }else if (current == 2) {
            getAdminRoleListData(obj)
        }else {
            getAdminPermissionListData(obj)
        }
    }
    const tableChange = (e:any) => {
        setTableCurrent(()=> e.current)
        let obj = {
            ...paging,
            page_num: e.current,
            search
        }
        if(current == 1) {
            getAdminListData(obj)
        }else if (current == 2) {
            getAdminRoleListData(obj)
        }else {
            getAdminPermissionListData(obj)
        }
    }
    // 切换
    const selectCurrent = (e: number) => {
        setCurrent(() => e)
        setTableCurrent(() => 1)
        //e == 1 ? store.public.setIsUpdateLink(true) : store.public.setIsUpdateLink(false)
    };
    // 新增
    const addAdmin = () => {

    }
    return (<div className={styles.page}>
        <div className={clsx(styles.pageTitle, 'dflex', 'acenter')}>
            <div
                className={clsx(styles.switch, 'dflex', 'acenter', 'cur', 'jcenter', current == 1 ? styles.active : '')}
                onClick={() => selectCurrent(1)}>
                管理列表
            </div>
            <div
                className={clsx(styles.switch, 'dflex', 'acenter', 'cur', 'jcenter', 'mx1', current == 2 ? styles.active : '')}
                onClick={() => selectCurrent(2)}>
                角色列表
            </div>
            <div
                className={clsx(styles.switch, 'dflex', 'acenter', 'cur', 'jcenter', 'mr1', current == 3 ? styles.active : '')}
                onClick={() => selectCurrent(3)}>
                权限列表
            </div>
            <MSearch placeholder="请输入名称" inputChange={inputChange} inputSubmit={inputSubmit} name={'搜索'}></MSearch>
            <div className={clsx(styles.switch, styles.add, 'dflex', 'acenter', 'cur', 'jcenter', 'mlauto')}
                 onClick={addAdmin}>
                新增
            </div>
        </div>
        <AdminTable current={tableCurrent} tableChange={tableChange} total={total} pageSize={paging.page_size} columns={columns} dataSource={dataSource}></AdminTable>
    </div>)
}

export default observer(AdminRoot)
