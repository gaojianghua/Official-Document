import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useStore } from '@/store';
import { getCards } from '@/service/api';
import clsx from 'clsx';
import styles from './index.module.scss';
import MSearch from 'C/mSearch';

const AdminLink: NextPage = () => {
    const [urlList, setUrlList] = useState([]);
    const { pathname } = useRouter();
    const store = useStore();


    useEffect(() => {
        getCardData();
    }, []);


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
        //     setUrlList(res.data)
        // }
    };
    const selectCurrent = () => {

    };
    const inputSubmit = (e:string) => {

    };
    return (
        <>
            <div className={clsx(styles.pageTitle, 'dflex', 'acenter')}>
                <div className={clsx(styles.switch, 'dflex', 'acenter', 'cur', 'jcenter')} onClick={selectCurrent}>
                    系统链接
                </div>
                <div className={clsx(styles.switch, 'dflex', 'acenter', 'cur', 'jcenter', 'mx1')}
                     onClick={selectCurrent}>
                    用户链接
                </div>
                <MSearch inputSubmit={inputSubmit} name={'搜索'}></MSearch>
                <div className={clsx(styles.switch, styles.add, 'dflex', 'acenter', 'cur', 'jcenter', 'mlauto')}
                     onClick={selectCurrent}>
                    新增
                </div>
            </div>
        </>
    );
};

export default AdminLink;