import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react';
import { useStore } from '@/store';
import { getAdminLogsList } from '@/service/api';
import clsx from 'clsx';
import styles from './index.module.scss';
import MSearch from 'C/mSearch';
import { getSession, isWindow, timeFormat } from '@/utils';
import AdminTable from 'C/Admin/AdminTable';
import { ColumnsType } from 'antd/es/table';
import { IUserInfo } from '@/store/userStore';
import { Paging } from '@/types/res';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react-lite';
import { message } from 'antd';

const AdminLogs: NextPage = () => {
    const store = useStore();
    const router = useRouter()
    const [dataSource, setDataSource] = useState([]);
    const [total, setTotal] = useState(0)
    const [search, setSearch] = useState('')
    const [tableCurrent, setTableCurrent] = useState(1);
    const [paging, setPaging] = useState<Paging>({
        page_num: 1,
        page_size: 20,
        search: ''
    })
    const columns: ColumnsType<IUserInfo> = [
        {
            title: 'ID',
            dataIndex: 'admin_id',
            width: '80px',
        },
        {
            title: 'IP',
            dataIndex: 'ip',
            width: '150px',
        },
        {
            title: '姓名',
            dataIndex: 'admin_name',
            width: '150px',
        },
        {
            title: '头像',
            dataIndex: 'avatar',
            render: (e)=> <img className={clsx(styles.imgs)} src={e} />,
            width: '150px',
        },
        {
            title: '手机号',
            dataIndex: 'mobile',
            width: '200px',
        },
        {
            title: '状态码',
            dataIndex: 'code',
            width: '200px',
        },
        {
            title: '请求方式',
            dataIndex: 'method',
            width: '200px',
        },
        {
            title: '请求地址',
            dataIndex: 'url',
            width: '250px',
        },
        {
            title: '创建时间',
            dataIndex: 'created_at',
            render: (e)=> {
                let time = timeFormat(e)
                return <div>{time}</div>
            }
        }
    ];

    useEffect(()=> {
        if (store.public.publicData.adminToken && store.public.publicData.isAdminPages) {
            if (isWindow()) {
                getLogsList({
                    ...paging,
                    page_num: tableCurrent,
                    search
                });
            }
        }
    }, [store.common.commonData.logsRefresh])

    const getLogsList = async (query:Paging) => {
        if (!getSession('adminToken')) {
            store.public.setIsAdminPages(false)
            router.push('/home')
            return
        }
        const res: any = await getAdminLogsList(query)
        if(res.code == 200) {
            setDataSource(res.data.list)
            setTotal(res.data.total)
        }
    }
    const inputSubmit = (e:string) => {
        if (!e) {
            message.warning("请输入管理员姓名")
            return
        }
        setSearch(e)
        let obj = {
            ...paging,
            search: e
        }
        getLogsList(obj)
    };
    const inputChange = (e:string) => {
        setSearch(e)
        if (!e) {
            let obj = {
                ...paging,
                search: e
            }
            getLogsList(obj)
        }
    }
    const tableChange = (e:any) => {
        setTableCurrent(()=> e.current)
        let obj = {
            ...paging,
            page_num: e.current,
            search
        }
        getLogsList(obj)
    }
    return (<div className={styles.page}>
        <div className={clsx(styles.pageTitle, 'dflex', 'acenter')}>
            <MSearch inputChange={inputChange} placeholder="请输入姓名" inputSubmit={inputSubmit} name={'搜索'}></MSearch>
        </div>
        <AdminTable current={tableCurrent} tableChange={tableChange} total={total} pageSize={paging.page_size} columns={columns} dataSource={dataSource}></AdminTable>
    </div>)
}

export default observer(AdminLogs)
