import type { NextPage } from 'next'
import { useEffect, useState } from 'react';
import { useStore } from '@/store';
import styles from './index.module.scss'
import { observer } from 'mobx-react-lite';
import clsx from 'clsx';

interface IData {
    name: string
    count: string
}

const AdminHome: NextPage = () => {
    const store = useStore()
    const [data, setData] = useState<IData[]>([])


    useEffect(()=> {
        getCardData()
    }, [])


    const getCardData = async () => {
        // let uid: string
        // store.public.publicData.menu.forEach((item) => {
        //     if (item.router == pathname) {
        //         uid = String(item.class_id)
        //     }
        // })
        // // @ts-ignore
        // const res: any = await getCards({id: uid})
        // if(res.code == 200) {
            setData([
                {
                    name: '用户量',
                    count: '1080'
                },
                {
                    name: '投稿量',
                    count: '3498'
                },
                {
                    name: '印记量',
                    count: '6553'
                },
                {
                    name: '链接量',
                    count: '1673'
                },
                {
                    name: '网址量',
                    count: '8226'
                },
                {
                    name: '访问量',
                    count: '138220'
                }
            ])
        // }
    }
    return (<div className={clsx(styles.page, 'dflex', 'flexcolumn')}>
        <div className={clsx(styles.list, 'dflex', 'jsb')}>
            {
                data.map((item, i)=>(
                    <div key={i} className={clsx(styles.item, 'dflex', 'jcenter', 'acenter')}>
                        <p>{item.name}</p>
                        <span>{item.count}</span>
                    </div>
                ))
            }
        </div>
        <div className={clsx(styles.chart, 'dflex', 'jsb')}>
            <div className={clsx(styles.child)}>
                <div className={clsx(styles.title, 'textcenter')}>
                    用户统计
                </div>
            </div>
            <div className={clsx(styles.child)}>
                <div className={clsx(styles.title, 'textcenter')}>
                    系统统计
                </div>
            </div>
        </div>
    </div>)
}

export default observer(AdminHome)