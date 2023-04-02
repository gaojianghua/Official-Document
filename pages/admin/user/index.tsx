import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react';
import { useStore } from '@/store';
import { getAdminUserList, linkDel, userDelete, userLinkDel } from '@/service/api';
import clsx from 'clsx';
import styles from './index.module.scss';
import MSearch from 'C/mSearch';
import { isWindow } from '@/utils';
import AdminTable from 'C/Admin/AdminTable';
import { ColumnsType } from 'antd/es/table';
import { message } from 'antd';
import { IUserInfo } from '@/store/userStore';

const AdminUser: NextPage = () => {
    const store = useStore();
    const [dataSource, setDataSource] = useState([]);
    const columns: ColumnsType<IUserInfo> = [
        {
            title: '昵称',
            dataIndex: 'name',
            width: '100px',
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

    useEffect(()=> {
        if (store.public.publicData.adminToken && store.public.publicData.isAdminPages) {
            if (isWindow()) {
                getUserList();
            }
        }
    }, [])

    // 打开编辑弹框
    const openEditor = (record:IUserInfo) => {
        store.user.setTmpUser(record)
        store.public.setMaskComponentId(6);
        store.public.setMaskShow(true);
    }

    // 打开确定删除弹框
    const openDelete = (item: IUserInfo) => {
        store.public.setMaskComponentId(7);
        store.model.setTitle('移除印记');
        store.model.setChildren(<div className={clsx('dflex', 'jcenter', 'acenter', 'textwhite')}>
            确定移除 {item.name} 吗？
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
    const deleteLink = async (item:IUserInfo) => {
        let res: any = await userDelete({ mobile: String(item.mobile) });
        if (res.code == 200) {
            getUserList();
            store.public.setMaskShow(false);
            message.success('删除成功');
        }
    }

    const getUserList = async () => {
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