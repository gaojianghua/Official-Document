import type { NextPage } from 'next'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useStore } from '@/store';

const AdminType: NextPage = () => {
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
    return (<>
    </>)
}

export default AdminType