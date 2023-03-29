import type { NextPage } from 'next';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import type { ColumnsType } from 'antd/es/table';
import update from 'immutability-helper';
import { useRouter } from 'next/router';
import { useStore } from '@/store';
import MSearch from 'C/mSearch';
import clsx from 'clsx';
import styles from './index.module.scss';
import { Table } from 'antd';
import { getAdminCardList, getAdminUserCardList, getAdminUserLinkList, getLinkList } from '@/service/api';
import { isWindow } from '@/utils';


interface DataType {
    link_name: string;
    src: string;
}

interface DraggableBodyRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
    index: number;
    moveRow: (dragIndex: number, hoverIndex: number) => void;
}

const type = 'DraggableBodyRow';

const DraggableBodyRow = ({
                              index,
                              moveRow,
                              className,
                              style,
                              ...restProps
                          }: DraggableBodyRowProps) => {
    const ref = useRef<HTMLTableRowElement>(null);
    const [{ isOver, dropClassName }, drop] = useDrop({
        accept: type,
        collect: monitor => {
            const { index: dragIndex } = monitor.getItem() || {};
            if (dragIndex === index) {
                return {};
            }
            return {
                isOver: monitor.isOver(),
                dropClassName: dragIndex < index ? ' drop-over-downward' : ' drop-over-upward',
            };
        },
        drop: (item: { index: number }) => {
            moveRow(item.index, index);
        },
    });
    const [, drag] = useDrag({
        type,
        item: { index },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    });
    drop(drag(ref));

    return (
        <tr
            ref={ref}
            className={`${className}${isOver ? dropClassName : ''}`}
            style={{ cursor: 'move', ...style }}
            {...restProps}
        />
    );
};

const columns: ColumnsType<DataType> = [
    {
        title: '名称',
        dataIndex: 'link_name'
    },
    {
        title: '地址',
        dataIndex: 'src'
    }
];

const AdminLink: NextPage = () => {
    const store = useStore();
    const [data, setData] = useState([]);
    const [current, setCurrent] = useState(1);
    const components = {
        body: {
            row: DraggableBodyRow,
        },
    };
    const moveRow = useCallback(
        (dragIndex: number, hoverIndex: number) => {
            const dragRow = data[dragIndex];
            setData(
                update(data, {
                    $splice: [
                        [dragIndex, 1],
                        [hoverIndex, 0, dragRow],
                    ],
                }),
            );
        },
        [data],
    );

    useEffect(() => {
        // @ts-ignore
        current == 2 ? columns[0].dataIndex = 'user_link_name' : columns[0].dataIndex = 'link_name'
        if (store.public.publicData.adminToken && store.public.publicData.isAdminPages) {
            if (isWindow()) {
                getLinkData();
            }
        }
    }, [current]);


    const getLinkData = async () => {
        let res: any
        if(current == 1) {
            res = await getLinkList()
        }else if (current == 2) {
            res = await getAdminUserLinkList()
        }
        if(res.code == 200) {
            setData(res.data)
        }
    };
    const selectCurrent = (e: number) => {
        setCurrent(() => e)
    };
    const inputSubmit = (e: string) => {

    };
    const addCard = () => {

    }
    return (
        <div className={styles.page}>
            <div className={clsx(styles.pageTitle, 'dflex', 'acenter')}>
                <div className={clsx(styles.switch, 'dflex', 'acenter', 'cur', 'jcenter', current == 1 ? styles.active : '')} onClick={()=>selectCurrent(1)}>
                    系统链接
                </div>
                <div className={clsx(styles.switch, 'dflex', 'acenter', 'cur', 'jcenter', 'mx1', current == 2 ? styles.active : '')}
                     onClick={()=>selectCurrent(2)}>
                    用户链接
                </div>
                <MSearch inputSubmit={inputSubmit} name={'搜索'}></MSearch>
                <div className={clsx(styles.switch, styles.add, 'dflex', 'acenter', 'cur', 'jcenter', 'mlauto')}
                     onClick={addCard}>
                    新增
                </div>
            </div>
            <DndProvider backend={HTML5Backend}>
                <Table
                    columns={columns}
                    dataSource={data}
                    scroll={{y: '400px'}}
                    components={components}
                    onRow={(_, index) => {
                        const attr = {
                            index,
                            moveRow,
                        };
                        return attr as React.HTMLAttributes<any>;
                    }}
                />
            </DndProvider>
        </div>
    );
};

export default AdminLink;