import type { NextPage } from 'next'
import { Column } from 'C/index';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useStore } from '@/store';
import { getCards } from '@/service/api';
import clsx from 'clsx';
import styles from '@/pages/admin/link/index.module.scss';
import MSearch from 'C/mSearch';

const AdminUser: NextPage = () => {
    const [urlList, setUrlList] = useState([])
    const { pathname } = useRouter();
    const store = useStore()


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
        //     setUrlList(res.data)
        // }
    }
    const inputSubmit = (e:string) => {

    };
    return (<>
        <div className={clsx(styles.pageTitle, 'dflex', 'acenter')}>
            <MSearch inputSubmit={inputSubmit} name={'搜索'}></MSearch>
        </div>
    </>)
}

export default AdminUser