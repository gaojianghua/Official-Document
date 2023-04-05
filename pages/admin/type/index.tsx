import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useStore } from '@/store';
import styles from '@/pages/admin/link/index.module.scss';
import clsx from 'clsx';
import MSearch from 'C/mSearch';
import AdminTable from 'C/Admin/AdminTable';
import { cardDel, classDel, getClassList, userCardDel } from '@/service/api';
import { Menu } from '@/types/res';
import { ColumnsType } from 'antd/es/table';
import { observer } from 'mobx-react-lite';
import { message } from 'antd';

const AdminType: NextPage = () => {
    const store = useStore()
    const { success } = store.class.classData
    const [dataSource, setDataSource] = useState<Menu[]>([]);
    const columns: ColumnsType<Menu> = [
        {
            title: '名称',
            dataIndex: 'class_name',
            width: '200px',
        },
        {
            title: '分类ID',
            dataIndex: 'class_id',
            key: 'class_id',
            width: '200px'
        },
        {
            title: '父级ID',
            dataIndex: 'parent_id',
            key: 'parent_id',
            width: '200px'
        },
        {
            title: '路由',
            dataIndex: 'router',
            key: 'router',
            width: '200px'
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
    useEffect(()=> {
        if (success){
            getMenuData()
        }
        setDataSource(store.public.publicData.menu)
    }, [success])

    // 打开编辑弹框
    const openEditor = (record: Menu) => {
        store.public.setMaskComponentId(9);
        store.class.setIsAddOrEdit(2)
        store.class.setIsOneOrTwo(record.parent_id == 0 ? 1 : 2 )
        store.class.setTmpClass(record);
        store.public.setMaskShow(true);
    };

    // 打开确定删除弹框
    const openDelete = (item: Menu) => {
        store.public.setMaskComponentId(7);
        store.model.setTitle('移除分类');
        store.model.setChildren(<div className={clsx('dflex', 'jcenter', 'acenter', 'textwhite')}>
            确定移除 {item.class_name || item.class_name} 分类吗？
        </div>);
        store.model.setConfirm(() => {
            deleteClass(item);
        });
        store.model.setCancel(() => {
            store.public.setMaskShow(false);
        });
        store.public.setMaskShow(true);
    };

    // 移除分类
    const deleteClass = async (item: Menu) => {
        let res: any = await classDel({ id: String(item.id) });
        if (res.code == 200) {
            getMenuData();
            store.public.setMaskShow(false);
            message.success('删除成功');
        }
    }

    const getMenuData = async () => {
        let res: any = await getClassList();
        let menu: Menu[] = [];
        if (res.code == 200) {
            res.data.forEach((item: Menu) => {
                if (item.router == '/') {
                    menu.unshift(item);
                } else {
                    menu.push(item);
                }
            });
            setDataSource(menu)
            store.public.setMenu(menu)
            store.class.setSuccess(false)
        }
    }
    const addCard = () => {
        store.public.setMaskComponentId(9);
        store.class.setIsAddOrEdit(1)
        store.public.setMaskShow(true);
    }
    return (<div className={styles.page}>
        <div className={clsx(styles.pageTitle, 'dflex', 'acenter')}>
            <></>
            <div className={clsx(styles.switch, styles.add, 'dflex', 'acenter', 'cur', 'jcenter', 'mlauto')}
                 onClick={addCard}>
                新增
            </div>
        </div>
        <AdminTable columns={columns} dataSource={dataSource}></AdminTable>
    </div>)
}

export default observer(AdminType)