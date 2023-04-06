import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react';
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

interface DataType {
    link_name: string;
    src: string;
    link_desc: string,
    id: number
}

const AdminApply: NextPage = () => {
    const store = useStore();
    const { success } = store.model.modelData
    const [dataSource, setDataSource] = useState([]);
    const columns: ColumnsType<DataType> = [
        {
            title: '名称',
            dataIndex: 'link_name',
            width: '200px',
        },
        {
            title: '地址',
            dataIndex: 'src'
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
                <div className={clsx(styles.add, styles.btn, 'cur')} onClick={()=>openAdd(record)}>
                    添加
                </div>
                <div className={clsx(styles.editor, styles.btn, 'cur', 'ml1')} onClick={()=>openEditor(record)}>
                    编辑
                </div>
                <div className={clsx(styles.delete, styles.btn, 'cur', 'ml1')} onClick={()=>openDelete(record)}>
                    移除
                </div>
            </div>,
        },
    ];
    useEffect(()=> {
        getContributeData()
    }, [success])

    // 打开添加弹框
    const openAdd = (record:any) => {
        store.public.setMaskComponentId(7);
        store.model.setTitle('选择添加类型');
        store.model.setChildren(
            <div className={clsx('dflex', 'jsa', 'acenter', 'textwhite')}>
                <div className={clsx(styles.typebtn, 'dflex', 'acenter', 'jcenter', 'cur')} onClick={()=>chooseCurrent(1, record)}>
                    <FireOutlined className={styles.icon} />
                </div>
                <div className={clsx(styles.typebtn, 'dflex', 'acenter', 'jcenter', 'cur')} onClick={()=>chooseCurrent(2, record)}>
                    <LinkOutlined className={styles.icon} />
                </div>
            </div>
        );
        store.model.setIsCardOrLink(true)
        store.model.setCancel(() => {
            store.public.setMaskShow(false);
        });
        store.public.setMaskShow(true);
    }

    // 切换
    const chooseCurrent = (i:number, record:any) => {
        if (i == 1) {
            store.public.setMaskComponentId(2);
            store.public.setIsAddAndEditor(1);
            store.mark.setTmpMark({
                name: record.link_name,
                src: record.src
            })
            store.public.setMaskShow(true);
        }else if (i == 2) {
            store.public.setMaskComponentId(4);
            store.public.setIsAddOrEdit(1);
            store.link.setTmpLink({
                link_name: record.link_name,
                src: record.src
            })
            store.public.setMaskShow(true);
        }
        store.model.setIsCardOrLink(false)
    }

    // 打开编辑弹框
    const openEditor = (record:any) => {
        store.public.setMaskComponentId(5);
        store.model.setTmpData(record)
        store.public.setMaskShow(true);
    }

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
    const deleteLink = async (item:DataType) => {
        let res: any = await contributeDelete({ id: String(item.id) });
        if (res.code == 200) {
            getContributeData();
            store.public.setMaskShow(false);
            message.success('删除成功');
        }
    }

    const getContributeData = async () => {
        let res: any = await getContributeList()
        if(res.code == 200) {
            setDataSource(res.data)
            store.model.setSuccess(false)
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

export default observer(AdminApply)